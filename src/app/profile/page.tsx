import css from "./profile.module.css";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";
import { ProfileUserShopBox } from "@/components/ProfileUserShopBox/ProfileUserShopBox";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";
// import FirstModalData from "@/components/Modal/FirstModalData/page";
import Image from "next/image";

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
          </ComponentWrapper>
          <ComponentWrapper>
            <div className={css.logoContainer}>
              <div className={css.logoText}>
                <Image
                  src="/og-image.PNG"
                  alt="SCORY"
                  width={180}
                  height={45}
                  style={{
                    height: "auto",
                    margin: "0 auto",
                    objectFit: "contain",
                  }}
                />
                <div className={css.logoDescription}>
                  <p style={{ fontSize: "20px", padding: "10px" }}>
                    Любиш футбол?{" "}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Роби прогнози на ЧМ 2026 та змагайся з кращими!
                  </p>
                </div>
              </div>
              <ButtonBox
                option="link"
                href="https://scory.com.ua?ref=sams"
                target="_blank"
                rel="noopener"
              >
                Visit SCORY
              </ButtonBox>
            </div>
          </ComponentWrapper>
        </>
      )}
    </div>
  );
}
