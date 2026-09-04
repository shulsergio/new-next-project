"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 1. Ждем завершения проверки сессии
    if (status === "loading") return;

    const isAdmin =
      session?.user?.role === "admin" ||
      session?.user?.permissions?.canAccessAdminPanel === true;

    if (status === "unauthenticated" || !isAdmin) {
      router.push("/signin?error=unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader isLoading={true} />
      </div>
    );
  }

  const isAdmin =
    session?.user?.role === "admin" ||
    session?.user?.permissions?.canAccessAdminPanel === true;

  if (status === "unauthenticated" || !isAdmin) {
    return null;
  }

  // Если всё отлично — рендерим макет админки и текущую страницу
  return <div className="admin-layout">{children}</div>;
}
