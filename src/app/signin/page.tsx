// import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
  keywords: ["sign in", "login", "authentication"],
  authors: [{ name: "Shulcman" }],
  robots: {
    index: true,
    follow: true,
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SignInPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          {/* <SignIn /> */}
          <p className="text-center text-gray-500">
            Sign in functionality is not implemented yet.
          </p>
        </div>
      </div>
    </>
  );
}
