"use client";
import React, { useEffect, useState } from "react";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
// import PromotersTable from "@/components/PromotersTable/PromotersTable";
import { fetchAllPlans, fetchAllPromoters, Plan } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import css from "./page.module.css";
// import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import PromotersAllPlansTable from "@/components/Tables/PromotersAllPlansTable/PromotersAllPlansTable";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";

export default function AdminPlansPage() {
  const [plansData, setPlansData] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  interface Promoter {
    _id: string;
    name: string;
    region: string;
    userType: string;
  }

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated"  ) {
      console.log(
        "Доступ запрещен: пользователь не аутентифицирован или не является админом."
      );
      redirect("/");
    }
  }, [session, status]);

  useEffect(() => {
    const loadPlans = async () => {
      if (status === "authenticated" && session.accessToken) {
        setLoading(true);
        setError(null);
        try {
          const [fetchedPlans, fetchedPromoters] = await Promise.all([
            fetchAllPlans(session.accessToken),
            fetchAllPromoters(session.accessToken),
          ]);
          console.log("FFFFFF fetchedPlans data:", fetchedPlans);

          console.log("FFFFFF fetchedPromoters data:", fetchedPromoters);

          const promoterMap = new Map<
            string,
            Pick<Promoter, "name" | "region" | "userType">
          >();
          fetchedPromoters.forEach((p) =>
            promoterMap.set(p._id, {
              name: p.name,
              region: p.region,
              userType: p.userType,
            })
          );

          console.log("FFFFFF promoterMap data:", promoterMap);

          const enrichedData = fetchedPlans.map((plan) => ({
            ...plan,
            promoterName: promoterMap.get(plan.userId) || "Неизвестный",
          }));
          console.log("FFFFFF enrichedData data:", enrichedData);
          setPlansData(enrichedData);
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
  console.log("**** ALL PLANS data  ****:", plansData);
  return (
    <>
      <ComponentAdminWrapper title="Promoters plans">
        {loading ? (
          <Loader isLoading={true} />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <PromotersAllPlansTable promotersAllPlans={plansData} />
        )}
      </ComponentAdminWrapper>
    </>
  );
}
