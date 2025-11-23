"use client";
import React, { useCallback, useEffect, useState } from "react";
import css from "./UserInfoBox.module.css";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import TextBox from "../TextBox/TextBox";
import Modal from "../Modal/Modal";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useApiClient } from "@/hooks/useApiClient";
import ButtonBox from "../ButtonBox/ButtonBox";
import Loader from "../Loader/Loader";
import { UniformSizeData } from "@/constants/constants";

interface ApiPatchResponse {
  data: {
    dateOfBirth: string;
  };
}

// -- UniformSizeData --

export function UserInfoBox() {
  const { apiClient } = useApiClient();

  const { data: session, update } = useSession();
  const userProfile = session?.user;
  // console.log("User apiClient DATA IN PROFILE:", apiClient);
  // console.log("User Profile DATA IN PROFILE:", userProfile);

  const userInfoTitle = `User info`;

  const [uniformEditValue, setUniformEditValue] = useState(
    userProfile?.uniform || ""
  );
  const [isSave, setIsSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [displayDateOfBirth, setDisplayDateOfBirth] = useState(
  //   userProfile?.dateOfBirth || null
  // );
  const [dateOfBirthEditValue, setDateOfBirthEditValue] = useState(
    userProfile?.dateOfBirth ? userProfile.dateOfBirth.split("T")[0] : ""
  );
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isDateSave, setIsDateSave] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = newPassword === confirmPassword;
  const isConfirmError = confirmPassword && !passwordsMatch;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("All password fields must be filled");
        console.error("Validation Error: All password fields must be filled.");
        return;
      }

      if (!passwordsMatch) {
        toast.error("New and confirm pass do not match");
        console.log("New and confirm pass do not match");
        return;
      }

      if (newPassword.length < 3) {
        toast.error("New pass < 3 characters");
        console.log("Пароль должен быть не менее 3 символов");
        return;
      }

      setIsLoading(true);

      const dataToSend = {
        outDatePassword: currentPassword,
        newPassword: newPassword,
      };

      try {
        const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/password`;
        const result = await apiClient(BackApi, {
          method: "PATCH",
          body: JSON.stringify(dataToSend),
        });
        toast.success("Password changed!");
        console.log("result FROM BACKEND (PATCH):", result);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err: unknown) {
        toast.error("Error!");
        console.error("Ошибка при обновлении пароля:", err);
        if (err instanceof Error) {
          toast.error(
            err.message.includes("Details:")
              ? err.message.split("Details:")[1].trim()
              : "Не удалось обновить пароль. Проверьте старый пароль."
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiClient, currentPassword, newPassword, confirmPassword, passwordsMatch]
  );
  const handlePasswordChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setError(null);
    setter(value);
  };
  //-------------------------
  useEffect(() => {
    setUniformEditValue(userProfile?.uniform || "");
    setDateOfBirthEditValue(
      userProfile?.dateOfBirth ? userProfile?.dateOfBirth?.split("T")[0] : ""
    );
    // setDisplayDateOfBirth(userProfile?.dateOfBirth || null);
  }, [userProfile?.uniform, userProfile?.dateOfBirth]);

  //--- модалка
  const openModal = () => {
    setUniformEditValue(userProfile?.uniform || "");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSave(false);
  };

  const openDateModal = () => {
    setDateOfBirthEditValue(
      userProfile?.dateOfBirth ? userProfile.dateOfBirth.split("T")[0] : ""
    );
    setIsDateModalOpen(true);
  };

  const closeDateModal = () => {
    setIsDateModalOpen(false);
    setIsDateSave(false);
  };

  const handleDateSaveBtn = async () => {
    setIsDateSave(true);

    if (!userProfile?.id || !dateOfBirthEditValue) {
      toast.error("Ошибка: Не выбрана дата или нет ID пользователя.");
      setIsDateSave(false);
      return;
    }

    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userProfile.id}/dateOfBirth`;
    console.log("USRE INFO BOX userProfile.id", userProfile.id);
    console.log("USRE INFO BOX BackApi", BackApi);
    console.log("USRE INFO BOX dateOfBirthEditValue", dateOfBirthEditValue);
    try {
      const result = await apiClient(BackApi, {
        method: "PATCH",
        body: JSON.stringify({ dateOfBirth: dateOfBirthEditValue }),
      });

      console.log("result FROM BACKEND (PATCH dateOfBirth):", result);
      const apiResult = result as ApiPatchResponse;
      console.log("USRE INFO BOX apiResult ", apiResult);
      console.log(
        "USRE INFO BOX apiResult.data.dateOfBirth ",
        apiResult.data.dateOfBirth
      );
      await update({
        user: {
          ...session!.user,
          dateOfBirth: apiResult.data.dateOfBirth,
        },
      });
      // setDisplayDateOfBirth(apiResult.data.dateOfBirth);

      setDateOfBirthEditValue(apiResult.data.dateOfBirth.split("T")[0]);
      console.log(
        "Session updated №2. New dateOfBirth №2:",
        session?.user?.dateOfBirth
      );
      toast.success("Date of Birth changed!");
      closeDateModal();
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        !error.message.includes("Session expired")
      ) {
        toast.error(error.message || "Не удалось обновить дату рождения.");
      }
    } finally {
      setIsDateModalOpen(false);
      setIsDateSave(false);
    }
  };

  const handleSaveBtn = async () => {
    setIsSave(true);

    if (!userProfile?.id) {
      toast.error("Ошибка: Нет ID пользователя.");
      setIsSave(false);
      return;
    }
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userProfile.id}/uniform`;

    try {
      const result = await apiClient(BackApi, {
        method: "PATCH",
        body: JSON.stringify({ newUniformValue: uniformEditValue.trim() }),
      });

      console.log("result FROM BACKEND (после PATCH):", result);

      await update({
        user: {
          ...session!.user,
          uniform: uniformEditValue.trim(),
        },
      });

      toast.success("Size changed!");
      closeModal();
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        !error.message.includes("Session expired")
      ) {
        toast.error(error.message || "Не удалось обновить размер униформы.");
      }
    } finally {
      setIsModalOpen(false);
      setIsSave(false);
    }
  };

  return (
    <>
      {error && <p>Error</p>}
      {isLoading && <Loader isLoading={true} />}
      <ComponentWrapper title={userInfoTitle}>
        <TextBox option="static">
          Role: <span className={css.span}>{userProfile?.role || "-"}</span>
        </TextBox>
        <TextBox option="static">
          User type:{" "}
          <span className={css.span}>{userProfile?.userType || "-"}</span>
        </TextBox>
        <TextBox option="static">
          Region: <span className={css.span}>{userProfile?.region || "-"}</span>
        </TextBox>
        <TextBox option="static">
          mcsId: <span className={css.span}>{userProfile?.mcsId || "-"}</span>
        </TextBox>

        <TextBox option="static">
          Date of Birth:
          <span className={css.span}>
            {dateOfBirthEditValue
              ? new Date(dateOfBirthEditValue).toLocaleDateString("uk-UA")
              : "-"}
          </span>
          <button
            onClick={openDateModal}
            className={css.editButton}
            aria-label="дата рождения"
          >
            &#10004;
          </button>
          <Modal
            isOpen={isDateModalOpen}
            onClose={closeDateModal}
            title="Date of Birth"
          >
            <div className={css.modalForm}>
              <label htmlFor="dateOfBirth" className={css.modalLabel}>
                New Date:
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirthEditValue}
                onChange={(e) => setDateOfBirthEditValue(e.target.value)}
                className={css.modalSelect}
                disabled={isDateSave}
              />
              <button
                onClick={handleDateSaveBtn}
                className={css.modalSaveButton}
                disabled={isDateSave}
              >
                {isDateSave ? <Loader isLoading={true} /> : "Save"}
              </button>
            </div>
          </Modal>
        </TextBox>

        <TextBox option="static">
          Uniform:{" "}
          <span className={css.span}>{userProfile?.uniform || "-"}</span>
          <button
            onClick={openModal}
            className={css.editButton}
            aria-label="размер"
          >
            &#10004;
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Uniform">
            <div className={css.modalForm}>
              <label htmlFor="uniformSize" className={css.modalLabel}>
                New size:
              </label>

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
                {isSave ? <Loader isLoading={true} /> : "Save"}
              </button>
            </div>
          </Modal>
        </TextBox>
      </ComponentWrapper>
      <ComponentWrapper title="change password">
        <form id="passwordChangeForm" onSubmit={handleSubmit}>
          <div className={css.formData}>
            <label htmlFor="current_password"> old pass</label>
            <input
              type="password"
              onChange={(e) =>
                handlePasswordChange(setCurrentPassword, e.target.value)
              }
              id="current_password"
              value={currentPassword}
              placeholder="enter pass"
              required
            />
          </div>

          <div className={css.formData}>
            <label htmlFor="new_password">new password</label>
            <input
              type="password"
              value={newPassword}
              id="new_password"
              onChange={(e) =>
                handlePasswordChange(setNewPassword, e.target.value)
              }
              placeholder="enter pass"
              required
              autoComplete="new-password"
            />
          </div>

          <div className={css.formData}>
            <label htmlFor="confirm_password">confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              id="confirm_password"
              onChange={(e) =>
                handlePasswordChange(setConfirmPassword, e.target.value)
              }
              placeholder="enter pass"
              required
            />
            {isConfirmError && (
              <p className={css.errConfirmPassword}>Passwords do not match.</p>
            )}
          </div>
          <ButtonBox
            option="button"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Change
          </ButtonBox>
        </form>
      </ComponentWrapper>
      <ButtonBox option="link" href="/profile/">
        Back
      </ButtonBox>
    </>
  );
}
