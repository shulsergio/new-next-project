import { authConfig } from "@/app/configs/authConfig";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import FocusModelsManager from "@/components/FocusModelsManager/page";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UsersFocusModels() {
  const session = await getServerSession(authConfig);
  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден ShopMatrixPage, перенаправляем на /signin"
    );
    redirect("/signin");
  }

  // console.log("!!!!!!! UsersFocusModels!!! session:", session.user.userType);
  const limit = 20;
  // const type = session.user.userType || "";
  return (
    <ComponentWrapper>
      <FocusModelsManager
        limit={limit}
        // type={type}
        accessToken={session.accessToken}
      />
    </ComponentWrapper>
  );
}
