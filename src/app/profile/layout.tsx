import { getServerSession } from "next-auth";
import { authConfig } from "@/app/configs/authConfig";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    toast.error("You are not logged in");
    redirect("/signin");
  }

  return <>{children}</>;
}
