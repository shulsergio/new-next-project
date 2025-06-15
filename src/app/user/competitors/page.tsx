import TextBox from "@/components/TextBox/TextBox";
import css from "./page.module.css";

export default function UsersCompetitorsPage() {
  return (
    <div className={css.container}>
      <h1>Promoters Competitors</h1>
      <TextBox text="Promoters Competitors" />
    </div>
  );
}
