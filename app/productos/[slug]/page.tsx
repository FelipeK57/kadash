"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";

type ProductOverviewProps = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: ProductOverviewProps) {
  const { slug } = use(params);

  // Datos determinísticos para evitar errores de hidratación
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const price = 65000;
  const originalPrice = 79900;
  const rating = 4.6;
  const reviewsCount = 128;

  const [qty, setQty] = useState(1);

  const reviews = [
    {
      id: 1,
      author: "María P.",
      rating: 5,
      comment:
        "Excelente producto, dejó mi cabello súper suave y con brillo. Recomendado!",
    },
    {
      id: 2,
      author: "Luisa R.",
      rating: 4,
      comment:
        "Huele delicioso y se nota el cambio desde la primera semana.",
    },
    {
      id: 3,
      author: "Ana G.",
      rating: 5,
      comment: "Cumple lo que promete. Volvería a comprar sin duda.",
    },
  ];

  return (
    <main className="py-8 md:py-12 bg-background">
      <div className="max-w-7xl px-4 mx-auto w-full">
        <div className="md:grid md:grid-cols-2 md:gap-8 xl:gap-12">
          {/* Imagen principal */}
          <div className="shrink-0 max-w-md md:max-w-lg mx-auto">
            <Image
              src="/product.jpeg"
              alt={name}
              width={500}
              height={500}
              className="w-full aspect-square object-cover rounded-lg z-0"
            />
          </div>

          {/* Información del producto */}
          <div className="mt-6 sm:mt-8 md:mt-0">
            <h1 className="text-xl font-semibold sm:text-2xl">{name}</h1>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                ${price.toLocaleString("es-CO")}
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
                <p className="text-sm font-medium text-muted-foreground">
                  ({rating})
                </p>
                <a
                  href="#reviews"
                  className="text-sm font-medium underline hover:no-underline"
                >
                  {reviewsCount} Reseñas
                </a>
              </div>
            </div>

            {/* Controles de compra */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 lg:flex-row lg:gap-4 lg:items-center">
              <Button variant="outline" className="w-full lg:w-auto gap-2">
                <Heart className="size-5" />
                Agregar a favoritos
              </Button>

              <Button className="w-full lg:flex-1 gap-2">
                <ShoppingBag className="size-5" />
                Agregar al carrito
              </Button>
            </div>

            <Separator className="my-6 md:my-8" />

            <p className="mb-6 text-muted-foreground">
              Fórmula hidratante y fortificante para todo tipo de cabello. Libre
              de parabenos y sulfatos. Este producto está diseñado para mejorar
              la salud y apariencia del cabello.
            </p>

            <p className="text-muted-foreground">
              Su uso continuo ayuda a fortalecer la fibra capilar, aportar
              hidratación profunda y reducir el frizz. Resultados visibles desde
              la primera aplicación.
            </p>

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
                  <span className="text-muted-foreground">• {r.author}</span>
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
