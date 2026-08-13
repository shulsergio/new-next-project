"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchMerchShops, Shop } from "@/utils/fetchData";
import css from "./shops.module.css";
import Loader from "@/components/Loader/Loader";
import ComponentAdminWrapper from "@/components/ComponentAdminWrapper/ComponentAdminWrapper";

export default function MerchShopsPage() {
  const { data: session, status } = useSession();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (status === "loading" || isLoading) return <Loader isLoading={true} />;

  return (
    <main className={css.container}>
      {/* <h1 className={css.title}>Мои магазины</h1> */}

      {error && <p className={css.error}>{error}</p>}

      {!error && shops.length === 0 && (
        <p className={css.emptyText}>Немає жодного магазина</p>
      )}

      <div className={css.shopsBox}>
        {shops.map((shop) => (
          <ComponentAdminWrapper key={shop._id}>
            <Link
              href={`/profile/merch/shops/${shop._id}`}
              className={css.shopCard}
            >
              <div className={css.chainData}>
                <div className={css.badge}>{shop.chain}</div>
                <div className={css.badge}>{shop.city}</div>
              </div>
              <h2 className={css.shopName}>{shop.name}</h2>
            </Link>
          </ComponentAdminWrapper>
        ))}
      </div>
    </main>
  );
}
