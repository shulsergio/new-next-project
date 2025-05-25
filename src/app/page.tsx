import { getServerSession } from "next-auth";
import React from "react";
import { authConfig } from "./configs/authConfig";
import { redirect } from "next/navigation";

export default async function Home() {
  // const router = useRouter();
  const session = await getServerSession(authConfig);
  if (session) {
    redirect("/profile");
  }
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <p>You are unknown user.</p>
      <p>Sign in please</p>
    </div>
  );
}
