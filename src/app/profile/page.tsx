import Link from "next/link";
import css from "./profile.module.css";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";
import { ProfileBox } from "@/components/ProfileBox/ProfileBox";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  const userProfile = session?.user;
  return (
    <div className={css.container}>
      <ProfileBox userProfile={userProfile} />
      <ComponentWrapper title="">
        <Link className={css.boxes} href="user/plans">
          Promoter Plans
        </Link>
        <Link className={css.boxes} href="user/competitors">
          Competitors
        </Link>
        <Link className={css.boxes} href="/">
          edit...
        </Link>
        <Link className={css.boxes} href="/">
          edit...
        </Link>
      </ComponentWrapper>
    </div>
  );
}
