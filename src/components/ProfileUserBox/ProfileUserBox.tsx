"use client";
import React, { useEffect, useState } from "react";
import css from "./ProfileUserBox.module.css";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
import Modal from "../Modal/Modal";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// -- UniformSizeData --
const UniformSizeData = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

export function ProfileUserBox() {
  const { data: session, update } = useSession();
  const userProfile = session?.user;
  console.log("User Profile DATA IN PROFILE:", userProfile);

  const profileTitle = `${userProfile?.role} profile`;

  const [uniformEditValue, setUniformEditValue] = useState(
    userProfile?.uniform || ""
  );
  const [isSave, setIsSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(
      "EFFECT: session.user.uniform changed to:",
      session?.user?.uniform
    );
    setUniformEditValue(session?.user?.uniform || "");
  }, [session?.user?.uniform]);

  //--- модалка
  const openModal = () => {
    setUniformEditValue(userProfile?.uniform || "");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSave(false);
  };

  const handleSaveBtn = async () => {
    setIsSave(true);

    if (!session?.accessToken || !userProfile?.id) {
      toast.error("Ошибка: Нет доступа или ID пользователя.");
      setIsSave(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userProfile.id}/uniform`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ newUniformValue: uniformEditValue.trim() }),
        }
      );
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(
          errorData.message || "Не удалось обновить размер униформы."
        );
      }
      const result = await response.json();
      console.log("result FROM BACKEND (после PATCH):", result);

      await update({
        user: {
          ...session.user,
          uniform: uniformEditValue.trim(),
        },
      });

      toast.success("Size changed!");
      closeModal();
    } catch (error: unknown) {
      console.error("ERR UNIFORM:", error);
    } finally {
      setIsModalOpen(false);
      setIsSave(false);
    }
  };
  const closeWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  useEffect(() => {
    const hasShownWelcomeModal = sessionStorage.getItem("welcomeModalShown");
    console.log("!!! hasShownWelcomeModal:", hasShownWelcomeModal);
    if (hasShownWelcomeModal !== "1" && !hasShownWelcomeModal) {
      console.log("!!! hasShownWelcomeModal IN IF:", hasShownWelcomeModal);
      setIsWelcomeModalOpen(true);
      sessionStorage.setItem("welcomeModalShown", "1");
    }
  }, []);

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
        <button
          onClick={openModal}
          className={css.editButton}
          aria-label="размер"
        >
          &#10004;
        </button>
        <Modal
          isOpen={isWelcomeModalOpen}
          onClose={closeWelcomeModal}
          title="Hello!"
        >
          <p>Селаут оновлено по 19.09, список фокусів оновлено на вересень.</p>
          <button className={css.modalSaveButton} onClick={closeWelcomeModal}>
            ОК
          </button>
        </Modal>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Uniform">
          <div className={css.modalForm}>
            <label htmlFor="uniformSize" className={css.modalLabel}>
              New size:
            </label>
            {/* <input
            id="uniformSize"
            type="text"
            value={uniformEditValue}
            onChange={(e) => setUniformEditValue(e.target.value)}
            className={css.modalInput}
            disabled={isSave}  
          /> */}

            <select
              id="uniformSize"
              value={uniformEditValue}
              onChange={(e) => setUniformEditValue(e.target.value)}
              className={css.modalSelect}
              disabled={isSave}
            >
              {UniformSizeData.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={handleSaveBtn}
              className={css.modalSaveButton}
              disabled={isSave}
            >
              {isSave ? "Save..." : "Save"}
            </button>
          </div>
        </Modal>
      </TextBox>
      <TextBox option="static">
        Region: <span className={css.span}>{userProfile?.region || "-"}</span>
      </TextBox>
    </ComponentWrapper>
  );
}
