// app/api/auth/[...nextauth]/route.ts
import { authConfig } from './../../../configs/authConfig'; // Путь может отличаться
import NextAuth from "next-auth";

const handler = NextAuth(authConfig); // Правильно
export { handler as GET, handler as POST };