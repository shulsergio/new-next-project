"use client";

import { useSearchParams } from "next/navigation";
import { SignInForm } from "../../components/SignInForm/SignInForm";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("You are not logged in");
    }
  }, [error]);

  return <SignInForm />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
