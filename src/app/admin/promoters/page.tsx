"use client";
import React, { useEffect, useState } from "react";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PromotersTable from "@/components/PromotersTable/PromotersTable";
import { fetchAllPromoters, Promoter } from "@/utils/fetchData";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (status === "loading") {
    return <Loader isLoading={true} />;
  }

  return (
    <>
      <ComponentWrapper title="All promoters">
        {loading ? (
          <Loader isLoading={true} />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <PromotersTable promoters={promotersData} />
        )}

        <div className={css.buttonGroup}>
          <Link href="/admin/promoters/register" className={css.registerButton}>
            Register New Promoter (Page)
          </Link>
          <button onClick={openModal} className={css.openModalButton}>
            Register New Promoter (Modal)
          </button>
        </div>
      </ComponentWrapper>

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
    </>
  );
}
