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
  if (session) {
    redirect("/profile");
  }
  return (
    <div className={css.container}>
      <TextBox text="You are unknown user. Sign in" />
    </div>
  );
}
