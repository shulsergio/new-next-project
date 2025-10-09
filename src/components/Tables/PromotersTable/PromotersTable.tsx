"use client";
import React from "react";
import css from "./PromotersTable.module.css";

import { Promoter } from "@/utils/fetchData";
import { getUkrFormatDate } from "@/utils/calculations";

interface PromotersTableProps {
  promoters: Promoter[];
}

export default function PromotersTable({ promoters }: PromotersTableProps) {
  // const newDate = promoters[0].lastVisit;
  // console.log("LASTVISIT date:", newDate);
  // console.log("LASTVISIT date:", newDate?.toString());
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Region</th>
            <th>Promoter</th>
            <th>MCS id</th>
            <th>Type</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody>
          {promoters.map((promoter) => (
            <tr key={promoter._id}>
              <td>{promoter.region}</td>
              <td>{promoter.name}</td>
              <td>{promoter.mcsId}</td>
              <td>{promoter.userType}</td>
              <td>
                {getUkrFormatDate(promoter.lastVisit?.toString() ?? "null")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
