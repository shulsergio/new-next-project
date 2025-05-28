import { authConfig } from "@/app/configs/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Plan {
  _id: string;
  userId: string;
  totalSOplan: number;
  totalSOfact: number;
  focusSOplan: number;
  focusSOfact: number;
  topBonus: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchUserPlans(accessToken: string) {
  const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`;
  const response = await fetch(BackApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Unauthorized access. Please log in again.");
    }
    throw new Error("Failed to fetch user plans");
  }
  const data = await response.json();
  return data;
}
export default async function UserPlansPage() {
  const session = await getServerSession(authConfig);

  console.log("***Сессия на странице:", session);
  console.log("***Access Token на странице (проверка):", session?.accessToken);

  if (!session || !session.accessToken) {
    console.log(
      "Сессия отсутствует или Access Token не найден для /plans, перенаправляем на /signin"
    );
    redirect("/signin"); // Если нет, перенаправляем на страницу входа
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
