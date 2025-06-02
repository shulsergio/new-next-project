import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "./configs/authConfig";
import { redirect } from "next/navigation";
import css from "./page.module.css";

export default async function Home() {
  // const router = useRouter();
  const session = await getServerSession(authConfig);
  if (session) {
    redirect("/profile");
  }
  return (
    <div className={css.container}>
      <p className={css.header}>
        You are unknown user
        <br />
        Sign in please
      </p>
    </div>
  );
}
