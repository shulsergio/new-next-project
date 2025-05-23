import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  // const router = useRouter();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>HELLO</p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Link href="/signin">
          <button>Register</button>
        </Link>
        <Link href="/auth/signin">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
