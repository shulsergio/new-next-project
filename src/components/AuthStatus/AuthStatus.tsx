"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "../../utils/authClient";
import css from "./AuthStatus.module.css";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";
  // const role = session?.user?.role || "guest";

  console.log("----- AuthStatus session:", session);
  console.log("----- AuthStatus status:", status);
  console.log("----- AuthStatus name:", name);
  console.log("----- AuthStatus session?.user:", session?.user);
  console.log("----- AuthStatus session?.user.email:", session?.user.email);
  console.log("----- AuthStatus session?.user?.mcsId:", session?.user?.mcsId);
  console.log("----- AuthStatus USER:", session?.user);
  console.log("----- AuthStatus session?.user:", session?.user?.userType);

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/signin">Sign in</Link>
      </>
    );
  }
  return (
    <p className={css.userName}>
      {name}
      <button onClick={clientSideSignOut} className={css.logoutLinkButton}>
        Sign out
      </button>
      {/* <Link href="/profile">Profile</Link> */}
    </p>
  );
}
