"use client";

import css from "./page.module.css";
import { fetchAllPrds, fetchFocusModels } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import PaginationButtons from "../PaginationButtons/page";
import FocusModelsTable, { FocusModel } from "../Tables/FocusModelsTable/page";
import Loader from "../Loader/Loader";

interface FocusModelsManagerProps {
  limit: number;
  type: string;
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
  type,
  accessToken,
}: FocusModelsManagerProps) {
  const [focusModels, setFocusModels] = useState<FocusModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPrd, setSelectedPrd] = useState<string>("all");
  const [prds, setPrds] = useState<string[]>([]);
  const [isFocusOnly, setIsFocusOnly] = useState(false);
  const [isBonusOnly, setIsBonusOnly] = useState(false);
  useEffect(() => {
    const loadAllPrds = async () => {
      try {
        const allPrds = await fetchAllPrds(1, 10000, type, accessToken);
        setPrds(allPrds);
        console.log("*** data in FocusModelsManager::: allPrds:::", allPrds);
        if (allPrds.length > 0) {
          setSelectedPrd(allPrds[0]);
        }
      } catch (e) {
        console.error("Ошибка при загрузке всех PRD:", e);
      }
    };
    loadAllPrds();
  }, [accessToken, type]);
  console.log("*** data in FocusModelsManager prds", prds);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData: ApiResponseModel = await fetchFocusModels(
          curPage,
          limit,
          type,
          accessToken,
          selectedPrd,
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
  ]);

  const handlePrdChange = (prd: string) => {
    setSelectedPrd(prd);
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
  console.log("data in FocusModelsManager prds:", prds);

  const hasPrevPage = curPage > 1;
  const hasNextPage = curPage * limit < totalCount;

  const handleNextClick = () => setCurPage((prevPage) => prevPage + 1);
  const handlePrevClick = () => setCurPage((prevPage) => prevPage - 1);

  console.log("*** FocusModelsManager curPage:", curPage);
  console.log("*** FocusModelsManager totalCount:", totalCount);
  console.log("***  FocusModelsManager handlePrevClick:", handlePrevClick);
  console.log("*** FocusModelsManager handleNextClick:", handleNextClick);
  console.log("*** FocusModelsManager hasPrevPage:", hasPrevPage);
  console.log("*** FocusModelsManager hasNextPage:", hasNextPage);

  return (
    <>
      {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && (
        <>
          <div className={css.filterWrapperBox}>
            <PrdFilter
              prds={prds}
              onPrdChange={handlePrdChange}
              selectedPrd={selectedPrd}
            />
            <div className={css.focusFilterBox}>
              {" "}
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
  prds: string[];
  selectedPrd: string | null;
  onPrdChange: (prd: string) => void;
}

function PrdFilter({ prds, selectedPrd, onPrdChange }: PrdFilterProps) {
  return (
    <div className={css.prdFilterBox}>
      <label htmlFor="prdSelect" className={css.selectLabel}>
        Filter by Group:
      </label>
      <select
        id="prdSelect"
        value={selectedPrd || ""}
        onChange={(e) => onPrdChange(e.target.value)}
        className={css.selectBox}
      >
        {prds.map((prd) => (
          <option key={prd} value={prd}>
            {prd}
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
