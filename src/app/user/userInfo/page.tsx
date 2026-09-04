// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import { authConfig } from "@/app/configs/authConfig";
import { UserInfoBox } from "@/components/UserInfoBox/UserInfoBox";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserInfoPage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/signin?error=unauthorized");
  }
  return <UserInfoBox />;
}
