import { authConfig } from "@/app/configs/authConfig";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import FocusModelsManager from "@/components/FocusModelsManager/page";
// import FocusModelsTable from "@/components/Tables/FocusModelsTable/page";
// import { fetchFocusModels } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import css from "./page.module.css";

export default async function UsersFocusModels() {
  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден ShopMatrixPage, перенаправляем на /signin"
    );
    redirect("/signin");
  }
  const limit = 20;
  const type = "AV";
  return (
    <ComponentWrapper>
      <FocusModelsManager
        limit={limit}
        type={type}
        accessToken={session.accessToken}
      />
    </ComponentWrapper>
  );
}
