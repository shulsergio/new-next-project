"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "../../utils/authClient";
import css from "./AuthStatus.module.css";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";

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
    </p>
  );
}
