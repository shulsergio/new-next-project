import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css"; // Если у вас есть глобальные стили, раскомментируйте
import Link from "next/link";

// Импортируем ваш AuthProvider, который мы создали в './providers.tsx'
import AuthProvider from "./providers";
import AuthStatus from "../components/AuthStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MY Next App",
  description: "create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <nav>
            <Link href="/">HOME</Link>
            <Link href="/about">About</Link>
            <AuthStatus />
          </nav>

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
