"use client";
import React from "react";
import css from "./ProfileUserShopBox.module.css";
import { useSession } from "next-auth/react";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
// import { fetchShopsById } from "@/utils/fetchData";

export function ProfileUserShopBox() {
  const { data: session } = useSession();
  const userProfile = session?.user;
  console.log("User Profile DATA IN ProfileUserShopBox:", userProfile);

  // const shopsData = fetchShopsById(
  //   userProfile?.shop || "",
  //   session?.accessToken || ""
  // );
  // console.log("shopsData DATA IN ProfileUserShopBox:", shopsData);

  return (
    <ComponentWrapper>
      <TextBox option="static">
        Shop: <span className={css.span}>{userProfile?.shop || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Chain: <span className={css.span}>{"X"}</span>
      </TextBox>
      <TextBox option="static">
        Addr: <span className={css.span}>{"X"}</span>
      </TextBox>
    </ComponentWrapper>
  );
}
