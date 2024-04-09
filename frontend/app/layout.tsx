import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AsideMenu from "@/components/AsideMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analiza ECG",
  description: "Projekt zespołowy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <div className="rootLayout">
          <AsideMenu />
          <div className="content">{children}</div>
      </div>
      </body>
      </html>
  );
}
