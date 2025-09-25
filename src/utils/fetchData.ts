
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
  month: number;
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

  export async function fetchTopBonusesById(storeId: string, accessToken: string){

    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/topBonus/${storeId}`;


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


  export async function fetchShopsById(storeId: string, accessToken: string){

    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shops/${storeId}`;


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
      throw new Error("Failed to fetch shops data");
    }
    const data = await response.json();
    console.log('%%%% FILE fetchShopsById: ', data)
    return data;
}
  
  export async function fetchFocusModels(curPage: number, limit: number, type: string, accessToken: string, selectedPrd: string, isFocusOnly: boolean,isBonusOnly: boolean): Promise<ApiResponse> {
    // type = "AV";
    console.log("WWWWW fetchFocusModels selectedPrd===", selectedPrd)
    
    const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/focusModels/${type}?page=${curPage}&limit=${limit}&selectedPrd=${selectedPrd}&isFocusOnly=${isFocusOnly}&isBonusOnly=${isBonusOnly}`;

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
  
export const fetchAllPrds = async (
  curPage: number,
  limit: number,
  type: string,
  accessToken: string
): Promise<string[]> => {

  // const type = Addtype === "AV" ? "AV" : "DA";
  // console.log('EEEE fetchAllPrds Addtype===', Addtype);
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
      console.log('EEEE fetchAllPrds uniquePrds===', uniquePrds);
    return ['all',...uniquePrds];
}

export async function fetchDavDataClusters(selectedCluster: string, accessToken: string) {
  const BackApi = `${process.env.NEXT_PUBLIC_BACKEND_URL}/motivation/davMotivation?cluster=${selectedCluster}`;
  console.log("%%%% FILE fetchDavDataClusters BackApi: ", BackApi)
 
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
    console.log('%%%% FILE fetchDavDataClusters: ', data)
    return data;
}