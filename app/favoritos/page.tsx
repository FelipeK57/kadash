"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useFavorites, useRemoveFavorite } from "./hooks/use-favorites";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { toast } from "sonner";
import type { Product } from "@/app/productos/types";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function FavoritesPage() {
  const { data: favoriteProducts = [] as Product[], isLoading } = useFavorites();
  const removeFavorite = useRemoveFavorite();
  const addItem = useShoppingCartStore((state) => state.addItem);

  const handleRemoveFavorite = (productId: number) => {
    removeFavorite.mutate(productId);
  };

  const handleAddToCart = (product: Product) => {
    const variant = product.variants?.[0];
    if (!variant?.id || !product.id) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantSize: variant.size,
      price: variant.price,
      imageUrl: variant.imageUrl || product.image,
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const hasFavorites = favoriteProducts.length > 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-6 md:py-8 px-4">
          <div className="animate-pulse text-muted-foreground text-center py-16">
            Cargando favoritos...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6 md:py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Mis Favoritos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {hasFavorites
              ? `${favoriteProducts.length} producto${favoriteProducts.length > 1 ? "s" : ""} guardado${favoriteProducts.length > 1 ? "s" : ""}`
              : "Aún no tienes productos favoritos"}
          </p>
        </div>

        {hasFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product: Product) => {
              const variant = product.variants?.[0];
              const inStock = (variant?.stock ?? 0) > 0;

              return (
                <Card
                  key={product.id}
                  className="flex flex-col h-full shadow-none hover:shadow-md transition-shadow relative gap-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 size-8 bg-background/80 hover:bg-background"
                    onClick={() => handleRemoveFavorite(product.id!)}
                    disabled={removeFavorite.isPending}
                    aria-label="Quitar de favoritos"
                  >
                    <X className="size-4" />
                  </Button>

                  <CardHeader className="flex flex-col gap-2">
                    <Link href={`/productos/${product.slug}`}>
                      <div className="relative">
                        <Image
                          src={product.image || "/product.jpeg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full aspect-square object-cover rounded-lg hover:scale-105 transition-transform"
                        />
                        {!inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="bg-destructive text-white px-3 py-1 rounded-md text-sm font-semibold">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link
                      href={`/productos/${product.slug}`}
                      className="hover:text-primary"
                    >
                      <h3 className="font-semibold text-lg line-clamp-2 min-h-3">
                        {product.name}
                      </h3>
                    </Link>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className="font-bold text-xl text-primary">
                        {currencyFormatter.format(variant?.price ?? 0)}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button
                      className="w-full gap-2"
                      disabled={!inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="size-4" />
                      {inStock ? "Agregar al Carrito" : "Agotado"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <Heart className="size-16 md:size-20 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              No tienes favoritos aún
            </h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Explora nuestros productos y guarda tus favoritos haciendo clic en
              el corazón. ¡Así podrás encontrarlos más fácil!
            </p>
            <Link href="/productos">
              <Button size="lg" className="gap-2">
                <ShoppingBag className="size-5" />
                Explorar Productos
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
