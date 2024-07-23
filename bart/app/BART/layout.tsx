"use client";
import React from "react";
import { CookiesProvider } from "react-cookie";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
