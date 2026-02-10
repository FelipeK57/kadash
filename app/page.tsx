import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  CreditCard,
  Package,
  AlertCircle,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const categories = [
    {
      name: "Capilar",
      image: "/categories/capilar.jpeg",
      href: "/productos?categoria=capilar",
    },
    {
      name: "Corporal",
      image: "/categories/corporal.jpeg",
      href: "/productos?categoria=cuidado-corporal",
    },
    {
      name: "Nutrición",
      image: "/categories/nutricion.jpeg",
      href: "/productos?categoria=nutricion",
    },
    {
      name: "Facial",
      image: "/categories/facial.jpeg",
      href: "/productos?categoria=facial",
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
      reviews: 150,
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
      reviews: 98,
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
      reviews: 120,
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
      reviews: 110,
    },
    {
      id: 5,
      name: "Mascarilla Reparadora",
      image: "/product.jpeg",
      price: 38000,
      originalPrice: 55000,
      discount: 31,
      calification: 4.7,
      reviews: 256,
    },
  ];

  const bestSellers = [
    {
      id: 5,
      name: "Mascarilla Reparadora",
      image: "/product.jpeg",
      price: 38000,
      originalPrice: 55000,
      discount: 31,
      badge: "Best Seller",
      rating: 4.7,
      reviews: 256,
    },
    {
      id: 6,
      name: "Crema Nutritiva de Noche",
      image: "/product.jpeg",
      price: 72000,
      originalPrice: 105000,
      discount: 31,
      badge: "Best Seller",
      rating: 4.9,
      reviews: 189,
    },
    {
      id: 7,
      name: "Tónico Facial Equilibrante",
      image: "/product.jpeg",
      price: 52000,
      originalPrice: 75000,
      discount: 31,
      badge: "Best Seller",
      rating: 4.6,
      reviews: 143,
    },
    {
      id: 8,
      name: "Protector Solar SPF 50",
      image: "/product.jpeg",
      price: 48000,
      originalPrice: 70000,
      discount: 31,
      badge: "Best Seller",
      rating: 4.8,
      reviews: 215,
    },
    {
      id: 9,
      name: "Exfoliante Corporal Suave",
      image: "/product.jpeg",
      price: 36000,
      originalPrice: 52000,
      discount: 31,
    },
  ];

  return (
    <main className="flex flex-col">
      <Image
        src="/banner.jpeg"
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
          <div className="flex gap-8 md:gap-12 pb-2 md:justify-center min-w-max md:min-w-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center gap-2 group"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={192}
                  height={192}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors"
                />
                <span className="text-sm md:text-base font-semibold text-center max-w-32 md:max-w-48 group-hover:text-primary transition-colors">
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col h-full shadow-none gap-2"
            >
              <CardHeader className="flex flex-col gap-2">
                <Link href={`/productos/${slugify(product.name)}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform z-0"
                  />
                </Link>
                <div className="flex justify-between items-start md:items-center gap-2 w-full">
                  <Link
                    href={`/productos/${slugify(product.name)}`}
                    className="hover:text-primary"
                  >
                    <h3 className="font-semibold text-lg line-clamp-2 min-h-3">
                      {product.name}
                    </h3>
                  </Link>
                  {/* <Button className="group" variant="ghost" size="icon-lg">
                    <Heart className="size-6 text-primary group-hover:fill-primary" />
                  </Button> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  {product.calification}/5 ({product.reviews})
                </span>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="text line-through text-muted-foreground">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-bold text-xl text-primary">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full gap-2">
                  <ShoppingBag className="size-4" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Tratamientos Específicos */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Encuentra el tratamiento perfecto para ti
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Soluciones especializadas para cada necesidad
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {[
            {
              name: "Cabello Seco",
              href: "/productos?tratamiento=cabello-seco",
              seed: "CabelloSeco",
            },
            {
              name: "Cabello Graso",
              href: "/productos?tratamiento=cabello-graso",
              seed: "CabelloGraso",
            },
            {
              name: "Cabello Maltratado",
              href: "/productos?tratamiento=cabello-maltratado",
              seed: "CabelloMaltratado",
            },
            {
              name: "Anti-Caspa",
              href: "/productos?tratamiento=anti-caspa",
              seed: "AntiCaspa",
            },
            {
              name: "Kits Completos",
              href: "/productos?categoria=kits",
              seed: "KitsCompletos",
            },
            {
              name: "Piel Grasa",
              href: "/productos?tratamiento=piel-grasa",
              seed: "PielGrasa",
            },
            {
              name: "Piel Seca",
              href: "/productos?tratamiento=piel-seca",
              seed: "PielSeca",
            },
            {
              name: "Piel Normal/Mixta",
              href: "/productos?tratamiento=piel-normal-mixta",
              seed: "PielMixta",
            },
            {
              name: "Anti-Edad",
              href: "/productos?tratamiento=anti-edad",
              seed: "AntiEdad",
            },
            {
              name: "Hidratación Profunda",
              href: "/productos?tratamiento=hidratacion",
              seed: "Hidratacion",
            },
          ].map((treatment) => (
            <Link key={treatment.name} href={treatment.href} className="group">
              <Card className="shadow-none hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full min-h-25 md:min-h-30">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${treatment.seed}`}
                    alt={treatment.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-xs md:text-sm font-semibold group-hover:text-primary transition-colors">
                    {treatment.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-6 text-center">Más Vendidos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {bestSellers.map((product) => (
            <Card key={product.id} className="shadow-none gap-2">
              <CardHeader>
                <Link href={`/productos/${slugify(product.name)}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform z-0"
                  />
                </Link>
                <div className="flex justify-between items-start gap-2">
                  <Link
                    href={`/productos/${slugify(product.name)}`}
                    className="hover:text-primary"
                  >
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                  </Link>
                  <Button className="group" variant="ghost" size="icon-lg">
                    <Heart className="size-6 text-primary group-hover:fill-primary" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  {product.rating}/5 ({product.reviews})
                </span>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="text line-through text-muted-foreground">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-bold text-xl text-primary">
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

      {/* Features/Beneficios */}
      <section className="w-full bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-3">
              <Truck className="h-8 w-8" />
              <h3 className="font-semibold text-lg">Envíos a todo el país</h3>
              <p className="text-sm text-primary-foreground/80 text-center md:text-left">
                Llega rápido a cualquier parte del país
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CreditCard className="h-8 w-8" />
              <h3 className="font-semibold text-lg">Varios métodos de pago</h3>
              <p className="text-sm text-primary-foreground/80 text-center md:text-left">
                Paga con tarjeta en distintas plataformas seguras
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Package className="h-8 w-8" />
              <h3 className="font-semibold text-lg">Seguimiento de pedidos</h3>
              <p className="text-sm text-primary-foreground/80 text-center md:text-left">
                Sigue tu compra en tiempo real
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AlertCircle className="h-8 w-8" />
              <h3 className="font-semibold text-lg">Garantía de compra</h3>
              <p className="text-sm text-primary-foreground/80 text-center md:text-left">
                Productos 100% auténticos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold tracking-tight">
              Suscríbete a nuestro newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground md:text-lg">
              Mantente actualizado con nuestras ofertas exclusivas, lanzamientos
              de nuevos productos y descuentos especiales. ¡Suscríbete y sé el
              primero en enterarte!
            </p>
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mx-auto max-w-md">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="pl-10 rounded-lg sm:rounded-r-none sm:rounded-l-lg"
                  />
                </div>
                <Button className="rounded-lg sm:rounded-l-none sm:rounded-r-lg px-6">
                  Suscribir
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Nos importa tu privacidad.{" "}
                <Link href="/politicas" className="font-medium hover:underline">
                  Lee nuestra Política de Privacidad
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
