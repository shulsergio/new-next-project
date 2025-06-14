import { authConfig } from "@/app/configs/authConfig";
import { fetchUserPlans, Plan } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import css from "./page.module.css";
import ClientCircularProgressBar from "@/components/CircularProgressbar/CircularProgressbar";

interface needToARValueProps {
  fact: number;
  plan: number;
  toAchive: number;
}

function needToARValue({ fact, plan, toAchive }: needToARValueProps) {
  const total = plan * toAchive - fact > 0 ? plan * toAchive - fact : -1;
  return total;
}
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
          <div className={css.plansBox}>
            <div>
              <h2>Total AR</h2>
              <p>
                Total Plan: <span>{plansData[0].totalSOplan}</span>
              </p>
              <p>
                Total Fact: <span>{plansData[0].totalSOfact}</span>
              </p>
              <p>
                Need to 80%:
                <span>
                  {needToARValue({
                    fact: plansData[0].totalSOfact,
                    plan: plansData[0].totalSOplan,
                    toAchive: 0.8,
                  }) > 0
                    ? needToARValue({
                        fact: plansData[0].totalSOfact,
                        plan: plansData[0].totalSOplan,
                        toAchive: 0.8,
                      })
                    : "Done"}
                </span>
              </p>
              <p>
                Need to 120%:
                <span>
                  {needToARValue({
                    fact: plansData[0].totalSOfact,
                    plan: plansData[0].totalSOplan,
                    toAchive: 1.2,
                  }) > 0
                    ? needToARValue({
                        fact: plansData[0].totalSOfact,
                        plan: plansData[0].totalSOplan,
                        toAchive: 1.2,
                      })
                    : "Done"}
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
          <div className={css.plansBox}>
            <div>
              <h2>Focus AR</h2>
              <p>
                Focus Plan: <span>{plansData[0].focusSOplan}</span>
              </p>
              <p>
                Focus Fact: <span>{plansData[0].focusSOfact}</span>
              </p>
              <p>
                Need to 80%:
                <span>
                  {needToARValue({
                    fact: plansData[0].focusSOfact,
                    plan: plansData[0].focusSOplan,
                    toAchive: 0.8,
                  }) > 0
                    ? needToARValue({
                        fact: plansData[0].focusSOfact,
                        plan: plansData[0].focusSOplan,
                        toAchive: 0.8,
                      })
                    : "Done"}
                </span>
              </p>
              <p>
                Need to 120%:
                <span>
                  {needToARValue({
                    fact: plansData[0].focusSOfact,
                    plan: plansData[0].focusSOplan,
                    toAchive: 1.2,
                  }) > 0
                    ? needToARValue({
                        fact: plansData[0].focusSOfact,
                        plan: plansData[0].focusSOplan,
                        toAchive: 1.2,
                      })
                    : "Done"}
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
          <div className={css.plansBox}>
            <div>
              <h2>Top bonus</h2>
              <p>
                Top Bonuses: <span>{plansData[0].topBonus}</span>
              </p>
            </div>
          </div>
          <div className={css.plansBox}>
            <div>
              <h2>Q-ly bonus</h2>
              <p>
                A/R plan (%): <span>{plansData[0].topBonus}</span>
              </p>
              <p>
                Need to bonus (uah): <span>{plansData[0].topBonus}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No plans available.</p>
      )}
      {!plansData && <p>Loading plans...</p>}
    </div>
  );
}
