import { existsSync, mkdirSync, readFileSync, writeFileSync, createWriteStream } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  _Object,
} from "@aws-sdk/client-s3";

// ============================================================================
// 1. Environment Variables Loader
// ============================================================================
function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) return;
  try {
    const content = readFileSync(filePath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch (err) {
    console.warn(`Could not read ${filePath}:`, err);
  }
}

// Load .env.local, .env, and fallback to parent/sibling .dev.vars if needed
loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));
loadEnvFile(resolve(process.cwd(), "../ieeebracu-web/.dev.vars"));

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function getTimestampString(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;
}

// ============================================================================
// 2. D1 Database Exporter (REST API)
// ============================================================================
async function backupD1Database(
  accountId: string,
  databaseId: string,
  apiToken: string,
  outputSqlPath: string
): Promise<{ success: boolean; bytes: number }> {
  console.log("\n📦 [1/2] Backing up Cloudflare D1 Database...");
  console.log(`     Account ID:  ${accountId}`);
  console.log(`     Database ID: ${databaseId}`);

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/export`;

  // Step 1: Initiate export
  console.log("     Initiating export job on Cloudflare D1...");
  const initRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      output_format: "polling",
      dump_options: {
        no_data: false,
        no_schema: false,
      },
    }),
  });

  if (!initRes.ok) {
    const errorText = await initRes.text();
    throw new Error(
      `D1 Export initiation failed (${initRes.status} ${initRes.statusText}): ${errorText}`
    );
  }

  const initData = (await initRes.json()) as any;
  if (!initData.success) {
    throw new Error(
      `D1 Export error: ${initData.errors?.map((e: any) => e.message).join(", ") || "Unknown error"}`
    );
  }

  let bookmark = initData.result?.at_bookmark;
  let signedUrl = initData.result?.signed_url;
  let status = initData.result?.status;

  // Step 2: Poll until complete
  const maxAttempts = 60; // 60 * 3s = 3 minutes max
  let attempts = 0;

  while (status === "active" && !signedUrl && attempts < maxAttempts) {
    attempts++;
    process.stdout.write(`     Generating SQL dump... polling attempt ${attempts}/${maxAttempts}\r`);
    await new Promise((r) => setTimeout(r, 3000));

    const pollRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        output_format: "polling",
        current_bookmark: bookmark,
      }),
    });

    if (!pollRes.ok) {
      const errText = await pollRes.text();
      throw new Error(`D1 Export poll failed: ${errText}`);
    }

    const pollData = (await pollRes.json()) as any;
    if (!pollData.success) {
      throw new Error(`D1 Export polling error: ${JSON.stringify(pollData.errors)}`);
    }

    status = pollData.result?.status;
    bookmark = pollData.result?.at_bookmark || bookmark;
    signedUrl = pollData.result?.signed_url;
  }

  process.stdout.write("\n");

  if (!signedUrl) {
    throw new Error("D1 Export timed out or did not return a signed download URL.");
  }

  // Step 3: Download the SQL dump
  console.log("     Downloading SQL dump file from Cloudflare...");
  const downloadRes = await fetch(signedUrl);
  if (!downloadRes.ok) {
    throw new Error(`Failed to download SQL dump from signed URL: ${downloadRes.statusText}`);
  }

  const sqlContent = await downloadRes.text();
  writeFileSync(outputSqlPath, sqlContent, "utf-8");
  const bytes = Buffer.byteLength(sqlContent, "utf-8");

  console.log(`     ✅ D1 Database dump saved: ${outputSqlPath} (${formatBytes(bytes)})`);
  return { success: true, bytes };
}

// ============================================================================
// 3. R2 Bucket Media Downloader (AWS S3 SDK)
// ============================================================================
async function backupR2Media(
  accountId: string,
  accessKeyId: string,
  secretAccessKey: string,
  bucketName: string,
  outputMediaDir: string
): Promise<{ count: number; totalBytes: number; files: string[] }> {
  console.log("\n📸 [2/2] Backing up Cloudflare R2 Media Bucket...");
  console.log(`     Bucket: ${bucketName}`);

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // Step 1: List all objects with pagination
  console.log("     Listing all objects in bucket...");
  const objects: _Object[] = [];
  let continuationToken: string | undefined = undefined;

  do {
    const listRes = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
      })
    );

    if (listRes.Contents) {
      objects.push(...listRes.Contents);
    }
    continuationToken = listRes.NextContinuationToken;
  } while (continuationToken);

  console.log(`     Found ${objects.length} total object(s) in R2.`);

  if (objects.length === 0) {
    console.log("     Bucket is empty. No objects to download.");
    return { count: 0, totalBytes: 0, files: [] };
  }

  // Step 2: Download each object
  let downloadedCount = 0;
  let totalBytes = 0;
  const files: string[] = [];

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const key = obj.Key;
    if (!key) continue;

    const size = obj.Size || 0;
    const destPath = join(outputMediaDir, key);
    const destDir = dirname(destPath);

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    try {
      const getRes = await s3.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );

      if (getRes.Body) {
        // Stream to file
        const nodeStream = getRes.Body as Readable;
        const writeStream = createWriteStream(destPath);
        await pipeline(nodeStream, writeStream);

        downloadedCount++;
        totalBytes += size;
        files.push(key);

        console.log(
          `     [${i + 1}/${objects.length}] Downloaded: ${key} (${formatBytes(size)})`
        );
      }
    } catch (err: any) {
      console.error(`     ❌ Failed to download ${key}:`, err?.message || err);
    }
  }

  console.log(`     ✅ All R2 objects saved to: ${outputMediaDir}`);
  return { count: downloadedCount, totalBytes, files };
}

// ============================================================================
// 4. Main Controller
// ============================================================================
async function main() {
  const args = process.argv.slice(2);
  const isD1Only = args.includes("--d1-only");
  const isR2Only = args.includes("--r2-only");

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: npm run backup [options]

Options:
  --d1-only      Backup only Cloudflare D1 database
  --r2-only      Backup only Cloudflare R2 media files
  --output <dir> Specify a custom backup directory
  --help, -h     Show this help message

Environment variables needed (in .env.local or process environment):
  CLOUDFLARE_ACCOUNT_ID
  CLOUDFLARE_API_TOKEN          (for D1 export)
  CLOUDFLARE_D1_DATABASE_ID     (optional, defaults to ieeebracu-db)
  R2_ACCESS_KEY_ID              (for R2 backup)
  R2_SECRET_ACCESS_KEY          (for R2 backup)
  R2_BUCKET_NAME                (optional, defaults to ieeebracu-media)
    `);
    process.exit(0);
  }

  const customOutIdx = args.indexOf("--output");
  const timestamp = getTimestampString();
  const backupDirName = customOutIdx !== -1 && args[customOutIdx + 1]
    ? args[customOutIdx + 1]
    : `backup-${timestamp}`;

  const backupDir = resolve(process.cwd(), "backups", backupDirName);

  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }

  console.log("============================================================");
  console.log("   IEEE BRACU — Cloudflare D1 & R2 Full Backup Utility      ");
  console.log("============================================================");
  console.log(`📁 Target Directory: ${backupDir}\n`);

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const d1DatabaseId =
    process.env.CLOUDFLARE_D1_DATABASE_ID || "ee26fed4-2154-427c-b890-74d09c73f3d1";
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID;
  const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const r2BucketName = process.env.R2_BUCKET_NAME || "ieeebracu-media";

  if (!accountId) {
    console.error("❌ Error: CLOUDFLARE_ACCOUNT_ID is required.");
    console.error("   Please set it in your .env.local file.");
    process.exit(1);
  }

  const manifest: Record<string, any> = {
    backupTimestamp: new Date().toISOString(),
    backupDirectory: backupDir,
  };

  const startTime = Date.now();

  // 1. D1 Backup
  if (!isR2Only) {
    if (!apiToken) {
      console.warn("⚠️  Skipping D1 backup: CLOUDFLARE_API_TOKEN is not set in .env.local");
    } else {
      try {
        const sqlPath = join(backupDir, "d1-database.sql");
        const res = await backupD1Database(accountId, d1DatabaseId, apiToken, sqlPath);
        manifest.d1 = {
          databaseId: d1DatabaseId,
          sqlFile: "d1-database.sql",
          bytes: res.bytes,
          formattedSize: formatBytes(res.bytes),
        };
      } catch (err: any) {
        console.error("❌ D1 backup failed:", err?.message || err);
        manifest.d1Error = err?.message || String(err);
      }
    }
  }

  // 2. R2 Backup
  if (!isD1Only) {
    if (!r2AccessKeyId || !r2SecretAccessKey) {
      console.warn(
        "⚠️  Skipping R2 backup: R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY is not set in .env.local"
      );
    } else {
      try {
        const mediaDir = join(backupDir, "r2-media");
        const res = await backupR2Media(
          accountId,
          r2AccessKeyId,
          r2SecretAccessKey,
          r2BucketName,
          mediaDir
        );
        manifest.r2 = {
          bucketName: r2BucketName,
          mediaDirectory: "r2-media",
          objectCount: res.count,
          totalBytes: res.totalBytes,
          formattedSize: formatBytes(res.totalBytes),
          files: res.files,
        };
      } catch (err: any) {
        console.error("❌ R2 backup failed:", err?.message || err);
        manifest.r2Error = err?.message || String(err);
      }
    }
  }

  manifest.durationSeconds = Math.round((Date.now() - startTime) / 1000);

  // Write manifest
  writeFileSync(
    join(backupDir, "backup-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );

  console.log("\n============================================================");
  console.log("   🎉 Backup Complete!");
  console.log("============================================================");
  console.log(`📁 Backup Location: ${backupDir}`);
  if (manifest.d1) {
    console.log(`🗄️  D1 Database:    ${manifest.d1.formattedSize} (d1-database.sql)`);
  }
  if (manifest.r2) {
    console.log(`🖼️  R2 Media:       ${manifest.r2.objectCount} files (${manifest.r2.formattedSize})`);
  }
  console.log(`📄 Manifest File:   ${join(backupDir, "backup-manifest.json")}`);
  console.log(`⏱️  Duration:        ${manifest.durationSeconds}s`);
  console.log("============================================================\n");
}

main().catch((err) => {
  console.error("Fatal backup error:", err);
  process.exit(1);
});
