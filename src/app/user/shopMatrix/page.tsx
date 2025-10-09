import { authConfig } from "@/app/configs/authConfig";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PromotersMatrixBox from "@/components/PromotersMatrixBox/PromotersMatrixBox";
import { fetchShopMatixData } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ShopMatrixPage() {
  const session = await getServerSession(authConfig);
  // console.log("***Сессия на странице ShopMatrixPage:", session);
  // console.log("***SHOP на странице ShopMatrixPage:", session?.user.shop);

  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден ShopMatrixPage, перенаправляем на /signin"
    );
    redirect("/signin");
  }
  let matrixData = [];
  try {
    const fetchedData = await fetchShopMatixData(
      session.user.shop || "",
      session.accessToken
    );
    // console.log("fetchShopMatixData DATA:", fetchedData);
    matrixData = fetchedData.data.data[0].matrixData[0].categories;
    // console.log("matrixData DATA:", matrixData);
  } catch (e: string | unknown) {
    console.error("Error fetching ShopMatrixPage:", e);
    // plansData = [];
  }

  return (
    <>
      <ComponentWrapper title="Shop matrix">
        <PromotersMatrixBox
          matrixData={matrixData ?? ""}
          sessionCategory={session.user.userType === "AV" ? "AV" : "DA"}
        />
      </ComponentWrapper>
      <ButtonBox option="link" href="/">
        Back
      </ButtonBox>
    </>
  );
}
