import { authConfig } from "@/app/configs/authConfig";
import MotivationBox from "@/components/MotivationBox/page";
import TextBox from "@/components/TextBox/TextBox";
import { getServerSession } from "next-auth";
// import css from "./page.module.css";

export default async function UsersMotivationPage() {
  const session = await getServerSession(authConfig);

  const userProfile = session?.user.userType;
  console.log("User Profile DATA IN COMPETITORS PAGE:", userProfile);
  return (
    <>
      {userProfile !== "AV" ? (
        <TextBox option="text">{"No motivation now"}</TextBox>
      ) : (
        <MotivationBox />
      )}
    </>
  );
}
