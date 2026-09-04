"use client";

import { useState } from "react";
import css from "./admin.module.css";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import { useAccess } from "@/hooks/useAccess";
import AdminPromotersPlansView from "@/components/AdminViews/AdminPromotersPlansView/AdminPromotersPlansView";
import AdminPopDataView from "@/components/AdminViews/AdminPopDataView/AdminPopDataView";

// ИМПОРТИРУЕМ ОБЫЧНЫЕ КОМПОНЕНТЫ (НЕ page.tsx)
// import AdminPromotersView from "@/components/AdminViews/AdminPromotersView";
// import AdminPlansView from "@/components/AdminViews/AdminPlansView";
// import AdminMotivationView from "@/components/AdminViews/AdminMotivationView";
// import AdminPopDataView from "@/components/AdminViews/AdminPopDataView";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const { hasPermission } = useAccess();

  const renderContent = () => {
    switch (currentPage) {
      case "promoters":
        return null; // <AdminPromotersView />;
      case "promoters/plans":
        return <AdminPromotersPlansView />;
      case "promoters/motivation":
        return null; // <AdminMotivationView />;
      case "merch/pop":
        return <AdminPopDataView />;
      default:
        return null;
    }
  };

  return (
    <>
      <ComponentAdminWrapper title="admin panel" />
      <div className={css.mainContainer}>
        <div className={css.buttonBox}>
          <ComponentAdminWrapper>
            <ButtonBox option="link" href="user/userInfo">
              User Info
            </ButtonBox>

            {hasPermission("canAccessPromsListData") && (
              <ButtonBox
                option="button"
                onClick={() => setCurrentPage("promoters")}
              >
                Proms data
              </ButtonBox>
            )}

            <ButtonBox
              option="button"
              onClick={() => setCurrentPage("promoters/plans")}
            >
              Proms plans
            </ButtonBox>

            <ButtonBox option="link" href="user/motivation">
              Motivation
            </ButtonBox>

            <ButtonBox option="link" href="user/focus-models">
              Focus Models
            </ButtonBox>

            <ButtonBox
              option="button"
              onClick={() => setCurrentPage("merch/pop")}
            >
              Pop Data
            </ButtonBox>
          </ComponentAdminWrapper>
        </div>
        <div className={css.dataBox}>{renderContent()}</div>
      </div>
    </>
  );
}
