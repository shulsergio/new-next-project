"use client";
import React, { useEffect, useRef } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      modalRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return (
    <div className={`modal-overlay ${className}`}>
      <div className={css.modalContent}>
        <div
          className={css.modalContentClasses}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className={css.modalHeader}>
            {title && <h2>{title}</h2>}
            <button onClick={onClose} className={css.closeButton}>
              &times;
            </button>
          </div>
          <div className={css.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  );
}
