"use client";

import { useEffect, useState } from "react";
import css from "./TopBonusListTable.module.css";
import { fetchAllWeeks, fetchBonusModels } from "@/utils/fetchData";
import Loader from "@/components/Loader/Loader";

export interface categorySchema {
  storeId: string;
  account: string;
  item: string;
  soqty: number;
  bonus: number;
  prd: string;
  day: string;
  week: string;
}

export interface TopBonusListProps {
  type: string;
  accessToken: string;
  storeId: string;
}

interface ApiResponseModel {
  data: categorySchema[];
}

export default function TopBonusList({
  type,
  accessToken,
  storeId,
}: TopBonusListProps) {
  const [allModels, setAllModels] = useState<categorySchema[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState<string>("all");

  const [week, setWeek] = useState<string[]>([]);
  useEffect(() => {
    const loadAllWeeks = async () => {
      try {
        const allWeeks = await fetchAllWeeks(type, accessToken, storeId);
        setWeek(allWeeks);
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
  console.log("**!! data in TopBonusList weeks", week);
  console.log("**!! data in TopBonusList selectedWeek", selectedWeek);
  //----------------

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData: ApiResponseModel = await fetchBonusModels(
          type,
          accessToken,
          storeId,
          selectedWeek
        );
        setAllModels(fetchedData.data);
        console.log("***!!! shopBonuses fetchedData:", fetchedData);
        // console.log("***!!! shopBonuses allModels:", allModels);
      } catch (e) {
        console.error("Ошибка при загрузке всех weeks:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [accessToken, selectedWeek, setAllModels, storeId, type]);

  //----------------
  const handleWeekChange = (week: string) => {
    setSelectedWeek(week);
  };

  console.log("**!! data in TopBonusList allModels", allModels);
  return (
    <>
      {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>}
      <WeekFilter
        weeks={week}
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
