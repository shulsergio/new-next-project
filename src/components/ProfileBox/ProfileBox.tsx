import React from "react";
import css from "./ProfileBox.module.css";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";

interface ProfileBoxProps {
  userProfile?: {
    id: string;
    email: string;
    mcsId: string;
    name?: string;
    role?: string;
    userType?: string;
    gender?: string;
    uniform?: string;
    shop?: string;
  } | null;
}

export function ProfileBox({ userProfile }: ProfileBoxProps) {
  const profileTitle = `${userProfile?.role} profile`;
  return (
    <ComponentWrapper title={profileTitle}>
      <TextBox option="static">
        Role: <span className={css.span}>{userProfile?.role || "-"}</span>
      </TextBox>
      <TextBox option="static">
        User type:{" "}
        <span className={css.span}>{userProfile?.userType || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Uniform: <span className={css.span}>{userProfile?.uniform || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Shop: <span className={css.span}>{userProfile?.shop || "-"}</span>
      </TextBox>
    </ComponentWrapper>
  );
}
