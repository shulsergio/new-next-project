"use client";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import css from "./page.module.css";
import { fetchDavDataClusters } from "@/utils/fetchData";
import AvDavMotivationTable from "../Tables/AvDavMotivationTable/page";

const selectClusters = ["1", "2", "3", "4", "5"];

export default function MotivationBox({ accessToken }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(selectClusters[0]);
  const [data, setData] = useState(null);
  //  setSelectedCluster(selectClusters[0]);

  const handleSelectChange = (clusterName) => {
    setSelectedCluster(clusterName);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchDavDataClusters(
          selectedCluster,
          accessToken
        );
        console.log("*** data in MotivationBox clusters:::", fetchedData);
        setData(fetchedData.data.davMotivations);
      } catch (e) {
        console.error("Error loading DAV data clusters:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [accessToken, selectedCluster]);

  console.log("*** data in MotivationBox clusters:::", data);
  return (
    <>
      {loading && <Loader isLoading={true} />}
      {error && <p>Ошибка: {error}</p>}
      {!loading && !error && (
        <>
          {" "}
          <div className={css.filterWrapperBox}>
            <ClusterFilter
              clusters={selectClusters}
              onClusterChange={handleSelectChange}
              selectedCluster={selectedCluster}
            />
          </div>
          {<AvDavMotivationTable motivationData={data} />}
        </>
      )}
    </>
  );
}

interface ClusterFilterProps {
  clusters: string[];
  selectedCluster: string | null;
  onClusterChange: (cluster: string) => void;
}

function ClusterFilter({
  clusters,
  selectedCluster,
  onClusterChange,
}: ClusterFilterProps) {
  return (
    <div className={css.FilterBox}>
      <p className={css.updtext}>update data- 28.09.2025</p>
      <label htmlFor="clusterSelect" className={css.selectLabel}>
        Filter by Cluster:
      </label>
      <select
        id="clusterSelect"
        value={selectedCluster || ""}
        onChange={(e) => onClusterChange(e.target.value)}
        className={css.selectBox}
      >
        {clusters.map((prd) => (
          <option key={prd} value={prd}>
            {prd}
          </option>
        ))}
      </select>
    </div>
  );
}
