// import Link from "next/link";
import Link from "next/link";
import css from "./admin.module.css";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
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
    <div className={css.container}>
      <ComponentWrapper title="Admin panel" />
      <ComponentWrapper>
        <Link className={css.boxes} href="user/plans">
          Promoter Plans
        </Link>
        <Link className={css.boxes} href="user/competitors">
          Competitors
        </Link>
      </ComponentWrapper>
    </div>
  );
}
