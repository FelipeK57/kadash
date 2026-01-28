import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, ShoppingBag, Star, X } from "lucide-react";
import { slugify } from "@/lib/utils";

// Mock data - reemplazar con datos reales
const favoriteProducts = [
  {
    id: 1,
    name: "Kit Reparación Profunda",
    image: "/product.jpeg",
    price: 85000,
    originalPrice: 120000,
    discount: 29,
    rating: 4.8,
    reviews: 150,
    inStock: true,
  },
  {
    id: 2,
    name: "Serum Facial Hidratante",
    image: "/product.jpeg",
    price: 65000,
    originalPrice: 95000,
    discount: 31,
    rating: 4.5,
    reviews: 98,
    inStock: true,
  },
  {
    id: 3,
    name: "Champú Nutritivo",
    image: "/product.jpeg",
    price: 45000,
    originalPrice: 65000,
    discount: 31,
    rating: 4.7,
    reviews: 120,
    inStock: false,
  },
];

export default function FavoritesPage() {
  const hasFavorites = favoriteProducts.length > 0;

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6 md:py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Mis Favoritos</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {hasFavorites
              ? `${favoriteProducts.length} producto${favoriteProducts.length > 1 ? "s" : ""} guardado${favoriteProducts.length > 1 ? "s" : ""}`
              : "Aún no tienes productos favoritos"}
          </p>
        </div>

        {/* Content */}
        {hasFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <Card key={product.id} className="shadow-none hover:shadow-md transition-shadow relative">
                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 size-8 bg-background/80 hover:bg-background"
                >
                  <X className="size-4" />
                </Button>

                <CardHeader>
                  <Link href={`/productos/${slugify(product.name)}`}>
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full aspect-square object-cover hover:scale-105 transition-transform"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-destructive text-white px-3 py-1 rounded-md text-sm font-semibold">
                            Agotado
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link
                    href={`/productos/${slugify(product.name)}`}
                    className="hover:text-primary"
                  >
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </CardHeader>

                <CardContent className="space-y-2">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                    {product.rating}/5 ({product.reviews})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text line-through text-muted-foreground text-sm">
                      ${product.originalPrice.toLocaleString("es-CO")}
                    </span>
                    <span className="font-bold text-xl text-primary">
                      ${product.price.toLocaleString("es-CO")}
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    disabled={!product.inStock}
                  >
                    <ShoppingBag className="size-4" />
                    {product.inStock ? "Agregar al Carrito" : "Agotado"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <Heart className="size-16 md:size-20 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              No tienes favoritos aún
            </h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Explora nuestros productos y guarda tus favoritos haciendo clic en el
              corazón. ¡Así podrás encontrarlos más fácil!
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
