import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
// import { authConfig } from "../configs/authConfig";
// import { getServerSession } from "next-auth";

/**
 *
 * Admin page component
 * This ONLY for ADMIN role
 * If role Admin- this page, if not- Profile page
 * @export
 * @return {*}
 */
export default async function Admin() {
  // const session = await getServerSession(authConfig);

  // const userProfile = session?.user;
  return (
    <>
      <ComponentWrapper title="Admin panel" />
      <ComponentWrapper>
        <ButtonBox option="link" href="admin/promoters">
          promoters data
        </ButtonBox>
        <ButtonBox option="link" href="admin/promoters/plans">
          promoters plans
        </ButtonBox>
        <ButtonBox option="link" href="admin/shops">
          shops data
        </ButtonBox>
        <ButtonBox option="link" href="admin/competitors">
          competitors
        </ButtonBox>
      </ComponentWrapper>
    </>
  );
}
