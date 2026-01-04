import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import type { ThemeName } from "@/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const THEME_NAME: ThemeName = "dark-green";

export const metadata: Metadata = {
  title: "Michael Lim | Senior Frontend Engineer",
  description:
    "Portfolio of Michael Lim, a senior frontend engineer specializing in React, React Native, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={THEME_NAME} suppressHydrationWarning>
      <head>
        <Script id="local-theme-init" strategy="beforeInteractive">{`(() => {
  try {
    const key = "local-theme-name";
    const stored = window.localStorage.getItem(key);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const expiresAt = parsed?.expiresAt;
    const value = parsed?.value;

    if (typeof expiresAt !== "number" || expiresAt <= Date.now()) {
      window.localStorage.removeItem(key);
      return;
    }

    if (typeof value === "string") {
      document.documentElement.setAttribute("data-theme", value);
    }
  } catch {
    // no-op
  }
})();`}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
