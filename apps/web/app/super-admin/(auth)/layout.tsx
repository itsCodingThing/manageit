import { SuperAdminSidebar } from "@/components/super-admin/sidebar";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // soft verification only checks for cookie
  const session = await verifySession();
  if (!session.isAuth) {
    return redirect("/super-admin/login");
  }

  return (
    <div className="flex h-screen bg-background">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
