// import Link from "next/link";
import css from "./admin.module.css";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
// import { authConfig } from "../configs/authConfig";
// import { getServerSession } from "next-auth";

export default async function Admin() {
  // const session = await getServerSession(authConfig);

  // const userProfile = session?.user;
  return (
    <div className={css.container}>
      <ComponentWrapper title="Admin panel" />
    </div>
  );
}
