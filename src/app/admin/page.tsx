"use client";

import { useState } from "react";
import css from "./admin.module.css";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";

import AdminPromotersPage from "./promoters/page";
import AdminPlansPage from "./promoters/plans/page";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import AdminPromotersMotivationPage from "./promoters/motivation/page";
import { useAccess } from "@/hooks/useAccess";
// import { getServerSession } from "next-auth";
// import { authConfig } from "../configs/authConfig";

/**
 *
 * Admin page component
 * This ONLY for ADMIN role
 * If role Admin- this page, if not- Profile page
 * @export
 * @return {*}
 */
export default function Admin() {
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const { hasPermission } = useAccess();

  const renderContent = () => {
    switch (currentPage) {
      case "promoters":
        return <AdminPromotersPage />;
      case "promoters/plans":
        return <AdminPlansPage />;
      case "promoters/motivation":
        return <AdminPromotersMotivationPage />;
      // case "competitors":
      //   return <CompetitorsData />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <ComponentAdminWrapper title="admin panel" />
      <div className={css.mainContainer}>
        <div className={css.buttonBox}>
          <ComponentAdminWrapper>
            {hasPermission("canAccessPromsListData") && (
              <ButtonBox
                option="button"
                // href="admin/promoters"
                onClick={() => setCurrentPage("promoters")}
              >
                promoters data
              </ButtonBox>
            )}
            <ButtonBox
              option="button"
              // href="admin/promoters/plans"
              onClick={() => setCurrentPage("promoters/plans")}
            >
              promoters plans
            </ButtonBox>
            <ButtonBox option="link" href="user/motivation">
              Motivation
            </ButtonBox>

            <ButtonBox option="link" href="user/focus-models">
              Focus Models
            </ButtonBox>
          </ComponentAdminWrapper>
        </div>
        <div className={css.dataBox}>{renderContent()}</div>
      </div>
    </>
  );
}
