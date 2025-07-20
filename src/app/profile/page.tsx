import css from "./profile.module.css";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";
import { ProfileBox } from "@/components/ProfileBox/ProfileBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";

/**
 * Profile page component
 * This all profiles except ADMIN
 * Profile- its first page after sign in
 *
 * @export
 * @return {*}
 */
export default async function Profile() {
  const session = await getServerSession(authConfig);

  const userProfile = session?.user;
  return (
    <div className={css.container}>
      <ProfileBox userProfile={userProfile} />
      <ComponentWrapper>
        <ButtonBox option="link" href="user/plans">
          Promoter Plans
        </ButtonBox>
        <ButtonBox option="link" href="user/competitors">
          Competitors
        </ButtonBox>
        <ButtonBox option="link" href="user/checkins">
          Checkins
        </ButtonBox>
        <ButtonBox option="link" href="/">
          edit...
        </ButtonBox>
      </ComponentWrapper>
    </div>
  );
}
