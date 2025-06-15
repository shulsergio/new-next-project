import Link from "next/link";
import css from "./profile.module.css";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  const userProfile = session?.user;
  return (
    <div className={css.container}>
      <div className={css.profile}>
        <h1>{userProfile?.role || ""} profile</h1>
        <ul className={css.profileList}>
          <li>
            Role: <span>{userProfile?.role || "-"}</span>
          </li>
          <li>
            User type: <span>{userProfile?.userType || "-"}</span>
          </li>
          <li>
            Uniform: <span>{userProfile?.uniform || "-"}</span>
          </li>
          <li>
            Shop: <span>{userProfile?.mcsShop || "-"}</span>
          </li>
        </ul>
      </div>
      <div className={css.buttonBox}>
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
      </div>
    </div>
  );
}
