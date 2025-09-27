import { authConfig } from "@/app/configs/authConfig";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import TopBonusList from "@/components/Tables/TopBonusListTable/TopBonusListTable";
// import { fetchTopBonusesById } from "@/utils/fetchData";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserTopBonusPage() {
  const session = await getServerSession(authConfig);
  console.log("!!!Сессия на странице UserTopBonusPage:", session);
  console.log("!!!SHOP на странице UserTopBonusPage:", session?.user.shop);

  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден ShopMatrixPage, перенаправляем на /signin"
    );
    redirect("/signin");
  }

  // let shopBonuses = [];
  // try {
  //   const fetchedData = await fetchTopBonusesById(
  //     session.user.shop || "",
  //     session.accessToken
  //   );
  //   console.log("fetchShopMatixData DATA:", fetchedData);
  //   shopBonuses = fetchedData.data.bonuses.bonusData[0].categories;
  //   console.log("!!shopBonuses UserTopBonusPage:", shopBonuses);
  // } catch (e: string | unknown) {
  //   console.error("Error fetching UserTopBonusPage:", e);
  // }
  const type = session.user.userType || "";
  const accessToken = session.accessToken || "";
  const storeId = session.user.shop || "";
  return (
    <>
      <ComponentWrapper title="Top Bonus list">
        <TopBonusList
          // shopBonuses={shopBonuses}
          type={type}
          accessToken={accessToken}
          storeId={storeId}
          // session={session}
        />
      </ComponentWrapper>
      <ButtonBox option="link" href="/user/plans/">
        Back
      </ButtonBox>
    </>
  );
}
