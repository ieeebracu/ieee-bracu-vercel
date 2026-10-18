import { randomUUID } from "node:crypto";
import { writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const email = (await rl.question("Webmaster email: ")).trim().toLowerCase();
  const name = (await rl.question("Display name: ")).trim() || "Webmaster";
  const password = await rl.question("Password (min 12 chars): ");
  rl.close();
  if (password.length < 12) throw new Error("Password too short");

  const esc = (s: string) => s.replaceAll("'", "''");
  const userId = randomUUID();
  const now = Date.now();
  const hash = await hashPassword(password);

  writeFileSync(
    "seed-webmaster.sql",
    `INSERT INTO "user" (id, name, email, email_verified, created_at, updated_at)
VALUES ('${userId}', '${esc(name)}', '${esc(email)}', 1, ${now}, ${now});
INSERT INTO "account" (id, account_id, provider_id, user_id, password, created_at, updated_at)
VALUES ('${randomUUID()}', '${userId}', 'credential', '${userId}', '${hash}', ${now}, ${now});`,
  );
  console.log("Wrote seed-webmaster.sql");
}

main();