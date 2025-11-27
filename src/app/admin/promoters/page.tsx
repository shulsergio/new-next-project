"use client";
import React, { useEffect, useState } from "react";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PromotersTable from "@/components/Tables/PromotersTable/PromotersTable";
import {
  // fetchAllPromoters,
  fetchSamePromoters,
  Promoter,
} from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import DataTable from "@/components/Tables/DataTable/DataTable";
import { useAccess } from "@/hooks/useAccess";
import PromotersTableAllData from "@/components/Tables/PromotersTableAllData/page";
import Calendar from "@/components/Date_calendar/Calendar";
import { REGION } from "@/constants/constants";

export default function AdminPromotersPage() {
  const regionData = ["all", ...REGION];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotersData, setPromotersData] = useState<Promoter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  const { hasPermission } = useAccess();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRegion, setselectedRegion] = useState<string>(regionData[0]);
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
  const selectedPromType = "all";
  useEffect(() => {
    const loadPromoters = async () => {
      if (status === "authenticated" && session.accessToken) {
        setLoading(true);
        setError(null);
        try {
          const fetchedData = await fetchSamePromoters(
            selectedPromType,
            selectedRegion,
            // selectedChain
            session.accessToken
          );
          // const fetchedData = await fetchAllPromoters(session.accessToken);
          setPromotersData(fetchedData);
          console.log("Fetched promoters data:", fetchedData);
        } catch (e: unknown) {
          console.error("Error fetching promoters:", e);
          setError("Failed to load promoters data.");
        } finally {
          setLoading(false);
        }
      } else if (status !== "loading") {
        setLoading(false);
      }
    };

    loadPromoters();
  }, [selectedRegion, session, status]);

  const handleRegionChange = (region: string) => {
    setselectedRegion(region);
  };

  const PromsByUserType = promotersData.reduce((acc, promoter) => {
    if (promoter.userType) {
      acc[promoter.userType] = (acc[promoter.userType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  // console.log("Promoters by user type:", PromsByUserType);
  const PromsByRegion = promotersData.reduce((acc, promoter) => {
    if (promoter.region) {
      acc[promoter.region] = (acc[promoter.region] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  // console.log("Promoters by user type:", PromsByRegion);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // console.log("OK:", date ? date.toISOString().split("T")[0] : "null");
  };

  if (status === "loading") {
    return <Loader isLoading={true} />;
  }
  // console.log("-----selectedDate: ", selectedDate);
  return (
    <>
      <ComponentAdminWrapper title="All promoters">
        <div className="filter">
          {loading && <Loader isLoading={true} />}
          {error && <p>Ошибка: {error}</p>}
          {!loading && !error && (
            <RegionFilter
              regions={regionData}
              onRegionChange={handleRegionChange}
              selectedRegion={selectedRegion}
            />
          )}
        </div>
        <div className="filetr222">
          {loading ? (
            <Loader isLoading={true} />
          ) : error ? (
            <p>Error: {error}</p>
          ) : hasPermission("canVisiblePromsListAllData") ? (
            <>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={handleDateChange}
              />
              {/* <PromotersTableAllData promoters={promotersData} /> */}
            </>
          ) : hasPermission("canVisiblePromsListData") ? (
            <>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={handleDateChange}
              />
              {/* <PromotersTable promoters={promotersData} /> */}
            </>
          ) : (
            <p>No data</p>
          )}
        </div>
      </ComponentAdminWrapper>
      <div className={css.adminPromotersPage}>
        <div className={css.promsList}>
          <ComponentAdminWrapper>
            {loading ? (
              <Loader isLoading={true} />
            ) : error ? (
              <p>Error: {error}</p>
            ) : hasPermission("canVisiblePromsListAllData") ? (
              <PromotersTableAllData promoters={promotersData} />
            ) : hasPermission("canVisiblePromsListData") ? (
              <PromotersTable promoters={promotersData} />
            ) : (
              <p>No data</p>
            )}
            {hasPermission("canVisiblePromsListAllData") && (
              <div className={css.buttonGroup}>
                <Link
                  href="/admin/promoters/register"
                  className={css.registerButton}
                >
                  Register New Promoter (Page)
                </Link>
                <button onClick={openModal} className={css.openModalButton}>
                  Register New Promoter (Modal)
                </button>
              </div>
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
                <DataTable
                  data={PromsByUserType || {}}
                  dataHeader={["Type", "Qty"]}
                />
              )}
            </ComponentAdminWrapper>
          </div>
          <div className={css.promsDatabyRegion}>
            <ComponentAdminWrapper title="Qty by Region">
              {loading ? (
                <Loader isLoading={true} />
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <DataTable
                  data={PromsByRegion}
                  dataHeader={["Region", "Qty"]}
                />
              )}
            </ComponentAdminWrapper>
          </div>{" "}
          {/* <div className={css.promsDatabyChain}>
          <ComponentAdminWrapper title="Qty by Chain">
            {loading ? (
              <Loader isLoading={true} />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <DataTable data={PromsByRegion} dataHeader={["Chain", "Qty"]} />
            )}
          </ComponentAdminWrapper>
        </div> */}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Register New Promoter"
        >
          <div>
            <h3>Promoter Registration Form</h3>
            <p>This is where your registration form will go.</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </>
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
