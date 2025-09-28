"use client";

import { useEffect, useState } from "react";
import css from "./TopBonusPageManager.module.css";
import { fetchAllWeeks, fetchBonusModels } from "@/utils/fetchData";
import Loader from "@/components/Loader/Loader";
import TopBonusModelsTable from "../Tables/TopBonusModelsTable/page";

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

export interface TopBonusPageManagerProps {
  type: string;
  accessToken: string;
  storeId: string;
}

interface ApiResponseModel {
  data: {
    bonuses: categorySchema[];
  };
}

export default function TopBonusPageManager({
  type,
  accessToken,
  storeId,
}: TopBonusPageManagerProps) {
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
        // Добавляем проверку
        if (Array.isArray(fetchedData.data.bonuses)) {
          setAllModels(fetchedData.data.bonuses);
        } else {
          console.error(
            "fetchedData.data.bonuses не является массивом:",
            fetchedData.data.bonuses
          );
          setAllModels([]); // устанавливаем пустой массив как fallback
        }
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
  console.log("**!! data in TopBonusList typeof allModels", typeof allModels);
  return (
    <>
      {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>}
      <div className={css.filterWrapperBox}>
        <WeekFilter
          weeks={week}
          onWeekChange={handleWeekChange}
          selectedWeek={selectedWeek}
        />
      </div>
      <div className={css.tableWrapper}>
        <TopBonusModelsTable allModels={allModels} />
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
    <div className={css.FilterBox}>
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
