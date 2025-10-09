"use client";
import React from "react";

import css from "./ButtonBox.module.css";
import Link from "next/link";

interface ButtonBoxProps {
  option: "link" | "button";
  type?: "submit" | "button";
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  disabled?: boolean;
}

export default function ButtonBox({
  option = "button",
  type = "button",
  href = "",
  onClick,
  children = null,
  disabled = false,
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
      <button
        type={type}
        onClick={onClick}
        className={css.linkBox}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
