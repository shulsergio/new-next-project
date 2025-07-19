"use client";
import React, { useEffect, useState } from "react";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
// import PromotersTable from "@/components/PromotersTable/PromotersTable";
import { fetchAllPlans, Plan } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import css from "./page.module.css";
// import Link from "next/link";
import Loader from "@/components/Loader/Loader";

export default function AdminPlansPage() {
  const [plansData, setPlansData] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      console.log(
        "Доступ запрещен: пользователь не аутентифицирован или не является админом."
      );
      redirect("/");
    }
  }, [session, status]);

  useEffect(() => {
    const loadPlans = async () => {
      if (
        status === "authenticated" &&
        session?.user?.role === "admin" &&
        session.accessToken
      ) {
        setLoading(true);
        setError(null);
        try {
          const fetchedData = await fetchAllPlans(session.accessToken);
          setPlansData(fetchedData);
          console.log("Fetched PLANS data:", fetchedData);
        } catch (e: unknown) {
          console.error("Error fetching PLANS:", e);
          setError("Failed to load PLANS data.");
        } finally {
          setLoading(false);
        }
      } else if (status !== "loading") {
        setLoading(false);
      }
    };

    loadPlans();
  }, [session, status]);

  if (status === "loading") {
    return <Loader isLoading={true} />;
  }
console.log("**** ALL PLANS data  ****:", plansData );
  return (
    <>
      <ComponentWrapper title="Promoters plans">
        {loading ? (
          <Loader isLoading={true} />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
      <p>text here</p>
        )}

  
      </ComponentWrapper>
    </>
  );
}
