"use client";

import { useSearchParams } from "next/navigation";
import { SignInForm } from "../../components/SignInForm/SignInForm";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("You are not logged in");
    }
  }, [error]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
