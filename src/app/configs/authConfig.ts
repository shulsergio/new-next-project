import type { DefaultSession, NextAuthOptions } from 'next-auth';
// import GooglePovider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthConfig } from 'next-auth/config';

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mcsId: { label: "mcsId", type: "mcsId", placeholder: "your mcs ID" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.mcsId || !credentials.password) {
                    return null;
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            mcsId: credentials.mcsId,
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
                            name: backendResponse.data.user.name,
                            mcsId: backendResponse.data.user.mcsId,
                            email: backendResponse.data.user.email,
                            role: backendResponse.data.user.role,
                            userType: backendResponse.data.user.userType,
                            gender: backendResponse.data.user.gender,
                            uniform: backendResponse.data.user.uniform,
                            mcsShop: backendResponse.data.user.mcsShop,
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
                token.mcsId = user.mcsId;
                token.role = user.role;
                token.userType = user.userType;
                token.mcsShop = user.mcsShop;
                token.uniform = user.uniform;


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
                 session.user.mcsId = token.mcsId as string;
                 session.user.role = token.role as string;
                 session.user.userType = token.userType as string;
                 session.user.mcsShop = token.mcsShop as string;
                 session.user.uniform = token.uniform as string;
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
            mcsId: string;
            email: string;
            name?: string;
            role?: string;
            userType?: string;
            mcsShop?: string;
            uniform?: string;
        } & DefaultSession["user"];


        accessToken?: string; 
    }

    interface User {
        accessToken?: string;
        // id: string;
        email: string;
        name?: string;
        mcsId: string;
        role?: string;
        userType?: string;
        mcsShop?: string;
        uniform?: string;

    }

    interface JWT {
        id: string;
        email: string;
        name?: string;
        mcsId: string;
        role?: string;
        userType?: string;
        uniform?: string;
        mcsShop?: string;
        accessToken?: string; 
    }
}