import { requireWebmaster } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireWebmaster();
  return <>{children}</>;
}