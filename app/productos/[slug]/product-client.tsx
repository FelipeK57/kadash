"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Product, Review } from "../types";
import { useShoppingCartStore } from "@/store/shopping-cart-store";
import { toast } from "sonner";
import {
  useIsFavorite,
  useAddFavorite,
  useRemoveFavorite,
} from "@/app/favoritos/hooks/use-favorites";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
};

export default function ProductClient({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(product.reviews ?? []);
  const [averageRating, setAverageRating] = useState<number | null>(
    product.averageRating ?? (product.reviews && product.reviews.length
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : null)
  );
  const [reviewsCount, setReviewsCount] = useState<number>(
    product.reviewsCount ?? product.reviews?.length ?? 0
  );
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const addItem = useShoppingCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isFavorited = useIsFavorite(product.id);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const name = product.name;
  const description = product.description;

  const handleAddToCart = () => {
    if (!selectedVariant?.id || !product.id) return;
    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        productName: product.name,
        variantSize: selectedVariant.size,
        price: selectedVariant.price,
        imageUrl: selectedVariant.imageUrl || product.image,
      },
      quantity
    );
    toast.success(
      quantity > 1
        ? `${quantity} unidades de ${product.name} agregadas al carrito`
        : `${product.name} agregado al carrito`
    );
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
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Inicia sesión para dejar una reseña");
      return;
    }

    if (!product.id) return;

    if (!reviewComment.trim()) {
      toast.error("Escribe un comentario para tu reseña");
      return;
    }

    try {
      setIsSubmittingReview(true);
      // Lazy import to avoid server-side issues
      const { createReview } = await import("../services/reviews.service");
      const newReview = await createReview({
        productId: product.id,
        rating: reviewRating,
        comment: reviewComment.trim(),
        image: reviewImage,
      });

      setReviews((prev) => [newReview, ...prev]);
      const nextCount = reviewsCount + 1;
      setReviewsCount(nextCount);
      setAverageRating((prevAvg) => {
        if (prevAvg === null || reviewsCount === 0) {
          return reviewRating;
        }
        const total = prevAvg * reviewsCount + reviewRating;
        return total / nextCount;
      });

      setReviewRating(5);
      setReviewComment("");
      setReviewImage(null);

      toast.success("¡Gracias por tu reseña!");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo enviar tu reseña, intenta de nuevo.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <main className="py-8 md:py-12 bg-background">
      <div className="max-w-7xl px-4 mx-auto w-full">
        <div className="md:grid md:grid-cols-2 md:gap-8 xl:gap-12">
          {/* Imagen principal */}
          <div className="shrink-0 max-w-sm lg:max-w-full">
            <Image
              src={selectedVariant.imageUrl}
              alt={name}
              width={500}
              height={500}
              className="w-full aspect-square object-cover rounded-lg z-0"
              key={selectedVariant.id}
            />
          </div>

          {/* Información del producto */}
          <div className="mt-6 sm:mt-8 md:mt-0">
            <h1 className="text-xl font-semibold sm:text-2xl">{name}</h1>

            <div className="flex flex-col gap-4 mt-4 ">
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                ${selectedVariant.price.toLocaleString("es-CO")}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                {averageRating !== null && (
                  <p className="text-sm font-medium text-muted-foreground">
                    ({averageRating.toFixed(1)})
                  </p>
                )}
                <a
                  href="#reviews"
                  className="text-sm font-medium underline hover:no-underline"
                >
                  {reviewsCount} Reseñas
                </a>
              </div>
            </div>

            {/* Stock disponible */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Stock disponible:{" "}
                <span
                  className={`font-semibold ${
                    selectedVariant.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedVariant.stock > 0
                    ? `${selectedVariant.stock} unidades`
                    : "Sin stock"}
                </span>
              </p>
            </div>

            <Separator className="my-6 md:my-8" />

            {/* Variantes */}
            <div className="flex flex-col gap-4">
              <label htmlFor="variant" className="text-sm font-medium">
                Variantes disponibles:
              </label>
              <div className="flex gap-3 items-center flex-wrap">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1); // Resetear cantidad al cambiar variante
                    }}
                    disabled={variant.stock === 0}
                    className={`
                      py-2 px-4 border rounded-md min-w-15 text-center
                      transition-all duration-200
                      ${
                        selectedVariant.id === variant.id
                          ? "border-primary bg-primary text-primary-foreground font-semibold"
                          : "border-border hover:border-primary"
                      }
                      ${
                        variant.stock === 0
                          ? "opacity-50 cursor-not-allowed line-through"
                          : "cursor-pointer"
                      }
                    `}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-6 md:my-8" />

            {/* Selector de cantidad */}
            {selectedVariant.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium">Cantidad:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(
                        Math.min(selectedVariant.stock, quantity + 1)
                      )
                    }
                    disabled={quantity >= selectedVariant.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}

            {/* Controles de compra */}
            <div className="flex flex-col gap-3 lg:flex-row sm:gap-4 sm:items-center">
              <Button
                variant="outline"
                className={cn(
                  "w-full lg:w-auto gap-2",
                  isFavorited && "border-primary"
                )}
                onClick={handleFavorite}
                disabled={addFavorite.isPending || removeFavorite.isPending}
              >
                <Heart
                  className={cn(
                    "size-5",
                    isFavorited && "fill-primary text-primary"
                  )}
                />
                {isFavorited ? "En favoritos" : "Agregar a favoritos"}
              </Button>

              <Button
                className="w-full lg:w-auto gap-2"
                onClick={handleAddToCart}
                disabled={selectedVariant.stock === 0}
              >
                <ShoppingBag className="size-5" />
                {selectedVariant.stock === 0
                  ? "Sin stock"
                  : "Agregar al carrito"}
              </Button>
            </div>

            <p className="mt-6 text-muted-foreground">{description}</p>

            {/* Info adicional */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="size-5" />
                <span>Envío a todo Colombia en 2-5 días hábiles</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5" />
                <span>Compra segura con múltiples métodos de pago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas */}
        <section id="reviews" className="mt-12 md:mt-16">
          <h2 className="text-xl font-semibold mb-6">
            Reseñas de clientes ({reviewsCount})
          </h2>

          {/* Formulario para nueva reseña */}
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 p-4 border rounded-lg space-y-4"
          >
            <h3 className="font-medium">Escribe tu reseña</h3>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                Calificación:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setReviewRating(value)}
                    className="p-1"
                  >
                    <Star
                      className={`size-5 ${
                        value <= reviewRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {reviewRating}/5
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">
                Comentario
              </label>
              <textarea
                className="w-full rounded-md border px-3 py-2 text-sm min-h-24"
                placeholder="Cuéntanos tu experiencia con este producto"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">
                Imagen (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] ?? null;
                  setReviewImage(file);
                }}
                className="text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmittingReview || !isAuthenticated}
              className="w-full md:w-auto"
            >
              {isSubmittingReview
                ? "Enviando..."
                : !isAuthenticated
                  ? "Inicia sesión para reseñar"
                  : "Publicar reseña"}
            </Button>

            {!isAuthenticated && (
              <p className="text-xs text-muted-foreground">
                Debes iniciar sesión para publicar una reseña.
              </p>
            )}
          </form>

          {/* Listado de reseñas */}
          <div className="space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="border-b pb-6 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{r.rating}/5</span>
                  {r.authorName && (
                    <span className="text-muted-foreground">
                      • {r.authorName}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
                {r.imageUrl && (
                  <div className="mt-3">
                    <Image
                      src={r.imageUrl}
                      alt={`Reseña de ${name}`}
                      width={300}
                      height={300}
                      className="w-40 h-40 object-cover rounded-md z-0"
                    />
                  </div>
                )}
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Aún no hay reseñas para este producto.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}