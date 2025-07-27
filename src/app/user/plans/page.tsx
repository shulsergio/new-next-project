import { authConfig } from "@/app/configs/authConfig";
import { fetchShopIhsData, fetchUserPlans, Plan } from "@/utils/fetchData";
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

import PromotersIhsBox, { IhsDataItem } from "@/components/PromotersIhsBox/PromotersIhsBox";


export default async function UserPlansPage() {
  const session = await getServerSession(authConfig);

  console.log("***Сессия на странице:", session);
  console.log("***Access Token на странице (проверка):", session?.accessToken);
 console.log("***Access SHOP на странице (проверка):", session?.user.shop);

  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден для /plans, перенаправляем на /signin"
    );
    redirect("/signin");
  }
  let plansData: Plan[] = [];
  try {
    const fetchedData = await fetchUserPlans(session.accessToken);
    console.log("fetchedData PLANS DATA:", fetchedData);
    plansData = fetchedData.data.plans;
    console.log("plansData PLANS DATA:", plansData);
  } catch (e: string | unknown) {
    console.error("Error fetching user plans:", e);
plansData = [];
  }
let IhsShopsData: IhsDataItem[] = [];
  try {
    const fetchIhsData = await fetchShopIhsData(session.user.shop ||"", session.accessToken);
  IhsShopsData = fetchIhsData.data.data[0].ihsData;
    console.log("IhsShopsData IHSS DATA:", IhsShopsData);
  } catch (e: string | unknown) {
    console.error("Error fetching Ihs Shops Data:", e);
        IhsShopsData = [];
  }

  return (
    <div>
      {plansData && plansData.length > 0 ? (
        <>
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
                    (plansData[0].totalSOfact / plansData[0].totalSOplan) * 100
                  }
                />
              </div>
            </div>
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
                  Focus Plan:{" "}
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].focusSOplan)}
                  </span>
                </p>
                <p>
                  Focus Fact:{" "}
                  <span className={css.formatUah}>
                    {getFormatUahFromNumber(plansData[0].focusSOfact)}
                  </span>
                </p>
              </div>
              <div className={css.circularProgressBar}>
                <ClientCircularProgressBar
                  value={
                    (plansData[0].focusSOfact / plansData[0].focusSOplan) * 100
                  }
                />
              </div>
            </div>
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
              <ButtonBox option='link' href='/user/plans/top-bonus'>
            Top bonuses</ButtonBox>   
            </div>
          </ComponentWrapper>
                    <ComponentWrapper title="IHS results">
                      <div className={css.ihsBox}>
        <PromotersIhsBox IhsShopsData={IhsShopsData} sessionCategory={session.user.userType ?? ""}/>
                      </div>
                    </ComponentWrapper>
          <ComponentWrapper title="Quarterly results">
            <div className={css.plansBox}>
              <p>
                Focus AR:
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
