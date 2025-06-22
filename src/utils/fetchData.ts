
export interface Plan {
    _id: string;
    userId: string;
    totalSOplan: number;
    totalSOfact: number;
    focusSOplan: number;
  focusSOfact: number;
  totalQlySOplan: number;
  totalQlySOfact: number;
  focusQlySOplan: number;
  focusQlySOfact: number;
    topBonus: number;
    date: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Promoter {
    _id: string;
    email: string;
    name?: string;
    mcsId?: string;
    role?: string;
    userType?: string;
    gender?: string;
    uniform?: string;
    shop?: string;
   }
  


export async function fetchUserPlans(accessToken: string) {
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

export async function fetchAllPromoters(accessToken: string) {

  const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/promoters`;
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
      console.error("fetchAllPromoters error:", response.status);
      throw new Error(`Failed to fetch promoters: ${response.statusText}`);
    }
  }
  const data = await response.json();
  console.log('ALL PROMOTERS DATA:', data);
  return data;

  }