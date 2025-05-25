import type { DefaultSession, NextAuthOptions } from 'next-auth';
// import GooglePovider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthConfig } from 'next-auth/config';

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
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
                } catch (error: unknown) { 
                    // Проверяем, является ли ошибка экземпляром Error, чтобы безопасно получить message
                    if (error instanceof Error) {
                        console.error("Backend authentication error:", error);
                        // Бросаем ошибку, чтобы NextAuth знал, что аутентификация не удалась.
                        // Это сообщение будет отображено на странице входа, если вы настроите.
                        throw new Error(error.message || 'Something went wrong during authentication');
                    } else {
                        // Если ошибка не является экземпляром Error (например, строка или число)
                        console.error("An unexpected error occurred:", error);
                        throw new Error('An unexpected error occurred during authentication');
                    }
                }
            }
        })
    ],
    // --- ОБЯЗАТЕЛЬНЫЕ И РЕКОМЕНДУЕМЫЕ НАСТРОЙКИ ---

    // 1. Страницы NextAuth
    // Определяет пути к вашим кастомным страницам NextAuth.
    // Если не указаны, NextAuth будет использовать свои страницы по умолчанию.
    pages: {
        signIn: '/signin', // Путь к вашей кастомной странице входа
        // error: '/auth/error', // Опционально: путь к странице ошибки
        // signOut: '/auth/signout', // Опционально: путь к странице выхода
    },

    // 2. Callbacks (обратные вызовы)
    // Позволяют контролировать, что происходит при создании JWT-токена и сессии.
    callbacks: {
        // Вызывается при каждом успешном входе или обновлении сессии.
        // Здесь мы добавляем данные пользователя (id, email) в JWT-токен NextAuth.
        async jwt({ token, user }) {
            if (user) {
                // 'user' здесь - это объект, который мы вернули из функции authorize.
                // Добавляем его свойства в 'token'.
                token.id = user.id;
                token.email = user.email;
                // Если вы сохранили accessToken/refreshToken в объекте user выше,
                // вы можете добавить их в токен здесь:
                // token.accessToken = (user as any).accessToken;
                // token.refreshToken = (user as any).refreshToken;
            }
            return token;
        },
        // Вызывается при доступе к сессии на клиенте (через useSession)
        // Здесь мы добавляем данные из JWT-токена в объект сессии,
        // который будет доступен на клиентской стороне.
        async session({ session, token }) {
            // 'token' здесь - это JWT-токен, который был сформирован в callback 'jwt'.
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                // Если вы добавили accessToken/refreshToken в токен,
                // вы можете добавить их в сессию здесь:
                // (session as any).accessToken = token.accessToken;
                // (session as any).refreshToken = token.refreshToken;
            }
            return session;
        }
    },

    // 3. Настройки сессии
    // Определяет, как NextAuth управляет сессиями.
    session: {
        strategy: "jwt", // Рекомендуется использовать JWT-стратегию для stateless-сессий.
                         // Это означает, что данные сессии хранятся в зашифрованном JWT-токене в куки.
        maxAge: 30 * 24 * 60 * 60, // Время жизни сессии в секундах (например, 30 дней)
    },

    // 4. Секретный ключ NextAuth
    // ОБЯЗАТЕЛЬНО! Используется для шифрования и подписи JWT-токенов и куки.
    // Должен быть длинной, случайной строкой и храниться в переменной окружения.
    secret: process.env.NEXTAUTH_SECRET,
};

// Расширение типа Session для включения 'id' и 'email'
// Это необходимо, чтобы TypeScript знал о ваших кастомных полях в session.user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      // Добавьте другие поля, если вы их передаете, например:
      // role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email: string;
    // Добавьте другие поля, если вы их передаете, например:
    // role?: string;
  }
}
