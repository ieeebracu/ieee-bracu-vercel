# Cloudflare D1 & R2 Full Backup & Disaster Recovery Guide

This guide provides complete instructions for downloading, verifying, and restoring full backups of the **Cloudflare D1 Database** (`ieeebracu-db`) and **Cloudflare R2 Object Storage** (`ieeebracu-media`).

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Prerequisites & Credentials](#prerequisites--credentials)
3. [Running Backups](#running-backups)
4. [Backup Artifacts & Structure](#backup-artifacts--structure)
5. [Restoring from Backup](#restoring-from-backup)
6. [Automating with GitHub Actions (Optional)](#automating-with-github-actions-optional)

---

## 1. Overview

The automated backup utility (`scripts/backup.ts`) downloads a complete, point-in-time snapshot of:
* **Cloudflare D1 SQLite Database**: Generates a standard `.sql` dump containing table definitions, schemas, sequences, and all rows (`posts`, `chapters`, `tags`, `gallery_photos`, `user`, `session`, `account`, `rate_limit`).
* **Cloudflare R2 Storage Bucket**: Recursively downloads every stored image, banner, and upload preserving directory hierarchy (`gallery/`, `posts/content_images/`).
* **Manifest Audit**: Automatically writes `backup-manifest.json` detailing execution timestamps, sizes, and file counts.

---

## 2. Prerequisites & Credentials

The backup utility connects directly to Cloudflare via official REST and S3 APIs. Ensure the following environment variables are present in your `.dev.vars` or `.env.local` file:

```env
# ==============================================================================
# Cloudflare Account & D1 Database
# ==============================================================================
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_D1_DATABASE_ID=ee26fed4-2154-427c-b890-74d09c73f3d1
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token

# ==============================================================================
# Cloudflare R2 Object Storage (S3 API)
# ==============================================================================
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=ieeebracu-media
```

### How to Obtain Each Credential

#### 1. `CLOUDFLARE_ACCOUNT_ID`
* Open the [Cloudflare Dashboard](https://dash.cloudflare.com/).
* Select any domain or look at the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>`.
* Alternatively, scroll down the right sidebar of the account home page to find **Account ID**.

#### 2. `CLOUDFLARE_API_TOKEN` (for D1 database export)
1. Go to **Cloudflare Dashboard** > **My Profile** > **API Tokens**.
2. Click **Create Token** > **Create Custom Token**.
3. Set **Token Name**: `D1 Backup Token`.
4. Under **Permissions**, select:
   * **Account** > **D1** > **Edit**
5. (Optional) Set **Account Resources** to your account.
6. Click **Continue to summary** > **Create Token**.
7. Copy the token into `CLOUDFLARE_API_TOKEN`.

#### 3. `R2_ACCESS_KEY_ID` & `R2_SECRET_ACCESS_KEY` (for R2 media download)
1. In Cloudflare Dashboard, click **R2** in the left sidebar.
2. In the right sidebar, click **Manage R2 API Tokens**.
3. Click **Create API token**.
4. Set permissions to **Object Read & Write** (or Read-Only).
5. Specify bucket: `ieeebracu-media` (or apply to all buckets).
6. Click **Create API Token**.
7. Copy the **Access Key ID** and **Secret Access Key**.

---

## 3. Running Backups

Run the backup script directly using npm:

### Full Backup (Both Database & Media)
```bash
npm run backup
```

### Database Only (D1 SQL Dump)
```bash
npm run backup -- --d1-only
```

### Media Only (R2 Images)
```bash
npm run backup -- --r2-only
```

### Custom Backup Folder
```bash
npm run backup -- --output custom-backup-name
```

### Alternative: D1 Export via Wrangler CLI
If you already have `wrangler` logged in locally (`npx wrangler login`), you can also export D1 directly:
```bash
npx wrangler d1 export ieeebracu-db --remote --output=./backups/d1-dump.sql
```

---

## 4. Backup Artifacts & Structure

Every run creates a timestamped folder inside `backups/`:

```
backups/
└── backup-2026-10-19_00-35-00/
    ├── d1-database.sql        # Standard SQLite SQL dump (schema + INSERTs)
    ├── backup-manifest.json   # JSON metadata report
    └── r2-media/              # Downloaded images with preserved keys
        ├── gallery/
        │   ├── 3a9f0b21-41dd-4b3b-8217-10ffbfa69a23.webp
        │   └── 7c889f5a-4e4b-4c59-bfbc-58957ba5c57b.jpg
        └── posts/
            └── content_images/
                └── e8418012-70b7-4db3-ae29-c8c368ff62df.png
```

### Sample `backup-manifest.json`
```json
{
  "backupTimestamp": "2026-10-19T00:35:00.123Z",
  "backupDirectory": ".../backups/backup-2026-10-19_00-35-00",
  "d1": {
    "databaseId": "ee26fed4-2154-427c-b890-74d09c73f3d1",
    "sqlFile": "d1-database.sql",
    "bytes": 2457600,
    "formattedSize": "2.34 MB"
  },
  "r2": {
    "bucketName": "ieeebracu-media",
    "mediaDirectory": "r2-media",
    "objectCount": 142,
    "totalBytes": 78643200,
    "formattedSize": "75.00 MB"
  },
  "durationSeconds": 14
}
```

---

## 5. Restoring from Backup

### A. Restoring the D1 Database

The downloaded `d1-database.sql` is standard SQLite SQL.

#### 1. Restore to Remote Production D1:
```bash
npx wrangler d1 execute DB --remote --file=./backups/backup-YYYY-MM-DD_HH-mm-ss/d1-database.sql
```

#### 2. Restore to Local Development D1:
```bash
npx wrangler d1 execute DB --local --file=./backups/backup-YYYY-MM-DD_HH-mm-ss/d1-database.sql
```

#### 3. Inspect Locally with SQLite CLI:
You can also inspect or query the backup locally using the SQLite command-line tool:
```bash
sqlite3 restored.db < ./backups/backup-YYYY-MM-DD_HH-mm-ss/d1-database.sql
sqlite3 restored.db "SELECT count(*) FROM posts;"
```

---

### B. Restoring R2 Media Files

If you ever need to restore images back to Cloudflare R2:

#### Option 1: Using AWS CLI (`aws s3 sync`)
Since Cloudflare R2 is 100% S3-compatible:
```bash
aws s3 sync ./backups/backup-YYYY-MM-DD_HH-mm-ss/r2-media s3://ieeebracu-media \
  --endpoint-url https://<CLOUDFLARE_ACCOUNT_ID>.r2.cloudflarestorage.com
```

#### Option 2: Cloudflare Dashboard
1. Open **Cloudflare Dashboard** > **R2** > `ieeebracu-media`.
2. Click **Upload** and upload the restored folders/files directly.

---

## 6. Automating with GitHub Actions (Optional)

You can set up a weekly GitHub Action to run automatic backups and store them as artifacts or sync to cold storage:

```yaml
name: Weekly Cloudflare Backup

on:
  schedule:
    - cron: '0 2 * * 0' # Every Sunday at 02:00 UTC
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm ci

      - name: Run Backup
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          CLOUDFLARE_D1_DATABASE_ID: ${{ secrets.CLOUDFLARE_D1_DATABASE_ID }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          R2_ACCESS_KEY_ID: ${{ secrets.R2_ACCESS_KEY_ID }}
          R2_SECRET_ACCESS_KEY: ${{ secrets.R2_SECRET_ACCESS_KEY }}
          R2_BUCKET_NAME: "ieeebracu-media"
        run: npm run backup

      - name: Upload Backup Artifact
        uses: actions/upload-artifact@v4
        with:
          name: cloudflare-backup-${{ github.run_id }}
          path: backups/
          retention-days: 30
```
