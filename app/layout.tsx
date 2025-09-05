import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";

import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: "Barton Wholesale Marketplace",
  description:
    "Connect with global wholesale partners. Discover thousands of verified suppliers and buyers in your industry.",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // اینجا کلاس‌های Geist رو برای استفاده‌های خاص نگه می‌داریم
    <html
      lang="fa"
      dir="rtl"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      {/* <Script src="https://api.tempo.build/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" /> [deprecated] */}
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
