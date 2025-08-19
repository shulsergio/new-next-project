import { authConfig } from "@/app/configs/authConfig";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import FocusModelsTable from "@/components/Tables/FocusModelsTable/page";
import { fetchFocusModels } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import css from "./page.module.css";

// interface FocusModel {
//   _id: string;
//   data: Array<{
//     sku: string;
//     prd: string;
//     rrp: string;
//     total: number;
//     focus: number;
//     topFocus: number;
//   }>;
//   type: string;
// }

export default async function UsersFocusModels() {
  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден ShopMatrixPage, перенаправляем на /signin"
    );
    redirect("/signin");
  }
  let focusModels = [];
  try {
    const fetchedData = await fetchFocusModels(
      session?.user.userType || "",
      session?.accessToken
    );
    console.log("fetchShopMatixData DATA:", fetchedData);
    focusModels = fetchedData.data.data[0].data;
    console.log("!!shopBonuses UserTopBonusPage:", focusModels);
  } catch (e: string | unknown) {
    console.error("Error fetching ShopMatrixPage:", e);
  }
  return (
    <ComponentWrapper>
      <FocusModelsTable focusModels={focusModels} />
    </ComponentWrapper>
  );
}
