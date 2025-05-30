import Link from "next/link";
import css from "./profile.module.css";
import { authConfig } from "../configs/authConfig";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authConfig);

  console.log("----- Profile session?.user:", session?.user);
  console.log("----- Profile session?.user.email:", session?.user.email);
  console.log("----- Profile session?.user?.mcsId:", session?.user?.mcsId);
  console.log("----- Profile USER:", session?.user);
  console.log("----- Profile session?.user:", session?.user?.userType);
  const userProfile = session?.user;
  return (
    <div className={css.container}>
      <div className={css.profile}>
        <h1>Promoter profile</h1>
        <ul>
          <li>
            Role: <span>{userProfile?.role}</span>
          </li>
          <li>
            User type: <span>{userProfile?.userType}</span>
          </li>
          <li>
            Info for uniform: <span>{userProfile?.uniform}</span>
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
