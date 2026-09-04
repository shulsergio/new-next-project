import { getServerSession } from "next-auth";
import { authConfig } from "@/app/configs/authConfig";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.permissions?.canAccessAdminPanel === true;

  if (!session || !isAdmin) {
    redirect("/signin?error=unauthorized");
  }

  return <div className="admin-layout">{children}</div>;
}
