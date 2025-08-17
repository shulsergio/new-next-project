"use client";
import React, { useEffect, useState } from "react";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PromotersTable from "@/components/Tables/PromotersTable/PromotersTable";
import { fetchAllPromoters, Promoter } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import DataTable from "@/components/Tables/DataTable/DataTable";

export default function AdminPromotersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotersData, setPromotersData] = useState<Promoter[]>([]);
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
    const loadPromoters = async () => {
      if (
        status === "authenticated" &&
        session?.user?.role === "admin" &&
        session.accessToken
      ) {
        setLoading(true);
        setError(null);
        try {
          const fetchedData = await fetchAllPromoters(session.accessToken);
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
  }, [session, status]);
  const PromsByUserType = promotersData.reduce((acc, promoter) => {
    if (promoter.userType) {
      acc[promoter.userType] = (acc[promoter.userType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  console.log("Promoters by user type:", PromsByUserType);
  const PromsByRegion = promotersData.reduce((acc, promoter) => {
    if (promoter.region) {
      acc[promoter.region] = (acc[promoter.region] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  console.log("Promoters by user type:", PromsByRegion);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (status === "loading") {
    return <Loader isLoading={true} />;
  }

  return (
    <div className={css.adminPromotersPage}>
      <div className={css.promsList}>
        <ComponentAdminWrapper title="All promoters">
          {loading ? (
            <Loader isLoading={true} />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <PromotersTable promoters={promotersData} />
          )}

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
              <DataTable data={PromsByUserType} />
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
              <DataTable data={PromsByRegion} />
            )}
          </ComponentAdminWrapper>
        </div>{" "}
        <div className={css.promsDatabyChain}>
          <ComponentAdminWrapper title="Qty by Chain">
            {loading ? (
              <Loader isLoading={true} />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <p>---</p>
            )}
          </ComponentAdminWrapper>
        </div>
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
  );
}
