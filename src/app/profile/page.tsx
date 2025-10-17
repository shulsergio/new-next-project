import css from "./profile.module.css";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import { ProfileUserShopBox } from "@/components/ProfileUserShopBox/ProfileUserShopBox";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";
// import FirstModalData from "@/components/Modal/FirstModalData/page";

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
  const userProfile = session?.user.mcsId ?? "";
  const allowedAvProfiles = [
    "av.prom",
    "av.dnipro",
    "av.kyiv",
    "av.lviv",
    "av.odesa",
  ];

  const isAvProfile = allowedAvProfiles.includes(userProfile);
  // console.log("User Profile DATA IN PROFILE PAGE:", userProfile);
  return (
    <div className={css.container}>
      {/* <FirstModalData /> */}

      {isAvProfile ? (
        <>
          <ComponentWrapper>
            <ButtonBox option="link" href="user/motivation">
              Motivation
            </ButtonBox>
            <ButtonBox option="link" href="user/focus-models">
              Focus Models
            </ButtonBox>
          </ComponentWrapper>
        </>
      ) : (
        <>
          <ProfileUserShopBox />
          <ComponentWrapper>
            <ButtonBox option="link" href="user/plans">
              Promoter Plans
            </ButtonBox>
            <ButtonBox option="link" href="user/motivation">
              Motivation
            </ButtonBox>
            <ButtonBox option="link" href="user/focus-models">
              Focus Models
            </ButtonBox>
            <ButtonBox option="link" href="user/shopMatrix">
              Shop matrix
            </ButtonBox>
            <ButtonBox option="link" href="user/lemon">
              <p className={css.lemon}>Lemon Here</p>
            </ButtonBox>
          </ComponentWrapper>
        </>
      )}
    </div>
  );
}
