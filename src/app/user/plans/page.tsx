import { authConfig } from "@/app/configs/authConfig";
import { fetchUserPlans, Plan } from "@/utils/fetchData";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
      <h1>Plans</h1>
      {plansData && plansData.length > 0 ? (
        <ul>
          {plansData.map((plan: Plan) => (
            <li key={plan._id}>
              <p>TTL SO Plan: {plan.totalSOplan}</p>
              <p>TTL SO Fact: {plan.totalSOfact}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>no</div>
      )}
      {!plansData && <p>Loading plans...</p>}
    </div>
  );
}
