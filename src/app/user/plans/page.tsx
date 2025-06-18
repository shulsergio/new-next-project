import { authConfig } from "@/app/configs/authConfig";
import { fetchUserPlans, Plan } from "@/utils/fetchData";
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

export default async function UserPlansPage() {
  const session = await getServerSession(authConfig);

  console.log("***Сессия на странице:", session);
  console.log("***Access Token на странице (проверка):", session?.accessToken);

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
    redirect("/signin");
  }

  return (
    <div>
      {plansData && plansData.length > 0 ? (
        <div className={css.container}>
          <div className={css.globalPlans}>
            <div className={css.plansBox}>
              <div>
                <h2>Total AR</h2>
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
          </div>
          <div className={css.globalPlans}>
            <div className={css.plansBox}>
              <div>
                <h2>Focus AR</h2>
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
          </div>
          <div className={css.globalPlans}>
            <div className={css.plansBox}>
              <h2>Top Bonus</h2>
              <p>
                Total:
                <span className={css.formatUah}>
                  {getFormatUahFromNumber(plansData[0].topBonus)}
                </span>
              </p>
            </div>
          </div>
          <div className={css.globalPlans}>
            <div className={css.plansBox}>
              <h2>Quarterly results </h2>
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
          </div>
        </div>
      ) : (
        <TextBox text="No plans available." />
      )}
      {!plansData && <p>Loading plans...</p>}
    </div>
  );
}
