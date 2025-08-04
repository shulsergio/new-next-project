import css from "./profile.module.css";
// import { authConfig } from "../configs/authConfig";
// import { getServerSession } from "next-auth";
import { ProfileUserBox } from "@/components/ProfileUserBox/ProfileUserBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import { ProfileUserShopBox } from "@/components/ProfileUserShopBox/ProfileUserShopBox";

/**
 * Profile page component
 * This all profiles except ADMIN
 * Profile- its first page after sign in
 *
 * @export
 * @return {*}
 */
export default async function Profile() {
  // const session = await getServerSession(authConfig);

  // const userProfile = session?.user;
  return (
    <div className={css.container}>
      <ProfileUserBox />
      <ProfileUserShopBox />
      <ComponentWrapper>
        <ButtonBox option="link" href="user/plans">
          Promoter Plans
        </ButtonBox>
        <ButtonBox option="link" href="user/focus-models">
          Focus Models
        </ButtonBox>
        <ButtonBox option="link" href="user/shopMatrix">
          Shop matrix
        </ButtonBox>
        <ButtonBox option="link" href="user/competitors">
          Competitors
        </ButtonBox>
      </ComponentWrapper>
    </div>
  );
}
