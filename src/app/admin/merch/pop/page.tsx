import ExportPopsButton from "@/components/ExportPopsButton/ExportPopsButton";
import css from "./page.module.css";

export default function AdminPopDataPage() {
  return (
    <div className={css.container}>
      <ExportPopsButton />
    </div>
  );
}
