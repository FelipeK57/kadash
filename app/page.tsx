import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Kits",
      image: "/category.webp",
      href: "/productos?categoria=kits",
    },
    {
      name: "Cuidado Corporal",
      image: "/category.webp",
      href: "/productos?categoria=cuidado-corporal",
    },
    {
      name: "Cuidado del Cabello",
      image: "/category.webp",
      href: "/productos?categoria=cuidado-cabello",
    },
    {
      name: "Skincare",
      image: "/category.webp",
      href: "/productos?categoria=skincare",
    },
    {
      name: "Complementos",
      image: "/category.webp",
      href: "/productos?categoria=complementos",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Kit Reparación Profunda",
      image: "/product.jpeg",
      price: 85000,
      originalPrice: 120000,
      discount: 29,
      badge: "Best Seller",
      calification: 4.8,
    },
    {
      id: 2,
      name: "Serum Facial Hidratante",
      image: "/product.jpeg",
      price: 65000,
      originalPrice: 95000,
      discount: 31,
      badge: "Descuento",
      calification: 4.5,
    },
    {
      id: 3,
      name: "Champú Nutritivo",
      image: "/product.jpeg",
      price: 45000,
      originalPrice: 65000,
      discount: 31,
      badge: "Best Seller",
      calification: 4.7,
    },
    {
      id: 4,
      name: "Acondicionador Reparador",
      image: "/product.jpeg",
      price: 55000,
      originalPrice: 80000,
      discount: 31,
      badge: "Descuento",
      calification: 4.6,
    },
  ];

  return (
    <main className="flex flex-col">
      <Image
        src="/hero.webp"
        alt="Hero Image"
        width={1920}
        height={600}
        className="w-full h-auto"
      />
      {/* Categorias */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-center mb-6">
          Explora nuestras categorías
        </h2>
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-8 pb-2 md:justify-center min-w-max md:min-w-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center gap-2 group"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors"
                />
                <span className="text-sm font-semibold text-center max-w-32 group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Ofertas Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="shadow-none gap-2">
              <CardHeader>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
              </CardHeader>
              <CardContent>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  {product.calification}/5
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-muted-foreground">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-bold text-primary">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2 mt-auto">
                  <ShoppingBag className="size-4" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
