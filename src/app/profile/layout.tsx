import { getServerSession } from "next-auth";
import { authConfig } from "@/app/configs/authConfig";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/signin?error=unauthorized");
  }

  return <>{children}</>;
}
