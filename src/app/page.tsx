import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "./configs/authConfig";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import TextBox from "@/components/TextBox/TextBox";

export default async function Home() {
  // const clientWidth = document.documentElement.clientWidth;
  // const router = useRouter();
  const session = await getServerSession(authConfig);
  console.log("*1*1* Сессия на главной странице:", session);

  if (!session) {
    return (
      <div className={css.container}>
        <TextBox option="text">{"You are unknown user. Sign in"}</TextBox>
      </div>
    );
  }
  console.log("***Сессия на главной странице:", session);
  console.log("*** session.user?.role:", session.user?.role);
  if (session.user?.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}
