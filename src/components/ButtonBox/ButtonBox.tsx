"use client";
import React from "react";

import css from "./ButtonBox.module.css";
import Link from "next/link";

interface ButtonBoxProps {
  option: "link" | "button";
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ButtonBox({
  option = "button",
  href = "",
  onClick,
  children = null,
}: ButtonBoxProps) {
  if (option === "link") {
    return (
      <Link href={href} className={css.linkBox}>
        {children}
      </Link>
    );
  }
  if (option === "button") {
    return (
      <button type="button" onClick={onClick} className={css.linkBox}>
        {children}
      </button>
    );
  }
}
