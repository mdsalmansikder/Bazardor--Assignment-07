import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রতিদিনের বাজারদর এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দামের ওঠানামা ও বাজারভিত্তিক তুলনা জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <ToastProvider>
          <Suspense fallback={<div className="site-header-placeholder" aria-hidden="true" />}>
            <SiteHeader />
          </Suspense>
          <main className="site-main">{children}</main>
          <SiteFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
