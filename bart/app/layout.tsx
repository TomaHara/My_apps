"use client";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
}
