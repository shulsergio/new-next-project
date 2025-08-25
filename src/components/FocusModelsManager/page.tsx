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

interface ApiResponse {
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
        const fetchedData: ApiResponse = await fetchFocusModels(
          curPage,
          limit,
          type,
          accessToken,
          selectedPrd
        );
        setFocusModels(fetchedData.data.data);
        console.log("*** data in FocusModelsManager fetchedData:", fetchedData);
        setTotalCount(fetchedData.data.totalCount);
      } catch (e) {
        console.error("Ошибка при загрузке данных:", e);
        // setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };
    if (selectedPrd !== null) {
      loadData();
    }
  }, [curPage, limit, type, accessToken, selectedPrd]);

  const handlePrdChange = (prd: string) => {
    setSelectedPrd(prd);
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
          <PrdFilter
            prds={prds}
            onPrdChange={handlePrdChange}
            selectedPrd={selectedPrd}
          />
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
    <div>
      <label htmlFor="prdSelect" className={css.modalLabel}>
        Filter by Group:
      </label>
      <select
        id="prdSelect"
        value={selectedPrd || ""}
        onChange={(e) => onPrdChange(e.target.value)}
        className={css.modalSelect}
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
