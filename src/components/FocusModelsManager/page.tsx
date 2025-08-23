"use client";

import { fetchFocusModels } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import PaginationButtons from "../PaginationButtons/page";
import FocusModelsTable from "../Tables/FocusModelsTable/page";
import Loader from "../Loader/Loader";

interface FocusModelsManagerProps {
  limit: number;
  type: string;
  accessToken: string;
}

export default function FocusModelsManager({
  limit,
  type,
  accessToken,
}: FocusModelsManagerProps) {
  const [focusModels, setFocusModels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchFocusModels(
          curPage,
          limit,
          type,
          accessToken
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
    loadData();
  }, [curPage, limit, type, accessToken]);

  const hasPrevPage = curPage > 1;
  const hasNextPage = curPage * limit < totalCount;
  //   const totalPages = Math.ceil(totalCount / limit);

  // const focusModelsArray = focusModels.data.data;
  // console.log("*** data in FocusModelsManager fetchedData:", focusModelsArray);

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
          <FocusModelsTable focusModels={focusModels} />
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
