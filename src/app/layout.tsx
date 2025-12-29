import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type ThemeName = "dark-teal" | "dark-green" | "light-neutral";

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
    <html lang="en" data-theme={THEME_NAME}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
