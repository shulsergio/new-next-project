"use client";
import React, { useEffect, useState } from "react";
import css from "./ProfileUserShopBox.module.css";
import { useSession } from "next-auth/react";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
import { fetchShopsById } from "@/utils/fetchData";
import { useApiClient } from "@/hooks/useApiClient";
import ButtonBox from "../ButtonBox/ButtonBox";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

interface shopsData {
  chain: string;
  address: string;
}

export function ProfileUserShopBox() {
  const { apiClient } = useApiClient();
  const { data: session } = useSession();
  const userProfile = session?.user;
  // console.log("User Profile DATA IN ProfileUserShopBox:", userProfile);

  const [shopsData, setShopsData] = useState<shopsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  useEffect(() => {
    const hasShownWelcomeModal = sessionStorage.getItem("welcomeModalShown");
    // console.log("!!! hasShownWelcomeModal:", hasShownWelcomeModal);
    if (hasShownWelcomeModal !== "1" && !hasShownWelcomeModal) {
      // console.log("!!! hasShownWelcomeModal IN IF:", hasShownWelcomeModal);
      setIsWelcomeModalOpen(true);
      sessionStorage.setItem("welcomeModalShown", "1");
    }
  }, []);

  useEffect(() => {
    if (userProfile?.shop) {
      const getShopData = async () => {
        try {
          setIsLoading(true);

          const data = await fetchShopsById(apiClient, userProfile.shop || "");

          // console.log("Fetched shops data:", data.data);

          setShopsData(data.data.shops);
        } catch (error) {
          console.error("Failed to fetch shop data:", error);
          setShopsData(null);
        } finally {
          setIsLoading(false);
        }
      };

      getShopData();
    } else {
      setIsLoading(false);
      setShopsData(null);
    }
  }, [userProfile?.shop, apiClient]);

  if (isLoading) {
    return <Loader isLoading={true} />;
  }
  const profileTitle = `${userProfile?.role} profile`;

  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  return (
    <ComponentWrapper title={profileTitle}>
      <div className={css.box}>
        <ButtonBox option="link" href="user/userInfo">
          🔑 User Info
        </ButtonBox>
        <div className={css.boxSmall}>
          <TextBox option="static">
            Role: <span className={css.span}>{userProfile?.role || "-"}</span>
          </TextBox>
          <TextBox option="static">
            User type:{" "}
            <span className={css.span}>{userProfile?.userType || "-"}</span>
          </TextBox>
          <TextBox option="static">
            Shop: <span className={css.span}>{userProfile?.shop || "-"}</span>
          </TextBox>
          <TextBox option="static">
            Chain: <span className={css.span}>{shopsData?.chain || "-"}</span>
          </TextBox>
          <TextBox option="static">
            Addr: <span className={css.span}>{shopsData?.address || "-"}</span>
          </TextBox>
        </div>
        <Modal
          isOpen={isWelcomeModalOpen}
          onClose={closeWelcomeModal}
          title="Hello!"
        >
          <p>Селаут та бонуси оновлено по 28/12 включно</p>
          <p>фінально SO буде 02/01/26</p>
          <p>Результати кварталу рахуються за 3 місяці</p>
          <button className={css.modalSaveButton} onClick={closeWelcomeModal}>
            ОК
          </button>
        </Modal>
      </div>
    </ComponentWrapper>
  );
}
