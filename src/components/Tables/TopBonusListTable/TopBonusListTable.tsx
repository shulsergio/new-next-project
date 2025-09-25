"use client";

import { useEffect, useState } from "react";
import css from "./TopBonusListTable.module.css";
import { fetchAllWeeks } from "@/utils/fetchData";

export interface categorySchema {
  account: string;
  bonus: number;
  item: string;
  day: string;
  week: string;
  prd: string;
  soqty: number;
}

export interface shopBonusesProps {
  type: string;
  session: {
    accessToken: string;
    user: { shop: string; userType: string };
  };
}

export default function TopBonusList({ session }: shopBonusesProps) {
  // const filteredShopBonuses =
  // type === "DA"
  //   ? shopBonuses.filter((item) => item.prd === "SDA" || item.prd === "MDA")
  //   : shopBonuses.filter((item) => item.prd === type);
  const type = session.user.userType || "";
  const accessToken = session.accessToken || "";
  const storeId = session.user.shop || "";
  const [allModels, setAllModels] = useState<[]>;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState<string>("all");
  const [weeks, setWeeks] = useState<string[]>([]);
  // const [isFocusOnly, setIsFocusOnly] = useState(false);
  useEffect(() => {
    const loadAllWeeks = async () => {
      try {
        const allWeeks = await fetchAllWeeks(
          storeId,
          1,
          10000,
          type,
          accessToken
        );
        setWeeks(allWeeks);
        console.log("*** data in FocusModelsManager::: allPrds:::", allPrds);
        if (allWeeks.length > 0) {
          setSelectedWeek(allWeeks[0]);
        }
      } catch (e) {
        console.error("Ошибка при загрузке всех weeks:", e);
      }
    };
    loadAllWeeks();
  }, [accessToken, type]);
  console.log("*** data in TopBonusList weeks", weeks);

  return (
    <>
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
            {filteredShopBonuses.map((item, index) => (
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
    </>
  );
}
