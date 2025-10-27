"use client";

import css from "./page.module.css";
import { fetchFocusModels } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import PaginationButtons from "../PaginationButtons/page";
import FocusModelsTable, { FocusModel } from "../Tables/FocusModelsTable/page";
import Loader from "../Loader/Loader";
import { useSession } from "next-auth/react";
import { MONTH_DATA, PRD_AV_DATA, PRD_DA_DATA } from "@/constants/constants";

interface FocusModelsManagerProps {
  limit: number;
  // newType: string;
  accessToken: string;
}

interface ApiResponseModel {
  data: {
    data: FocusModel[];
    totalCount: number;
  };
}

export default function FocusModelsManager({
  limit,
  // newType,
  accessToken,
}: FocusModelsManagerProps) {
  const { data: session } = useSession();
  let prdData = [""];
  const newType = session?.user.userType || "";
  if (newType === "AV") {
    prdData = [...["all"], ...PRD_AV_DATA];
  }
  if (newType === "DA") {
    prdData = [...["all"], ...PRD_DA_DATA];
  }
  if (newType === "CE") {
    prdData = [...PRD_DA_DATA, ...PRD_AV_DATA];
  }
  console.log("----newType-----", newType);
  const [focusModels, setFocusModels] = useState<FocusModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [selectedPrd, setSelectedPrd] = useState<string>(prdData[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    MONTH_DATA[MONTH_DATA.length - 1]
  );
  const [type, setSelectedType] = useState<string>(newType);
  const [isFocusOnly, setIsFocusOnly] = useState(false);
  const [isBonusOnly, setIsBonusOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      console.log("------ type 111 -------", type);
      try {
        const fetchedData: ApiResponseModel = await fetchFocusModels(
          curPage,
          limit,
          type,
          accessToken,
          selectedPrd,
          selectedMonth,
          isFocusOnly,
          isBonusOnly
        );
        setFocusModels(fetchedData.data.data);
        console.log("*** data in FocusModelsManager fetchedData:", fetchedData);
        setTotalCount(fetchedData.data.totalCount);
      } catch (e) {
        console.error("Ошибка при загрузке данных:", e);
      } finally {
        setLoading(false);
      }
    };
    if (selectedPrd !== null) {
      loadData();
    }
  }, [
    curPage,
    limit,
    type,
    accessToken,
    selectedPrd,
    isFocusOnly,
    isBonusOnly,
    selectedMonth,
  ]);

  const handlePrdChange = (prd: string) => {
    setSelectedPrd(prd);
    setSelectedType(PRD_AV_DATA.includes(prd) ? "AV" : "DA");
    console.log("------ type 222 -------", type);
    setCurPage(1);
  };
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setCurPage(1);
  };
  const handleFocusChange = (isChecked: boolean) => {
    setIsFocusOnly(isChecked);
    setCurPage(1);
  };
  const handleBonusChange = (isChecked: boolean) => {
    setIsBonusOnly(isChecked);
    setCurPage(1);
  };
  // console.log("data in FocusModelsManager prds:", prds);

  const hasPrevPage = curPage > 1;
  const hasNextPage = curPage * limit < totalCount;

  const handleNextClick = () => setCurPage((prevPage) => prevPage + 1);
  const handlePrevClick = () => setCurPage((prevPage) => prevPage - 1);

  return (
    <>
      {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && (
        <>
          <div className={css.filterWrapperBox}>
            <MonthFilter
              months={MONTH_DATA}
              onMonthChange={handleMonthChange}
              selectedMonth={selectedMonth}
            />

            <PrdFilter
              prdData={prdData}
              onPrdChange={handlePrdChange}
              selectedPrd={selectedPrd}
            />

            <div className={css.focusFilterBox}>
              <FocusFilter
                isFocusOnly={isFocusOnly}
                onFocusChange={handleFocusChange}
              />
              <BonusFilter
                isBonusOnly={isBonusOnly}
                onBonusChange={handleBonusChange}
              />
            </div>
          </div>
          {<FocusModelsTable focusModels={focusModels} />}
          <PaginationButtons
            onPreviousClick={handlePrevClick}
            onNextClick={handleNextClick}
            hasPreviousPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </>
  );
}
interface PrdFilterProps {
  prdData: string[];
  selectedPrd: string | null;
  onPrdChange: (prd: string) => void;
}

function PrdFilter({ prdData, selectedPrd, onPrdChange }: PrdFilterProps) {
  return (
    <div className={css.prdFilterBox}>
      <label htmlFor="prdSelect" className={css.selectLabel}>
        Filter group:
      </label>
      <select
        id="prdSelect"
        value={selectedPrd || ""}
        onChange={(e) => onPrdChange(e.target.value)}
        className={css.selectBox}
      >
        {prdData.map((prd) => (
          <option key={prd} value={prd}>
            {prd}
          </option>
        ))}
      </select>
    </div>
  );
}

interface MonthFilterProps {
  months: string[];
  selectedMonth: string | null;
  onMonthChange: (month: string) => void;
}

function MonthFilter({
  months,
  selectedMonth,
  onMonthChange,
}: MonthFilterProps) {
  return (
    <div className={css.prdFilterBox}>
      <label htmlFor="prdSelect" className={css.selectLabel}>
        Filter month:
      </label>
      <select
        id="prdSelect"
        value={selectedMonth || ""}
        onChange={(e) => onMonthChange(e.target.value)}
        className={css.selectBox}
      >
        {months.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FocusFilterProps {
  isFocusOnly: boolean;
  onFocusChange: (isChecked: boolean) => void;
}

function FocusFilter({ isFocusOnly, onFocusChange }: FocusFilterProps) {
  return (
    <div>
      <label className={css.selectLabel}>
        Focus only{" "}
        <input
          className={css.inputLabel}
          type="checkbox"
          checked={isFocusOnly}
          onChange={(e) => onFocusChange(e.target.checked)}
        ></input>
        <span></span>
      </label>
    </div>
  );
}

interface BonusFilterProps {
  isBonusOnly: boolean;
  onBonusChange: (isChecked: boolean) => void;
}

function BonusFilter({ isBonusOnly, onBonusChange }: BonusFilterProps) {
  return (
    <div className={css.focusFilterBox}>
      <label className={css.selectLabel}>
        Bonus only{" "}
        <input
          className={css.inputLabel}
          type="checkbox"
          checked={isBonusOnly}
          onChange={(e) => onBonusChange(e.target.checked)}
        ></input>
        <span></span>
      </label>
    </div>
  );
}
