import ExportPopsButton from "@/components/ExportPopsButton/ExportPopsButton";
import css from "./page.module.css";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ExportInventoryButton from "@/components/ExportInventoryButton/ExportInventoryButton";
import PopKpiCards from "@/components/PopKpiCards/PopKpiCards";

export default function AdminPopDataPage() {
  return (
    <div className={css.container}>
      <ComponentAdminWrapper title="Export POPs data">
        <PopKpiCards />
        <ExportPopsButton />
      </ComponentAdminWrapper>
      <ComponentAdminWrapper title="Export Inventory Data">
        <ExportInventoryButton />
      </ComponentAdminWrapper>
    </div>
  );
}
