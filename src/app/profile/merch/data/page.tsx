"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import css from "./shopsPopPage.module.css";

interface PopInventoryItem {
  popId: string;
  popCode: string;
  name: string;
  dep: string;
  group: string;
  description: string;
  qtyStock: number;
}

export default function MerchInventoryPage() {
  const { data: session, status } = useSession();
  const [pops, setPops] = useState<PopInventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 1. Загрузка остатков мерча
  useEffect(() => {
    const loadInventory = async () => {
      if (!session?.accessToken) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/merch/inventory`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );

        if (!res.ok) throw new Error("Помилка завантаження залишків");

        const data = await res.json();
        setPops(data.data || []);
      } catch (err) {
        console.error(err);
        setMessage("Не вдалося завантажити дані інвентаризації");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      loadInventory();
    }
  }, [session, status]);

  // 2. Обработчик изменения остатка
  const handleQuantityChange = (popId: string, value: number) => {
    setPops((prev) =>
      prev.map((item) =>
        item.popId === popId ? { ...item, qtyStock: Math.max(0, value) } : item,
      ),
    );
  };

  // 3. Сохранение
  const handleSave = async () => {
    if (!session?.accessToken) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const payload = pops.map((p) => ({
        popId: p.popId,
        qtyStock: p.qtyStock,
      }));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/merch/inventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ items: payload }),
        },
      );

      if (!res.ok) throw new Error("Помилка при збереженні");

      setMessage("Залишки успішно оновлено!");
    } catch (err) {
      console.error(err);
      setMessage("Помилка при збереженні даних.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) return <Loader isLoading={true} />;

  return (
    <main className={css.container}>
      <h1 className={css.title}>Мій склад (Залишки POP)</h1>

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

            <div className={css.boxData}>
              <div className={css.leftBoxData}>
                <h3 className={css.popName}>{item.name}</h3>
                {item.description && (
                  <p className={css.popDesc}>{item.description}</p>
                )}
              </div>

              <div className={css.rightBoxData}>
                <div className={css.inputsGrid}>
                  <div className={css.inputGroup}>
                    <label>Залишок на руках:</label>
                    <input
                      type="number"
                      min="0"
                      value={item.qtyStock}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.popId,
                          parseInt(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ButtonBox option="button" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save"}
      </ButtonBox>
    </main>
  );
}
