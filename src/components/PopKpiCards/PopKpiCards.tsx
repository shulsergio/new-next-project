"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import css from "./PopKpiCards.module.css";

interface KpiData {
  completionRate: number;
  totalPlaced: number;
  totalRequired: number;
  activeShopsCount: number;
  totalShopsCount: number;
  coverageRate: number;
  outOfStockCount: number;
}

export default function PopKpiCards() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<KpiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!session?.accessToken) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/merch/analytics/pop-metrics`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );

        if (!res.ok) throw new Error("Ошибка загрузки метрик");

        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("KPI Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchMetrics();
    }
  }, [session, status]);

  if (isLoading) {
    return <div className={css.skeletonGrid}>Загрузка показателей...</div>;
  }

  if (!data) return null;

  return (
    <div className={css.kpiGrid}>
      {/* 1. Реализация плана */}
      <div className={`${css.card} ${css.blueCard}`}>
        <div className={css.cardHeader}>
          <span className={css.title}>Реалізація плану</span>
          <span className={css.icon}> </span>
        </div>
        <div className={css.mainValue}>{data.completionRate}%</div>
        <div className={css.subText}>
          Розміщено <strong>{data.totalPlaced}</strong> з{" "}
          <strong>{data.totalRequired}</strong> шт.
        </div>
        <div className={css.progressBarBg}>
          <div
            className={css.progressBarFill}
            style={{ width: `${Math.min(data.completionRate, 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Покрытие магазинов */}
      <div className={`${css.card} ${css.greenCard}`}>
        <div className={css.cardHeader}>
          <span className={css.title}>Покриття магазинів</span>
          <span className={css.icon}> </span>
        </div>
        <div className={css.mainValue}>{data.coverageRate}%</div>
        <div className={css.subText}>
          Аудит пройдено в <strong>{data.activeShopsCount}</strong> з{" "}
          <strong>{data.totalShopsCount}</strong> точок
        </div>
        <div className={css.progressBarBg}>
          <div
            className={`${css.progressBarFill} ${css.greenFill}`}
            style={{ width: `${Math.min(data.coverageRate, 100)}%` }}
          />
        </div>
      </div>

      {/* 3. Дефицит материалов */}
      <div className={`${css.card} ${css.redCard}`}>
        <div className={css.cardHeader}>
          <span className={css.title}>Дефіцит матеріалів</span>
          <span className={css.icon}></span>
        </div>
        <div className={css.mainValue}>{data.outOfStockCount}</div>
        <div className={css.subText}>
          Позицій, де розміщено менше ніж за планом
        </div>
        <div className={css.badgeWarning}>Потребують уваги</div>
      </div>
    </div>
  );
}
