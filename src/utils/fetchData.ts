
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
    region?: string;
    lastVisit?: string;
   }
  
   
export interface IhsData {
 _id: string;
  storeId: string;
   ihsData: Array<{ 
    year: number; 
    week: number; 
    categories: Array<{
      category: string; 
      share: number;   
    }>;
  }>;
}
  

interface ProductData {
  _id: string;
  year: number;
  month: string;
  sku: string;
  prd: string;  
  rrp: string;
  focus: number;
  type: string;
  topFocus: number;
}
interface ApiResponse {
  data: {
    data: ProductData[];
    totalCount: number;
  };
}
interface weekdata { 
    _id: string;
      item: string;
      account: string;
      bonus: number;
      day: string;
      prd: string;
      soqty: number;
      storeId: string;
      week: string;
}
interface ApiResponseWeek {
  data: {
    bonuses: weekdata[];
  }
}

type SafeApiClient<T = unknown> = (url: string, options?: RequestInit) => Promise<T>;




export async function fetchShopIhsData(storeId: string, accessToken: string) {
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/ihsdatas/?storeId=${storeId}`;


    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetch IHS data");
    }
    const data = await response.json();
    return data;
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

  export async function fetchAllPlans(accessToken: string) {

  const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/plans`;
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

export async function fetchShopMatixData(storeId: string, accessToken: string) {
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/matrixDatas/?storeId=${storeId}`;


    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetch IHS data");
    }
    const data = await response.json();
    console.log('%%%% FILE fetchShopMatixData: ', data)
    return data;
  }
interface shopsData {
  chain: string;
  address: string;
}
  interface ShopResponse {
  data: {
    shops: shopsData;
  }
}

  export async function fetchShopsById(apiClient: SafeApiClient<ShopResponse>, storeId: string): Promise<ShopResponse>{

    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/${storeId}`;

  const data = await apiClient(BackApi, {
    method: "GET",
    cache: "no-store",
  });

  console.log('%%%% FILE fetchShopsById (Cleaned Data): ', data);

  return data;
}
  
  export async function fetchFocusModels(curPage: number, limit: number, type: string, accessToken: string, selectedPrd: string, selectedMonth: string, isFocusOnly: boolean,isBonusOnly: boolean): Promise<ApiResponse> {
    // type = "AV";
    console.log("WWWWW fetchFocusModels selectedPrd===", selectedPrd)
        console.log("WWWWW fetchFocusModels selectedMonth===", selectedMonth)
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/focusModels/${type}?page=${curPage}&limit=${limit}&selectedPrd=${selectedPrd}&selectedMonth=${selectedMonth}&isFocusOnly=${isFocusOnly}&isBonusOnly=${isBonusOnly}`;

    console.log("WWWWW fetchFocusModels BackApi===", BackApi)
    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetch IHS data");
    }
    const data = await response.json();
    console.log('%%%% FILE fetchShopMatixData: ', data)
    return data;
}
  interface FocusFilterModelData {
  productIds: string[];
  months: string[];
}
export const fetchAllPrds = async (
  curPage: number,
  limit: number,
  type: string,
  accessToken: string
): Promise<FocusFilterModelData> => {

    console.log('EEEE fetchAllPrds type===', type);
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/focusModels/${type}?page=${curPage}&limit=${limit}`;

    console.log("EEEE fetchAllPrds BackApi===", BackApi)
    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetchAllPrds data");
    }
  const responseData = await response.json() as ApiResponse;
        console.log('EEEE fetchAllPrds responseData===', responseData);
  const uniquePrds = Array.from(
    new Set(responseData.data.data.map((item: ProductData) => item.prd))
  );
    const uniqueMonths = Array.from(
    new Set(responseData.data.data.map((item: ProductData) => item.month))
  );
      console.log('EEEE fetchAllPrds uniqueMonth===', uniqueMonths);
    return {
    productIds: ['all', ...uniquePrds],
    months: uniqueMonths,
  };
}

export const fetchAllWeeks = async (
  type: string,
  accessToken: string,
  storeId: string,
    week: string = "all"
): Promise<string[]> => {

  console.log('XXXXX fetchAllWeeks type===', type);
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/topBonus/${storeId}?type=${type}&week=${week}`;

    console.log("XXXXX fetchAllWeeks BackApi===", BackApi)
    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetchAllWeeks data");
  }
 // const data = ['all']; подставной для ретурна
  const responseData = await response.json() as ApiResponseWeek;
        console.log('XXXXX fetchAllWeeks responseData.data.BonusData===', responseData.data.bonuses);
  const uniqueWeeks = Array.from<string>(
    new Set(responseData.data.bonuses.map((item) => item.week))
  );
      console.log('XXXXX fetchAllWeeks uniqueWeeks===', uniqueWeeks);
  return ['all', ...uniqueWeeks];
}

export async function fetchBonusModels(type: string, accessToken: string, storeId: string, week: string) {

  console.log('XXXXX fetchBonusModels type===', type);
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/topBonus/${storeId}?type=${type}&week=${week}`;
    console.log("WWWWW fetchBonusModels BackApi===", BackApi)
    const response = await fetch(BackApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
    console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

      if (response.status === 401 || response.status === 403) {
        throw new Error("Unauthorized access. Please log in again.");
      }
      throw new Error("Failed to fetch IHS data");
    }
    const data = await response.json();
    console.log('WWWWW DATAAAA fetchBonusModels: ', data)
    return data;
}






// export async function fetchDavDataClusters(selectedCluster: string, accessToken: string) {
//   const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/motivation/davMotivation?cluster=${selectedCluster}`;
//   console.log("%%%% FILE fetchDavDataClusters BackApi: ", BackApi)

//     const response = await fetch(BackApi, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       cache: "no-store",
//     });
//     if (!response.ok) {
//     console.error(`HTTP Error Status: ${response.status} - ${response.statusText}`);

//       if (response.status === 401 || response.status === 403) {
//         throw new Error("Unauthorized access. Please log in again.");
//       }
//       throw new Error("Failed to fetch IHS data");
//     }
//     const data = await response.json();
//     console.log('%%%% FILE fetchDavDataClusters: ', data)
//     return data;
// }