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
                            id: backendResponse.data.user.id, 
                            name: backendResponse.data.user.name,
                            mcsId: backendResponse.data.user.mcsId,
                            email: backendResponse.data.user.email,
                            role: backendResponse.data.user.role,
                            userType: backendResponse.data.user.userType,
                            gender: backendResponse.data.user.gender,
                            uniform: backendResponse.data.user.uniform,
                            activeUser: backendResponse.data.user.activeUser,
                            dateOfBirth: backendResponse.data.user.dateOfBirth,
                            region: backendResponse.data.user.region,
                            city: backendResponse.data.user.city,
                            shop: backendResponse.data.user.shop,
                            INN: backendResponse.data.user.INN,
                            mobile: backendResponse.data.user.mobile,
                            dateOfHied: backendResponse.data.user.dateOfHied,
                            dateOfFired: backendResponse.data.user.dateOfFired,
                            lastVisit: backendResponse.data.user.lastVisit,
                            accessToken: backendResponse.data.accessToken,
                            permissions: backendResponse.data.user.permissions,
                            };
                    } else {
                        return null; 
                    }
                    
                } catch (error: unknown) { 
                        if (error instanceof Error) {
                        console.error("Backend error:", error);
                                            throw new Error(error.message || 'Something went wrong');
                    } else {
                          console.error("Something went wrong:", error);
                        throw new Error('Something went wrong');
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
 async jwt({ token, user, trigger, session }){
 if (user) {
token.id = user.id;
token.email = user.email;
token.name = user.name;
token.role = user.role;
token.mcsId = user.mcsId;
token.userType = user.userType;
token.shop = user.shop;
     token.uniform = user.uniform;
     token.activeUser = user.activeUser;
token.dateOfBirth= user.dateOfBirth;
token.region = user.region;
token.city = user.city;
token.INN = user.INN;
token.mobile = user.mobile;
token.dateOfHied = user.dateOfHied;
token.dateOfFired = user.dateOfFired;
token.lastVisit = user.lastVisit;
token.permissions = user.permissions;

 if (user.accessToken) {
 token.accessToken = user.accessToken;
 }}
 if (trigger === 'update' && session?.user) {
            
 if (session.user.uniform !== undefined) { 
 console.log("JWT Callback: Updating uniform directly from session data.");
token.uniform = session.user.uniform; }
 if (session.user.dateOfBirth !== undefined) { 
                console.log("JWT Callback: Updating dateOfBirth directly from session data.");
                token.dateOfBirth = session.user.dateOfBirth;
            }
 } else if (trigger === 'update' && token.id) {
 console.log("JWT Callback: Triggered by update, re-fetching user data from backend.");
 try {
 const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${token.id}`, {
 method: 'GET',
 headers: {
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${token.accessToken}`, 
 },
 });

 if (userResponse.ok) {
 const userData = await userResponse.json();
 console.log("JWT Callback: Fetched fresh user data:", userData);

 token.name = userData.data.user.name;
 token.email = userData.data.user.email;
token.mcsId = userData.data.user.mcsId;
token.role = userData.data.user.role;
token.userType = userData.data.user.userType;
 token.gender = userData.data.user.gender;
     token.uniform = userData.data.user.uniform; 
     token.activeUser = userData.data.user.activeUser; 
 token.dateOfBirth= userData.data.user.dateOfBirth;
 token.region = userData.data.user.region;
 token.city = userData.data.user.city;
 token.INN = userData.data.user.INN;
 token.mobile = userData.data.user.mobile;
 token.dateOfHied = userData.data.user.dateOfHied;
 token.dateOfFired = userData.data.user.dateOfFired;
 token.lastVisit = userData.data.user.lastVisit;
 token.permissions = userData.data.user.permissions;
 } else {
 console.error("JWT Callback: Failed to re-fetch user data:", userResponse.status);
 }
 } catch (error) {
 console.error("JWT Callback: Error re-fetching user data:", error);
 }
 }

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
            session.user.shop = token.shop as string;
            session.user.uniform = token.uniform as string;
            session.user.dateOfBirth = token.dateOfBirth as string;
            session.user.region = token.region as string;
            session.user.activeUser = token.activeUser as boolean;
            session.user.city = token.city as string;
            session.user.INN = token.INN as string;
            session.user.mobile = token.mobile as string;
            session.user.dateOfHied = token.dateOfHied as string;
            session.user.dateOfFired = token.dateOfFired as string;
            session.user.lastVisit = token.lastVisit as string;
            session.user.permissions = token.permissions as Record<string, boolean>;
            }
            if (token.accessToken) {   
            session.accessToken = token.accessToken as string;
            }
            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
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
            shop?: string;
            uniform?: string;
            activeUser?: boolean;
   dateOfBirth?: string;
            region?: string;
            city?: string;
            INN?: string;
            mobile?: string;
            dateOfHied?: string;
            dateOfFired?: string;
            lastVisit?: string;
            permissions?: Record<string, boolean>;
        } & DefaultSession["user"];


        accessToken?: string; 
    }

    interface User {
        accessToken?: string;
        id: string;
        email: string;
        name?: string;
        mcsId: string;
        role?: string;
        userType?: string;
        shop?: string;
        uniform?: string;
        activeUser?: boolean;
           dateOfBirth?: string;
        region?: string;
            city?: string;
            INN?: string;
            mobile?: string;
            dateOfHied?: string;
            dateOfFired?: string;
        lastVisit?: string;
   permissions?: Record<string, boolean>;

    }

    interface JWT {
         id: string;
        email: string;
        name?: string;
        mcsId: string;
        role?: string;
        userType?: string;
        shop?: string;
        uniform?: string;
        activeUser?: boolean;
           dateOfBirth?: string;
        region?: string;
            city?: string;
            INN?: string;
            mobile?: string;
            dateOfHied?: string;
            dateOfFired?: string;
        lastVisit?: string;
        permissions?: Record<string, boolean>;
    }
}