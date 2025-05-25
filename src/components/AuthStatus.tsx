"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { clientSideSignOut } from "./../utils/authClient";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return (
      <p>
        You are not signed in.
        <Link href="/signin" style={{ marginLeft: "10px" }}>
          Sign in
        </Link>
      </p>
    );
  }
  return (
    <p>
      Signed in as {session?.user?.email} <br />
      <button
        onClick={clientSideSignOut}
        style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
      >
        Sign out
      </button>
      <Link href="/profile" style={{ marginLeft: "10px" }}>
        Profile
      </Link>
    </p>
  );
}
