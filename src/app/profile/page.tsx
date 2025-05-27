import Link from "next/link";
import css from "./profile.module.css";

export default function Profile() {
  return (
    <div className={css.profile}>
      <h1>Profile Page</h1>

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
  );
}
