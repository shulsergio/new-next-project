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
  target?: string;
  rel?: string;
}

export default function ButtonBox({
  option = "button",
  type = "button",
  href = "",
  onClick,
  children = null,
  disabled = false,
  target = "_self",
  rel = "",
}: ButtonBoxProps) {
  if (option === "link") {
    return (
      <Link href={href} className={css.linkBox} target={target} rel={rel}>
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
