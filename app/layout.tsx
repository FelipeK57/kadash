import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/social-media";
import ScrollToTop from "@/components/scroll-to-top";
// Supports weights 100-900
import "@fontsource-variable/montserrat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kadash",
  description: "Tienda online de productos de belleza y cuidado personal.",
};

import { QueryProvider } from "./providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

type ShippingConfig = {
  freeShippingThreshold: number;
  shippingCost: number;
};

async function fetchShippingConfig(): Promise<ShippingConfig> {
  const storeId = process.env.NEXT_STORE_ID;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const defaults: ShippingConfig = {
    freeShippingThreshold: 50000,
    shippingCost: 8000,
  };

  if (!storeId || !apiUrl) {
    return defaults;
  }

  try {
    const res = await fetch(
      `${apiUrl}/store/shipping-config?storeId=${storeId}`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) {
      return defaults;
    }
    const data = (await res.json()) as {
      freeShippingThreshold: number | null;
      shippingCost: number | null;
    };
    return {
      freeShippingThreshold:
        typeof data.freeShippingThreshold === "number"
          ? data.freeShippingThreshold
          : defaults.freeShippingThreshold,
      shippingCost:
        typeof data.shippingCost === "number"
          ? data.shippingCost
          : defaults.shippingCost,
    };
  } catch {
    return defaults;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shippingConfig = await fetchShippingConfig();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <QueryProvider>
          <Toaster richColors theme="light" position="top-center" />
          <ScrollToTop />
          <Header
            freeShippingThreshold={shippingConfig.freeShippingThreshold}
            shippingConfig={shippingConfig}
          />
          <main className="flex-1">{children}</main>
          <Footer />
          <Button
            size="icon"
            className="size-16 bottom-5 right-5 rounded-full bg-emerald-600 p-3 fixed shadow-full z-50"
          >
            <WhatsAppIcon />
          </Button>
        </QueryProvider>
      </body>
    </html>
  );
}
