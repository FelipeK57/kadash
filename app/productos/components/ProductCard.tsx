"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "../types";
import Image from "next/image";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { toast } from "sonner";
import {
  useIsFavorite,
  useAddFavorite,
  useRemoveFavorite,
} from "@/app/favoritos/hooks/use-favorites";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useShoppingCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isFavorited = useIsFavorite(product.id);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const baseVariant = product.variants[0];
  const effectivePrice =
    baseVariant?.discountPrice != null && baseVariant.discountPrice > 0
      ? baseVariant.discountPrice
      : baseVariant?.price ?? 0;
  const hasDiscount =
    baseVariant?.discountPrice != null &&
    baseVariant.discountPrice > 0 &&
    baseVariant.discountPrice < baseVariant.price;

  const hasRating =
    product.averageRating != null &&
    typeof product.reviewsCount === "number" &&
    product.reviewsCount > 0;

  const handleAddToCart = () => {
    const variant = baseVariant;
    if (!variant?.id || !product.id) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantSize: variant.size,
      price: effectivePrice,
      originalPrice: hasDiscount ? baseVariant.price : undefined,
      imageUrl: variant.imageUrl || product.image,
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      toast.error("Inicia sesión para guardar favoritos");
      return;
    }
    if (!product.id) return;
    if (isFavorited) {
      removeFavorite.mutate(product.id);
    } else {
      addFavorite.mutate(product.id);
    }
  };
  return (
    <Card key={product.id} className="flex flex-col h-full shadow-none gap-2">
      <CardHeader className="flex flex-col gap-2">
        <Link href={`/productos/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full rounded-lg aspect-square object-cover hover:scale-105 transition-transform z-0"
          />
        </Link>
        <div className="flex justify-between items-start md:items-center gap-2 w-full">
          <Link
            href={`/productos/${product.slug}`}
            className="hover:text-primary"
          >
            <h3 className="font-semibold text-lg line-clamp-2 min-h-3">
              {product.name}
            </h3>
          </Link>
        </div>
        {hasRating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">
              {product.averageRating!.toFixed(1)}/5
            </span>
            <span>({product.reviewsCount})</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {hasDiscount && (
            <span className="text-xs line-through text-muted-foreground">
              ${baseVariant.price.toLocaleString("es-CO")}
            </span>
          )}
          <span className="font-bold text-lg text-primary">
            ${effectivePrice.toLocaleString("es-CO")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 mt-auto">
        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <ShoppingBag className="size-4" />
          Agregar
        </Button>
        <Button
          variant="outline"
          className={cn("w-full gap-2", isFavorited && "border-primary")}
          onClick={handleFavorite}
          disabled={addFavorite.isPending || removeFavorite.isPending}
        >
          <Heart
            className={cn("size-4", isFavorited && "fill-primary text-primary")}
          />
          {isFavorited ? "En favoritos" : "Favoritos"}
        </Button>
      </CardFooter>
    </Card>
  );
}
