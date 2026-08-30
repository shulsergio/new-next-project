"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchMerchShops, Shop } from "@/utils/fetchData";
import css from "./shops.module.css";
import Loader from "@/components/Loader/Loader";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";

const CHAINS = ["ALL", "Comfy", "Epicentr", "Foxtrot"];

export default function MerchShopsPage() {
  const { data: session, status } = useSession();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedChain, setSelectedChain] = useState<string>("ALL");
  const [searchStoreId, setSearchStoreId] = useState<string>("");

  useEffect(() => {
    const loadShops = async () => {
      if (!session?.accessToken) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMerchShops(session.accessToken);
        setShops(data);
      } catch (err) {
        console.error("Error loading shops:", err);
        setError("Не удалось загрузить список магазинов");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      loadShops();
    }
  }, [session, status]);

  const filteredShops = shops.filter((shop) => {
    const matchesChain =
      selectedChain === "ALL" || shop.chain === selectedChain;

    const matchesStoreId = shop.storeId
      ?.toLowerCase()
      .includes(searchStoreId.trim().toLowerCase());

    return matchesChain && matchesStoreId;
  });

  if (status === "loading" || isLoading) return <Loader isLoading={true} />;

  return (
    <main className={css.container}>
      {/* ---------- Панель фильтров ---------- */}
      <ComponentWrapper>
        <Link href={`/profile/merch/data`} className={css.shopCard}>
          Інвентаризація
        </Link>
      </ComponentWrapper>
      {/* ---------- Панель фильтров ---------- */}
      <ComponentWrapper>
        <div className={css.filterItem}>
          <label htmlFor="chainSelect" className={css.label}>
            Мережа:
          </label>
          <select
            id="chainSelect"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className={css.select}
          >
            <option value="ALL">Всі мережі</option>
            {CHAINS.filter((c) => c !== "ALL").map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>

        <div className={css.filterItem}>
          <label htmlFor="storeIdInput" className={css.label}>
            Пошук за Store ID:
          </label>
          <input
            id="storeIdInput"
            type="text"
            placeholder="Наприклад: C070133812..."
            value={searchStoreId}
            onChange={(e) => setSearchStoreId(e.target.value)}
            className={css.input}
          />
        </div>
      </ComponentWrapper>
      {error && <p className={css.error}>{error}</p>}

      {!error && filteredShops.length === 0 && (
        <p className={css.emptyText}>Немає жодного магазина за вашим запитом</p>
      )}

      <div className={css.shopsBox}>
        {filteredShops.map((shop) => (
          <ComponentAdminWrapper key={shop._id}>
            <Link
              href={`/profile/merch/shops/${shop._id}`}
              className={css.shopCard}
            >
              <div className={css.chainData}>
                <div className={css.badge}>{shop.chain}</div>
                <div className={css.badge}>{shop.city}</div>
                <div className={css.badgeStoreId}>{shop.storeId}</div>
              </div>
              <h2 className={css.shopName}>{shop.name}</h2>
            </Link>
          </ComponentAdminWrapper>
        ))}
      </div>
    </main>
  );
}
