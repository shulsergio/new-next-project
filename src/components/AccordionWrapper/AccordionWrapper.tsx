"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import css from "./AccordionWrapper.module.css";
interface AccordionWrapperProps {
  children?: React.ReactNode;
  title?: string;
}

export default function AccordionWrapper({
  title,
  children,
}: AccordionWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.accordionWrapper}>
      <div className={css.accordionTitle} onClick={toggleAccordion}>
        <span>{title}</span>
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </div>
      {isOpen && <div className={css.accordionContent}>{children}</div>}
    </div>
  );
}
