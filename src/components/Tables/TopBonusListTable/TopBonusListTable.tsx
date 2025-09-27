"use client";

import { useEffect, useState } from "react";
import css from "./TopBonusListTable.module.css";
import { fetchAllWeeks } from "@/utils/fetchData";
// import Loader from "@/components/Loader/Loader";

export interface categorySchema {
  account: string;
  bonus: number;
  item: string;
  day: string;
  week: string;
  prd: string;
  soqty: number;
}

export interface TopBonusListProps {
  type: string;
  accessToken: string;
  storeId: string;
  // session: object;
}

export default function TopBonusList({
  type,
  accessToken,
  storeId,
}: TopBonusListProps) {
  // const filteredShopBonuses =
  // type === "DA"
  //   ? shopBonuses.filter((item) => item.prd === "SDA" || item.prd === "MDA")
  //   : shopBonuses.filter((item) => item.prd === type);
  // const type = session.user.userType || "";
  // const accessToken = session.accessToken || "";
  // const storeId = session.user.shop || "";

  // const [allModels, setAllModels] = useState<[]>;

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState<string>("all");

  const [weeks, setWeeks] = useState<string[]>([]);
  useEffect(() => {
    const loadAllWeeks = async () => {
      try {
        const allWeeks = await fetchAllWeeks(type, accessToken, storeId);
        setWeeks(allWeeks);
        console.log("*** data in FocusModelsManager::: allPrds:::", allWeeks);
        if (allWeeks.length > 0) {
          setSelectedWeek(allWeeks[0]);
        }
      } catch (e) {
        console.error("Ошибка при загрузке всех weeks:", e);
      }
    };
    loadAllWeeks();
  }, [accessToken, type, storeId]);
  console.log("*** data in TopBonusList weeks", weeks);
  console.log("*** data in TopBonusList selectedWeek", selectedWeek);
  // let shopBonuses = [];
  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const fetchedData = await fetchAllWeeks(
  //         1,
  //         10000,
  //         type,
  //         accessToken,
  //         storeId
  //       );
  //       // setAllModels(fetchedData);
  //       console.log("***!!! shopBonuses fetchedData:", fetchedData);
  //       // console.log("***!!! shopBonuses allModels:", allModels);
  //     } catch (e) {
  //       console.error("Ошибка при загрузке всех weeks:", e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadData();
  // }, [accessToken, type, storeId, selectedWeek]);
  const handleWeekChange = (week: string) => {
    setSelectedWeek(week);
  };
  return (
    <>
      {/* {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>} */}
      <WeekFilter
        weeks={weeks}
        onWeekChange={handleWeekChange}
        selectedWeek={selectedWeek}
      />
      <div className={css.tableWrapper}>
        <p>edit...</p>
        {/* <table className={css.table}>
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
        </table> */}
      </div>
    </>
  );
}

interface WeekFilterProps {
  weeks: string[];
  selectedWeek: string | null;
  onWeekChange: (prd: string) => void;
}

function WeekFilter({ weeks, selectedWeek, onWeekChange }: WeekFilterProps) {
  return (
    <div className={css.prdFilterBox}>
      <label htmlFor="prdSelect" className={css.selectLabel}>
        Filter by week:
      </label>
      <select
        id="prdSelect"
        value={selectedWeek || ""}
        onChange={(e) => onWeekChange(e.target.value)}
        className={css.selectBox}
      >
        {weeks.map((prd) => (
          <option key={prd} value={prd}>
            {prd}
          </option>
        ))}
      </select>
    </div>
  );
}
