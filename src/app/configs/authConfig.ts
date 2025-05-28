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
                    return null;
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
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Authentication failed');
                    }
                    const backendResponse = await response.json();
                    if (backendResponse && backendResponse.data && backendResponse.data.user) {
                        console.log("****** User authenticated successfully:", backendResponse);
                        return {
                            id: backendResponse.data.user._id, 
                            email: backendResponse.data.user.email,
                            name: backendResponse.data.user.name, 
                            accessToken: backendResponse.data.accessToken,
                              };
                    } else {
                        return null; 
                    }
                    
                } catch (error: unknown) { 
                        if (error instanceof Error) {
                        console.error("Backend authentication error:", error);
                                            throw new Error(error.message || 'Something went wrong during authentication');
                    } else {
                          console.error("An unexpected error occurred:", error);
                        throw new Error('An unexpected error occurred during authentication');
                    }
                }
            }
        })
    ],
  pages: {
        signIn: '/signin', 
        signOut: '/', 
    },

   
    callbacks: {
         async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;

                if (user.accessToken) {
                    token.accessToken = user.accessToken;
                }}
            return token;
        },
         async session({ session, token }) {
             if (session.user) {
                session.user.id = token.id as string;
                 session.user.email = token.email as string;
                session.user.name = token.name as string;
             }
             if (token.accessToken) {   
                 session.accessToken = token.accessToken as string;
                 
             }
            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },

    secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
        } & DefaultSession["user"];
        accessToken?: string; 
    }

    interface User {
        accessToken?: string;
    }

    interface JWT {
        id: string;
        email: string;
        name?: string;
        accessToken?: string; 
    }
}