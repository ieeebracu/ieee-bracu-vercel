import { writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { hashPassword } from "../lib/auth/password";

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const email = (await rl.question("Webmaster email: ")).trim().toLowerCase();
  const password = await rl.question("New password (min 12 chars): ");
  rl.close();
  if (password.length < 12) throw new Error("Password too short");

  const esc = (s: string) => s.replaceAll("'", "''");
  const hash = await hashPassword(password);
  const userQuery = `(SELECT id FROM "user" WHERE email = '${esc(email)}')`;

  writeFileSync(
    "reset-webmaster.sql",
    `UPDATE "account" SET password = '${hash}', updated_at = ${Date.now()}
WHERE provider_id = 'credential' AND user_id = ${userQuery};
DELETE FROM "session" WHERE user_id = ${userQuery};`,
  );
  console.log("Wrote reset-webmaster.sql");
}

main();