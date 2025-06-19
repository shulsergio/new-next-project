// import Link from "next/link";
// import css from "./admin.module.css";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(authConfig);

  const userProfile = session?.user;
  return (
    <>
      <h1>{userProfile?.role || ""} profile</h1>
    </>
  );
}
