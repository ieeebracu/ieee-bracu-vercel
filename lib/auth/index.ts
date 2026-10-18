import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { authOptions } from "./options";

export const auth = betterAuth({
  ...authOptions,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "build-time-secret-replace-with-real-secret-in-production-1234567890",
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
});