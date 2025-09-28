import { categorySchema } from "@/components/TopBonusPageManager/TopBonusPageManager";
import css from "./TopBonusModelsTable.module.css";

interface TopBonusModelsTableProps {
  allModels: categorySchema[];
}

export default function TopBonusModelsTable({
  allModels,
}: TopBonusModelsTableProps) {
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Qty</th>
            <th>Bonus</th>
            <th>day</th>
            <th>week</th>
          </tr>
        </thead>
        <tbody>
          {allModels.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.soqty}</td>
              <td>{item.bonus}</td>
              <td>{item.day}</td>
              <td>{item.week}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
