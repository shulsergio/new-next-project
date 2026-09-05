import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "./providers";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldhub.in.ua"),
  title: "FieldHub платформа",
  description: "Автоматизація",
  openGraph: {
    title: "FieldHub платформа",
    description: "Автоматизація",
    url: "https://fieldhub.in.ua",
    siteName: "FieldHub",
    images: [
      {
        url: "/og-image.PNG",
        width: 1200,
        height: 630,
        alt: "FieldHub Preview",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FieldHub платформа",
    description: "Автоматизація",
    images: ["https://fieldhub.in.ua/og-image.PNG"],
  },
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
