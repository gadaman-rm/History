import type { Metadata } from "next";
import type { ReactNode } from "react";
import BackgroundEffects from "../components/BackgroundEffects";
import "./globals.scss";

export const metadata: Metadata = {
  title: "تاریخ‌نگار | ۱ نوامبر ۲۰۲۶",
  description:
    "رویدادها، زادروزها، درگذشت‌ها و مناسبت‌های تاریخی اول نوامبر.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BackgroundEffects />
        {children}
      </body>
    </html>
  );
}
