import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const PARAMS = { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 };

function derive(password: string, salt: string, keylen: number) {
  return new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, keylen, PARAMS, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = await derive(password, salt, 64);
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword({ hash, password }: { hash: string; password: string }) {
  const [salt, keyHex] = hash.split(":");
  if (!salt || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const key = await derive(password, salt, expected.length);
  return timingSafeEqual(key, expected);
}