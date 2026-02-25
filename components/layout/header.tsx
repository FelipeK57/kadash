"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { MobileMenu } from "./mobile-menu";
import { ShoppingCartDrawer } from "./shopping-cart-drawer";

export type ShippingConfigProp = {
  freeShippingThreshold: number;
  shippingCost: number;
};

export type HeaderProps = {
  freeShippingThreshold?: number | null;
  /** Config de envío para el drawer del carrito (mismo valor que el banner) */
  shippingConfig?: ShippingConfigProp;
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const Header = ({
  freeShippingThreshold,
  shippingConfig,
}: HeaderProps) => {
  const thresholdForBanner =
    (typeof freeShippingThreshold === "number" && freeShippingThreshold > 0
      ? freeShippingThreshold
      : shippingConfig?.freeShippingThreshold) ?? 50000;

  const bannerText = `Envío gratis en compras mayores a ${currencyFormatter.format(
    thresholdForBanner,
  )}`;

  return (
    <header className="sticky top-0 bg-background z-50 border-b border-border">
      {/* Banda de envío gratis - solo visible en desktop */}
      <div className="hidden md:block bg-primary p-1 text-xs text-center text-primary-foreground font-semibold">
        {bannerText}
      </div>

      {/* Header principal - 3 columnas */}
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Columna izquierda: Menu y Buscador */}
          <div className="flex items-center gap-2">
            <MobileMenu />
            <div className="relative flex-1 max-w-xs hidden sm:block">
              <Input placeholder="Buscar" className="pr-8" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
            </div>
          </div>

          {/* Columna central: Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src={"/logo.svg"}
                alt="Logo"
                width={150}
                height={50}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Columna derecha: Cuenta y Carrito */}
          <div className="flex items-center justify-end gap-2">
            <Link href="/cuenta">
              <Button size="icon" variant="ghost">
                <User className="text-primary" />
              </Button>
            </Link>
            <ShoppingCartDrawer shippingConfig={shippingConfig} />
          </div>
        </div>

        {/* Buscador móvil (debajo del header en mobile) */}
        <div className="relative mt-3 sm:hidden">
          <Input placeholder="Buscar productos..." className="pr-8" />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
        </div>
      </div>

      {/* Banda de envío gratis - visible en mobile debajo del header */}
      <div className="md:hidden bg-primary p-1 text-xs text-center text-primary-foreground font-semibold">
        {bannerText}
      </div>
    </header>
  );
};
