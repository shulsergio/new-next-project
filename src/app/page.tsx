import { getServerSession } from "next-auth";
import { authConfig } from "./configs/authConfig";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import TextBox from "@/components/TextBox/TextBox";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authConfig);
  console.log("*1*1* Сессия на главной странице:", session);

  if (!session) {
    return (
      <TextBox option="text">
        <div className={css.topic}>
          <p className={css.letter}> Field HUB</p>
        </div>
      </TextBox>
    );
  }
  console.log("*** session.user:", session.user);
  console.log("*** session.user?.role:", session.user?.role);
  const hasAdminAccess =
    session.user?.permissions?.["canAccessAdminPanel"] === true;

  if (hasAdminAccess) {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}
