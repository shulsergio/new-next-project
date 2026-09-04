import ExportPopsButton from "@/components/ExportPopsButton/ExportPopsButton";
// import css from "./AdminPopDataView.module.css";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ExportInventoryButton from "@/components/ExportInventoryButton/ExportInventoryButton";
import PopKpiCards from "@/components/PopKpiCards/PopKpiCards";

export default function AdminPopDataView() {
  return (
    <div>
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
