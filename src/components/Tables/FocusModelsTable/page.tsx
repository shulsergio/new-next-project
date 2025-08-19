"use client";
import css from "./FocusModelsTable.module.css";
interface FocusModel {
  _id: string;
  sku: string;
  prd: string;
  rrp: string;
  total: number;
  focus: number;
  topFocus: number;
  type?: string;
}

interface FocusModelsTableProps {
  focusModels: FocusModel[];
}

export default function FocusModelsTable({
  focusModels,
}: FocusModelsTableProps) {
  console.log("ALLL FocusModelsTable focusModels:", focusModels);
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>PRD</th>
            <th>SKU</th>
            <th>RRP</th>
            <th>Focus</th>
            <th>Bonus</th>
          </tr>
        </thead>
        <tbody>
          {focusModels.map((model) => (
            <tr key={model._id}>
              <td>{model.prd}</td>
              <td>{model.sku}</td>
              <td>{model.rrp}</td>
              <td>{model.focus}</td>
              <td>{model.topFocus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
