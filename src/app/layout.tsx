import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "./providers";
import Navigation from "@/components/Navigation/Navigation";

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
      <body className={`container antialiased`}>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
