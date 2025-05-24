import type { NextAuthOptions } from 'next-auth';
// import GooglePovider from 'next-auth/providers/google';

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                  return null; // Если нет логина или пароля, аутентификация не удалась
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });
                    // Проверяем, что ответ от бэкенда успешный (статус 200)
                    if (!response.ok) {
                        // Если бэкенд вернул ошибку, можно пробросить ее,
                        // NextAuth покажет сообщение об ошибке на странице входа
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Authentication failed');
                    }
                    const user = await response.json();
                    if (user && user.data && user.data.user) {
                        // Возвращаем объект пользователя. Этот объект будет доступен в сессии NextAuth.
                        // Важно: в этом объекте НЕ ДОЛЖНО быть конфиденциальных данных типа пароля.
                        // Можете добавить сюда accessToken, если он нужен на клиенте (осторожно с размером сессии).
                        return {
                            id: user.data.user._id, // Обязательное поле 'id'
                            email: user.data.user.email,
                            // role: user.data.user.role, // Если у вас есть роли
                            // accessToken: user.data.user.accessToken // Если нужно сохранить токен в сессии
                        };
                    } else {
                        return null; // Аутентификация не удалась, если пользователь не найден
                    }
                } catch (error: any) {
                        console.error("Backend authentication error:", error);
                        // Бросаем ошибку, чтобы NextAuth знал, что аутентификация не удалась
                        throw new Error(error.message || 'Something went wrong during authentication');
                      }
                    }
                  })
                ],
}
