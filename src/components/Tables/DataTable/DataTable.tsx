"use client";

import css from "./DataTable.module.css";

export default function DataTable({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  // console.log("DataTable entries:", entries);
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
