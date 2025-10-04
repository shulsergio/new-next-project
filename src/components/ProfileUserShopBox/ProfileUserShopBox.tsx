"use client";
import React, { useEffect, useState } from "react";
import css from "./ProfileUserShopBox.module.css";
import { useSession } from "next-auth/react";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
import { fetchShopsById } from "@/utils/fetchData";
import { useApiClient } from "@/app/configs/useApiClient";

interface shopsData {
  chain: string;
  address: string;
}

export function ProfileUserShopBox() {
  const { apiClient } = useApiClient();
  const { data: session } = useSession();
  const userProfile = session?.user;
  console.log("User Profile DATA IN ProfileUserShopBox:", userProfile);

  const [shopsData, setShopsData] = useState<shopsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.shop) {
      const getShopData = async () => {
        try {
          setIsLoading(true);

          const data = await fetchShopsById(apiClient, userProfile.shop || "");

          console.log("Fetched shops data:", data.data);

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
    return (
      <ComponentWrapper>
        <p> Loading shop data...</p>
      </ComponentWrapper>
    );
  }
  return (
    <ComponentWrapper>
      <TextBox option="static">
        Shop: <span className={css.span}>{userProfile?.shop || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Chain: <span className={css.span}>{shopsData?.chain || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Addr: <span className={css.span}>{shopsData?.address || "-"}</span>
      </TextBox>
    </ComponentWrapper>
  );
}
