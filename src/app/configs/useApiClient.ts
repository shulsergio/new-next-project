import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * Хук для выполнения API-запросов с автоматическим логаутом при 401 Unauthorized.
 *
 * @returns Функция apiClient, которая автоматически добавляет access token 
 * и обрабатывает ошибки 401.
 */
export const useApiClient = () => {
  const { data: session } = useSession();
    const router = useRouter(); 
      const token = session?.accessToken as string; 
 const apiClient = useCallback(
    async <T,>(url: string, options?: RequestInit): Promise<T> => {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      };

      try {
        const response = await fetch(url, {
          ...options,
          headers,
        });

        if (response.status === 401 || response.status === 403) {
          console.error("Authentication failed or token expired. Signing out...");
          await signOut({ redirect: false }); 
          router.push("/login");
          
throw new Error("Authentication failure or token expired.");
        }
        
        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorBody.message}`);
        }

        return response.json() as Promise<T>;

      } catch (error) {
        console.error("API client fetch error:", error);
        throw error; 
      }
    },
    [token, router] 
  );

  return useMemo(() => ({
    apiClient,
  }), [apiClient]);
}
