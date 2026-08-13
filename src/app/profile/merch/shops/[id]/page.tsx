"use client";

import css from "./shopsPopPage.module.css";

import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import ButtonBox from "@/components/ButtonBox/ButtonBox";

interface PopItem {
  popId: string;
  popCode: string;
  name: string;
  dep: string;
  group: string;
  description: string;
  qtyPlaced: number;
  qtyTotal: number;
}

export default function ShopPopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // В Next.js 15+ params — это Promise, поэтому используем React.use()
  const { id: shopId } = use(params);

  const { data: session, status } = useSession();
  const [pops, setPops] = useState<PopItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 1. Загрузка POP-материалов для данного магазина
  useEffect(() => {
    const loadShopPops = async () => {
      if (!session?.accessToken || !shopId) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/${shopId}/pops`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );

        if (!res.ok) throw new Error("Ошибка загрузки POP-материалов");

        const data = await res.json();
        setPops(data.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Не удалось загрузить данные");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      loadShopPops();
    }
  }, [shopId, session, status]);

  // 2. Обработчик изменения цифр в инпутах
  const handleQuantityChange = (
    popId: string,
    field: "qtyPlaced" | "qtyTotal",
    value: number,
  ) => {
    setPops((prev) =>
      prev.map((item) =>
        item.popId === popId
          ? { ...item, [field]: Math.max(0, value) } // Не даем ввести число меньше 0
          : item,
      ),
    );
  };

  // 3. Сохранение всех изменений на бэкенд
  const handleSave = async () => {
    if (!session?.accessToken) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const payload = pops.map((p) => ({
        popId: p.popId,
        qtyPlaced: p.qtyPlaced,
        qtyTotal: p.qtyTotal,
      }));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/${shopId}/pops`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ statuses: payload }),
        },
      );

      if (!res.ok) throw new Error("Ошибка при сохранении");

      setMessage("Данные успешно сохранены!");
    } catch (err) {
      console.error(err);
      setMessage("Ошибка при сохранении данных.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) return <Loader isLoading={true} />;

  return (
    <main className={css.container}>
      <h1 className={css.title}>placement status</h1>

      {message && <div className={css.alert}>{message}</div>}

      <div className={css.popList}>
        {pops.map((item) => (
          <div key={item.popId} className={css.popCard}>
            <div className={css.popHeader}>
              <span className={css.codeBadge}>#{item.popCode}</span>
              <span className={css.groupBadge}>
                {item.group} ({item.dep})
              </span>
            </div>

            <h3 className={css.popName}>{item.name}</h3>
            {item.description && (
              <p className={css.popDesc}>{item.description}</p>
            )}

            <div className={css.inputsGrid}>
              <div className={css.inputGroup}>
                <label>Qty placed:</label>
                <input
                  type="number"
                  min="0"
                  value={item.qtyPlaced}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.popId,
                      "qtyPlaced",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>

              <div className={css.inputGroup}>
                <label>Qty total:</label>
                <input
                  type="number"
                  min="0"
                  value={item.qtyTotal}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.popId,
                      "qtyTotal",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ButtonBox
        option={"button"}
        onClick={handleSave}
        disabled={isSaving}
        // className={css.saveButton}
      >
        {isSaving ? "Saving..." : "Save"}
      </ButtonBox>
    </main>
  );
}
