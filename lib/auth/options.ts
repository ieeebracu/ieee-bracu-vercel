import type { BetterAuthOptions } from "better-auth";
import { hashPassword, verifyPassword } from "./password";

export const authOptions = {
  appName: "IEEE BRACU Admin",
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    password: { hash: hashPassword, verify: verifyPassword },
  },
  disabledPaths: ["/sign-up/email"],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: { "/sign-in/email": { window: 60, max: 5 } },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip", "cf-connecting-ip"],
    },
  },
} satisfies Partial<BetterAuthOptions>;