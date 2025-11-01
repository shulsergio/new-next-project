"use client";
import React, { useEffect, useState } from "react";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
// import PromotersTable from "@/components/PromotersTable/PromotersTable";
import {
  fetchAllPlans,
  // fetchAllPromoters,
  fetchSamePromoters,
  Plan,
} from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import css from "./page.module.css";
// import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import PromotersAllPlansTable from "@/components/Tables/PromotersAllPlansTable/PromotersAllPlansTable";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import { PROMS_TYPE_SELECT, REGION } from "@/constants/constants";
import DataTable from "@/components/Tables/DataTable/DataTable";
import Calendar from "@/components/Date_calendar/Calendar";

interface Promoter {
  _id: string;
  name: string;
  region: string;
  userType: string;
}
interface EnrichedPromoter extends Promoter {
  plans: Plan[];
}

export default function AdminPlansPage() {
  const regionData = ["all", ...REGION];
  const [plansData, setPlansData] = useState<EnrichedPromoter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPromType, setSelectedPromType] = useState<string>(
    PROMS_TYPE_SELECT[0]
  );
  const [selectedRegion, setselectedRegion] = useState<string>(regionData[0]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      console.log(
        "Доступ запрещен: пользователь не аутентифицирован или не является админом."
      );
      redirect("/");
    }
  }, [session, status]);
  console.log(",*** STATUS:", status);
  console.log("session.accessToken:", session?.accessToken);
  console.log(",*** selectedRegion:", selectedRegion);

  useEffect(() => {
    // const regionParam = selectedRegion === "all" ? "" : selectedRegion;
    const loadPlans = async () => {
      if (status === "authenticated" && session.accessToken) {
        setLoading(true);
        setError(null);
        try {
          const [fetchedPlans, fetchedPromoters] = await Promise.all([
            fetchAllPlans(session.accessToken),
            fetchSamePromoters(
              selectedPromType,
              selectedRegion,
              // selectedChain
              session.accessToken
            ),
          ]);
          console.log("FFFFFF fetchedPlans data:", fetchedPlans);
          console.log("FFFFFF fetchedPromoters data:", fetchedPromoters);

          const plansByUserId = new Map<string, Plan[]>();

          fetchedPlans.forEach((plan) => {
            const currentPlans = plansByUserId.get(plan.userId) || [];
            currentPlans.push(plan);

            plansByUserId.set(plan.userId, currentPlans);
          });

          console.log("Plans Grouped Map:", plansByUserId);

          const enrichedPromoters: EnrichedPromoter[] = fetchedPromoters.map(
            (promoter) => {
              const plans = plansByUserId.get(promoter._id) || [];

              return {
                ...promoter,
                plans: plans,
              } as EnrichedPromoter;
            }
          );

          setPlansData(enrichedPromoters);
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
  }, [selectedPromType, selectedRegion, session, status]);

  if (status === "loading") {
    return <Loader isLoading={true} />;
  }
  console.log("**** ALL plansData data  ****:", plansData);

  const handlePromTypeChange = (promType: string) => {
    setSelectedPromType(promType);
  };

  const handleRegionChange = (region: string) => {
    setselectedRegion(region);
  };

  let totalPlan = 0,
    totalFact = 0;

  const TotalPlans = plansData.reduce((acc, promoter) => {
    const region = promoter.region;
    const plan = promoter.plans.length > 0 ? promoter.plans[0] : null;

    if (plan) {
      totalPlan += plan.totalSOplan;
      totalFact += plan.totalSOfact;
      acc[region] = Number(((totalFact / totalPlan) * 100).toFixed(1));
    }
    return acc;
  }, {} as Record<string, number>);
  console.log("**** TotalPlans ****:", TotalPlans);

  return (
    <div className={css.adminPromotersPage}>
      <div className={css.promsList}>
        <ComponentAdminWrapper title="Promoters plans">
          {loading && <Loader isLoading={true} />}
          {error && <p>Ошибка: {error}</p>}
          {!loading && !error && (
            <>
              <RegionFilter
                regions={regionData}
                onRegionChange={handleRegionChange}
                selectedRegion={selectedRegion}
              />
              <PromTypeFilter
                promTypes={PROMS_TYPE_SELECT}
                onPromTypeChange={handlePromTypeChange}
                selectedPromType={selectedPromType}
              />
              {/* <ChainFilter
                chains={chainData}
                onRegionChange={handleChainChange}
                selectedChain={selectedChain}
              /> */}
              <PromotersAllPlansTable promotersAllPlans={plansData} />
            </>
          )}
        </ComponentAdminWrapper>
      </div>
      <div className={css.promsData}>
        <div className={css.promsDatabyDep}>
          <ComponentAdminWrapper title="Qty by type">
            {loading ? (
              <Loader isLoading={true} />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <DataTable data={TotalPlans} />
            )}
          </ComponentAdminWrapper>
        </div>
      </div>
    </div>
  );
}
interface RegionFilterProps {
  regions: string[];
  onRegionChange: (region: string) => void;
  selectedRegion: string;
}
function RegionFilter({
  regions,
  onRegionChange,
  selectedRegion,
}: RegionFilterProps) {
  const selectId = "regionSelect";
  return (
    <div className={css.regionFilterBox}>
      <Calendar />
      <label htmlFor={selectId} className={css.selectLabel}>
        Filter region:
      </label>
      <select
        id={selectId}
        value={selectedRegion || ""}
        onChange={(e) => onRegionChange(e.target.value)}
        className={css.selectBox}
      >
        {regions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

interface promTypeFilterProps {
  promTypes: string[];
  onPromTypeChange: (region: string) => void;
  selectedPromType: string;
}
function PromTypeFilter({
  promTypes,
  onPromTypeChange,
  selectedPromType,
}: promTypeFilterProps) {
  const selectId = "promTypeSelect";
  return (
    <div className={css.regionFilterBox}>
      <label htmlFor={selectId} className={css.selectLabel}>
        Filter type:
      </label>
      <select
        id={selectId}
        value={selectedPromType || ""}
        onChange={(e) => onPromTypeChange(e.target.value)}
        className={css.selectBox}
      >
        {promTypes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
