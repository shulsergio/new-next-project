"use client";
import React from "react";
import css from "./PromotersTable.module.css";

import { Promoter } from "@/utils/fetchData";
// import { getUkrFormatDate } from "@/utils/calculations";

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
            <th>Chain</th>
            <th>Name</th>
            <th>MCS id</th>
            <th>Type</th>
            <th>Hired</th>
            <th>Dismiss</th>
          </tr>
        </thead>
        <tbody>
          {promoters.map((promoter) => (
            <tr key={promoter._id}>
              <td>{promoter.region}</td>
              <td>{promoter.region}</td>
              <td>{promoter.name}</td>
              <td>{promoter.mcsId}</td>
              <td>{promoter.userType}</td>
              <td>{promoter.DateOfHired}</td>
              <td>
                {Number(promoter.DateOfFired) === 0
                  ? "-"
                  : promoter.DateOfFired}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
