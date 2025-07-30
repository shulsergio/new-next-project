'use client';
// import React, { useState } from "react";
import css from "./ProfileBox.module.css";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
// import Modal from "../Modal/Modal";

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
    region?: string;
  } | null;
}

  // const [uniformEditValue, setUniformEditValue] = useState(userProfile?.uniform || '');
  // const [isSave, setIsSave] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);





export function ProfileBox({ userProfile }: ProfileBoxProps) {
  const profileTitle = `${userProfile?.role} profile`;

  // --- модалка 
// const openModal = () => {
//     setUniformEditValue(userProfile?.uniform || '');
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setIsSave(false);  
//   };





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
        Region: <span className={css.span}>{userProfile?.region || "-"}</span>
      </TextBox>
      <TextBox option="static">
        Shop: <span className={css.span}>{userProfile?.shop || "-"}</span>
      {/*    <button 
          onClick={openModal} 
            className={css.editButton} 
            aria-label="Изменить размер униформы"
          >
            &#10006; 
          </button> */}
      </TextBox>


            {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Uniform">
        <div className={css.modalForm}>
          <label htmlFor="uniform-size" className={css.modalLabel}>New size:</label>
          <input
            id="uniform-size"
            type="text"
            value={uniformEditValue}
            onChange={(e) => setUniformEditValue(e.target.value)}
            className={css.modalInput}
            disabled={isSave}  
          />
          <button 
            onClick={handleSaveUniform} 
            className={css.modalSaveButton}
            disabled={isSave} 
          >
            {isSave ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </Modal> */}
    </ComponentWrapper>
  );
}
