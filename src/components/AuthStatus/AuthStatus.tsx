"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "../../utils/authClient";
import css from "./AuthStatus.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AuthStatus({ onMenuAction }) {
  const { data: session, status } = useSession();
  const name = session?.user?.name || "";

  if (status === "unauthenticated") {
    return (
      <>
        <Link href="/signin" className={css.link} onClick={onMenuAction}>
          Login
        </Link>
      </>
    );
  }

  return (
    <>
      <div className={css.logout}>
        <button onClick={clientSideSignOut} className={css.logoutLinkButton}>
          logout <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </button>
      </div>
      <div className={css.logoutTablet}>
        <button onClick={clientSideSignOut} className={css.logoutLinkButton}>
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </button>
      </div>
      <p className={css.userName}>{name}</p>
    </>
  );
}
