import { useSession } from 'next-auth/react'; 


    /**
     * Хук для проверки, имеет ли текущий пользователь требуемое разрешение.
     * @param permissionKey Ключ разрешения (напр., 'canAccessAdminPanel')
     * @returns boolean
     */
export const useAccess = () => {
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    
    const userPermissions = session?.user?.permissions || {};


    const hasPermission = (permissionKey: string): boolean => {
        if (isLoading || !session?.user) return false;

        return userPermissions[permissionKey] === true;
    };

    return { 
        hasPermission, 
        isLoading, 
        user: session?.user 
    };
};