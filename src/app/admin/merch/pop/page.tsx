import ExportPopsButton from "@/components/ExportPopsButton/ExportPopsButton";
import css from "./page.module.css";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
// import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ExportInventoryButton from "@/components/ExportInventoryButton/ExportInventoryButton";

export default function AdminPopDataPage() {
  return (
    <div className={css.container}>
      <ComponentAdminWrapper title="Export POPs data">
        <ExportPopsButton />
      </ComponentAdminWrapper>
      <ComponentAdminWrapper title="Export Inventory Data">
        <ExportInventoryButton />
      </ComponentAdminWrapper>
    </div>
  );
}
