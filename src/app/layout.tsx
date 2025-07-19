import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "./providers";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "SAMS project",
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
          <main className="main-container">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
