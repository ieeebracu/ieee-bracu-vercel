import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Call at the top of every admin page, server action, and admin API route. */
export async function requireWebmaster() {
  const session = await getSession();
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    redirect("/admin/login");
  }
  return session;
}