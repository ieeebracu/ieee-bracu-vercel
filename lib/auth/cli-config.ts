import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { authOptions } from "./options";

export const auth = betterAuth({
  ...authOptions,
  database: drizzleAdapter({} as any, { provider: "sqlite" }),
});