import TextBox from "@/components/TextBox/TextBox";
import css from "./page.module.css";

export default function UsersCompetitorsPage() {
  return (
    <div className={css.container}>
      <TextBox option="text">{"Promoters Competitors"}</TextBox>
    </div>
  );
}
