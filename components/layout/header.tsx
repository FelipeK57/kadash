"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  storeId?: string;
  apiUrl?: string;
};

type SearchResult = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  variants: { id: number; price: number; discountPrice: number | null }[];
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export const Header = ({
  freeShippingThreshold,
  shippingConfig,
  storeId,
  apiUrl,
}: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const thresholdForBanner =
    (typeof freeShippingThreshold === "number" && freeShippingThreshold > 0
      ? freeShippingThreshold
      : shippingConfig?.freeShippingThreshold) ?? 50000;

  const bannerText = `Envío gratis en compras mayores a ${currencyFormatter.format(
    thresholdForBanner,
  )}`;

  const handleSubmitSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;

    setIsOverlayOpen(false);
    setSearchResults([]);
    router.push(`/productos?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    if (!apiUrl || !storeId) return;

    const q = searchTerm.trim();
    if (!isHome || q.length < 2) {
      setIsOverlayOpen(false);
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        const params = new URLSearchParams({
          storeId,
          q,
          limit: "8",
        });
        const res = await fetch(
          `${apiUrl}/store/products/search?${params.toString()}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error("Error buscando productos");
        }
        const data = await res.json();
        setSearchResults((data?.items ?? []) as SearchResult[]);
        setIsOverlayOpen(true);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          console.error("Error al buscar productos:", error);
        }
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [apiUrl, isHome, searchTerm, storeId]);

  useEffect(() => {
    // Cierra el overlay al cambiar de ruta
    setIsOverlayOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 bg-background z-50 border-b border-border">
      <div className="relative">
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
                <Input
                  placeholder="Buscar productos..."
                  className="pr-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0 && isHome) {
                      setIsOverlayOpen(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmitSearch();
                    }
                  }}
                />
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
            <Input
              placeholder="Buscar productos..."
              className="pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0 && isHome) {
                  setIsOverlayOpen(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitSearch();
                }
              }}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-primary" />
          </div>
        </div>

        {/* Overlay de resultados de búsqueda (solo en home) */}
        {isHome &&
          isOverlayOpen &&
          searchTerm.trim().length >= 2 &&
          (searchResults.length > 0 || isSearching) && (
            <div className="absolute inset-x-0 top-full z-50 bg-background/95 border-b border-border shadow-md">
              <div className="container mx-auto px-4 py-4">
                {isSearching ? (
                  <p className="text-sm text-muted-foreground">
                    Buscando productos...
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setIsOverlayOpen(false);
                          setSearchResults([]);
                          setSearchTerm("");
                          router.push(`/productos/${product.slug}`);
                        }}
                        className="text-left"
                      >
                        <div className="flex flex-col gap-2">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full aspect-square object-cover rounded-md"
                            />
                          )}
                          <p className="text-sm font-semibold line-clamp-2">
                            {product.name}
                          </p>
                          {product.variants?.[0]?.price && (
                            <p className="text-primary font-bold text-sm">
                              $
                              {product.variants[0].price.toLocaleString(
                                "es-CO",
                              )}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Banda de envío gratis - visible en mobile debajo del header */}
        <div className="md:hidden bg-primary p-1 text-xs text-center text-primary-foreground font-semibold">
          {bannerText}
        </div>
      </div>
    </header>
  );
};
