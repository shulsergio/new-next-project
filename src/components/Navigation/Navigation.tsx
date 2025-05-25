"use client";

import AuthStatus from "../AuthStatus/AuthStatus";
import Link from "next/link";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <Link href="/" className={css.link}>
        HOME
      </Link>
      <Link href="/about">About</Link>
      <div className={css.authStatusContainer}>
        <AuthStatus />
      </div>
    </nav>
  );
}
