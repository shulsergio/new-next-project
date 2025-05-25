"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "../../utils/authClient";
import css from "./AuthStatus.module.css";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";

  console.log("----- AuthStatus session:", session);
  console.log("----- AuthStatus status:", status);
  console.log("----- AuthStatus name:", name);
  console.log("----- AuthStatus session?.user:", session?.user);

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/signin">Sign in</Link>
      </>
    );
  }
  return (
    <p>
      Hello, {name}
      <button onClick={clientSideSignOut} className={css.logoutLinkButton}>
        Sign out
      </button>
      {/* <Link href="/profile">Profile</Link> */}
    </p>
  );
}
