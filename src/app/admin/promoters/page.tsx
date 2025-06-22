import { authConfig } from "@/app/configs/authConfig";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PromotersTable from "@/components/PromotersTable/PromotersTable";
import { fetchAllPromoters, Promoter } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPromotersPage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    console.log("Сессия отсутствует");
    redirect("/signin");
  }
  let promsData: Promoter[] = [];
  try {
    const fetchedData = await fetchAllPromoters(session.accessToken);
    promsData = fetchedData;
    console.log("Promoters DATA:", promsData);
  } catch (e: string | unknown) {
    console.error("Error fetching user plans:", e);
    redirect("/signin");
  }
  return (
    <>
      <ComponentWrapper title="All promoters" />
      <PromotersTable promoters={promsData} />
    </>
  );
}
