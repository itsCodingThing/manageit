import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // soft verification only checks for cookie
  const session = await verifySession();

  if (session.isAuth && session.session.userType === "school-admin") {
    return (
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  }

  return redirect("/school-admin/login");
}
