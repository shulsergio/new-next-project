"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "../../utils/authClient";
import css from "./AuthStatus.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/signin" className={css.link}>Login</Link>
      </>
    );
  }
  return (
    <p className={css.userName}>
      {name}
      <button onClick={clientSideSignOut} className={css.logoutLinkButton}>
        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
      </button>
    </p>
  );
}
