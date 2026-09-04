import { authConfig } from "@/app/configs/authConfig";
import {
  fetchShopIhsData,
  // fetchShopIhsData,
  fetchUserPlans,
  Plan,
} from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import ClientCircularProgressBar from "@/components/CircularProgressbar/CircularProgressbar";
import TextBox from "@/components/TextBox/TextBox";
import {
  getFocusPercent,
  getFormatUahFromNumber,
  needToARValue,
} from "@/utils/calculations";
import ComponentWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import ButtonBox from "@/components/ButtonBox/ButtonBox";

import PromotersIhsBox, {
  IhsDataItem,
} from "@/components/PromotersIhsBox/PromotersIhsBox";
// import AccordionWrapper from "@/components/AccordionWrapper/AccordionWrapper";
// import NewRecharts from "@/components/NewRecharts/newRecharts";

export default async function UserPlansPage() {
  const session = await getServerSession(authConfig);

  console.log("***Сессия на странице UserPlansPage:", session);
  console.log(
    "***Access Token на странице UserPlansPage:",
    session?.accessToken,
  );
  console.log("***Access SHOP на странице UserPlansPage:", session?.user.shop);

  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден для /plans, перенаправляем на /signin",
    );
    redirect("/signin?error=unauthorized");
  }
  let plansData: Plan[] = [];
  let IhsShopsData: IhsDataItem[] = [];

  try {
    const [plansResult, ihsResult] = await Promise.allSettled([
      fetchUserPlans(session.accessToken),
      fetchShopIhsData(session.user.shop || "", session.accessToken),
    ]);

    if (plansResult.status === "fulfilled") {
      console.log("fetchedData PLANS DATA:", plansResult.value);
      plansData = plansResult.value?.data?.plans || [];
      console.log("plansData PLANS DATA:", plansData);
    } else {
      console.error("Error fetching user plans:", plansResult.reason);
    }

    if (ihsResult.status === "fulfilled") {
      IhsShopsData = Array.isArray(ihsResult.value) ? ihsResult.value : [];
    } else {
      console.error("Error fetching Ihs Shops Data:", ihsResult.reason);
    }
  } catch (e) {
    console.error("Unexpected error in parallel fetching:", e);
  }

  console.log("!!!!! IhsShopsData:", IhsShopsData);

  return (
    <div>
      {plansData && plansData.length > 0 ? (
        <>
          <ComponentWrapper title="Notes">
            <p>{plansData[0].notes}</p>
          </ComponentWrapper>
          <ComponentWrapper title="Total AR">
            <div className={css.plansBox}>
              <div>
                <p>
                  Total Plan:{" "}
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].totalSOplan)}
                  </span>
                </p>
                <p>
                  Total Fact:{" "}
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].totalSOfact)}
                  </span>
                </p>
              </div>
              <div className={css.circularProgressBar}>
                <ClientCircularProgressBar
                  value={
                    plansData[0].totalSOplan > 0
                      ? (plansData[0].totalSOfact / plansData[0].totalSOplan) *
                        100
                      : 0
                  }
                />
              </div>
            </div>
            {/*    <AccordionWrapper title="Weekly AR"> 
              <NewRecharts plans={weeklyPromsPlansData} />
            </AccordionWrapper>*/}

            <div className={css.newDataBox}>
              <p>
                Need to 80%
                <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact: plansData[0].totalSOfact,
                    plan: plansData[0].totalSOplan,
                    toAchive: 0.8,
                  })}
                </span>
              </p>
              <p>
                Need to 120%
                <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact: plansData[0].totalSOfact,
                    plan: plansData[0].totalSOplan,
                    toAchive: 1.2,
                  })}
                </span>
              </p>
            </div>
          </ComponentWrapper>
          <ComponentWrapper title="Focus AR">
            <div className={css.plansBox}>
              <div>
                <p>
                  Focus Plan:
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].focusSOplan)}
                  </span>
                </p>
                <p>
                  Focus Fact:
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].focusSOfact)}
                  </span>
                </p>
              </div>
              <div className={css.circularProgressBar}>
                <ClientCircularProgressBar
                  value={
                    plansData[0].focusSOplan > 0
                      ? (plansData[0].focusSOfact / plansData[0].focusSOplan) *
                        100
                      : 0
                  }
                />
              </div>
            </div>
            {/*     <AccordionWrapper title="Weekly AR">      
              <NewRecharts plans={weeklyPromsPlansData} />
            </AccordionWrapper>*/}
            <div className={css.newDataBox}>
              <p>
                Need to 80%
                <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact: plansData[0].focusSOfact,
                    plan: plansData[0].focusSOplan,
                    toAchive: 0.8,
                  })}
                </span>
              </p>
              <p>
                Need to 120% <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact: plansData[0].focusSOfact,
                    plan: plansData[0].focusSOplan,
                    toAchive: 1.2,
                  })}
                </span>
              </p>
            </div>
          </ComponentWrapper>
          <ComponentWrapper title="Top Bonus">
            <div className={css.plansBox}>
              <p>
                Total:
                <span className={css.formatUah}>
                  {getFormatUahFromNumber(plansData[0].topBonus)}
                </span>
              </p>
              {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
              <ButtonBox option="link" href="/user/plans/top-bonus">
                Top bonuses
              </ButtonBox>
            </div>
          </ComponentWrapper>
          <ComponentWrapper title="IHS results">
            <div className={css.ihsBox}>
              <PromotersIhsBox
                IhsShopsData={IhsShopsData}
                sessionCategory={session.user.userType ?? ""}
              />
            </div>
          </ComponentWrapper>
          <ComponentWrapper title="Quarterly results">
            <div className={css.plansBox}>
              <p>
                Focus AR:{" "}
                <span>
                  {getFocusPercent({
                    planQly: plansData[0].focusQlySOplan,
                    factQly: plansData[0].focusQlySOfact,
                    planCurrent: plansData[0].focusSOplan,
                    factCurrent: plansData[0].focusSOfact,
                  }).toFixed(1)}
                  %
                </span>
              </p>
            </div>
            <div className={css.newDataBox}>
              <p>
                Need to 90%
                <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact:
                      plansData[0].focusQlySOfact + plansData[0].focusSOfact,
                    plan:
                      plansData[0].focusQlySOplan + plansData[0].focusSOplan,
                    toAchive: 0.9,
                  })}
                </span>
              </p>
              <p>
                Need to 120% <br />
                <span className={css.formatUah}>
                  {needToARValue({
                    fact:
                      plansData[0].focusQlySOfact + plansData[0].focusSOfact,
                    plan:
                      plansData[0].focusQlySOplan + plansData[0].focusSOplan,
                    toAchive: 1.2,
                  })}
                </span>
              </p>
            </div>
          </ComponentWrapper>
        </>
      ) : (
        <TextBox option="text">{"No plans available."}</TextBox>
      )}
      {/* {!plansData && <p>Loading plans...</p>} */}
    </div>
  );
}
