"use client";

import { SignInForm } from "../components/SignInForm";

// import { SignIn } from "@clerk/nextjs";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Sign In",
//   description: "Sign in to your account",
//   keywords: ["sign in", "login", "authentication"],
//   authors: [{ name: "Shulcman" }],
//   robots: {
//     index: true,
//     follow: true,
//   },
// };
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
// };

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
