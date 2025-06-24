"use client";
import React from "react";
import css from "./PromotersTable.module.css";

import { Promoter } from "@/utils/fetchData";

interface PromotersTableProps {
  promoters: Promoter[];
}

export default function PromotersTable({ promoters }: PromotersTableProps) {
  return (
    <div className={css.tableWrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Region</th>
            <th>Promoter</th>
            <th>MCS id</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {promoters.map((promoter) => (
            <tr key={promoter._id}>
              <td>{promoter.region}</td>
              <td>{promoter.name}</td>
              <td>{promoter.mcsId}</td>
              <td>{promoter.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
