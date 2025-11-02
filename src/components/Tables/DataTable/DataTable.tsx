"use client";

import css from "./DataTable.module.css";

interface DataTableProps {
  data: Record<string, number>;
  dataHeader: string[];
}

export default function DataTable({ data, dataHeader }: DataTableProps) {
  const entries = Object.entries(data);
  // console.log("dataHeader", dataHeader);
  const headers = dataHeader || [];
  // const headerOne = dataHeader[0] || "";
  // const headerTwo = dataHeader[1] || "";
  // console.log("DataTable entries:", entries);
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>{headers[0]}</th>
            <th>{headers[1]}</th>
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
