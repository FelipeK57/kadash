import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Package, CheckCircle2, Mail, Phone } from "lucide-react";
import { slugify } from "@/lib/utils";
import { CTASection } from "@/components/cta-section";

// Mock data - Kits para mayoristas
const wholesaleKits = [
  {
    id: 1,
    name: "Kit Iniciador - Cuidado Básico",
    image: "/product.jpeg",
    price: 450000,
    originalPrice: 600000,
    discount: 25,
    items: 10,
    description: "Kit perfecto para comenzar tu negocio",
    includes: ["5 Champús", "3 Acondicionadores", "2 Mascarillas"],
  },
  {
    id: 2,
    name: "Kit Premium - Tratamiento Completo",
    image: "/product.jpeg",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    items: 20,
    description: "Kit completo con productos de alta gama",
    includes: ["8 Champús", "6 Acondicionadores", "4 Mascarillas", "2 Serums"],
  },
  {
    id: 3,
    name: "Kit Skincare - Facial Pro",
    image: "/product.jpeg",
    price: 650000,
    originalPrice: 900000,
    discount: 28,
    items: 15,
    description: "Especializado en cuidado facial",
    includes: ["5 Serums", "4 Cremas", "3 Tónicos", "3 Mascarillas"],
  },
  {
    id: 4,
    name: "Kit Mixto - Negocio Completo",
    image: "/product.jpeg",
    price: 1200000,
    originalPrice: 1800000,
    discount: 33,
    items: 30,
    description: "Variedad completa para tu tienda",
    includes: ["10 Productos Capilares", "10 Productos Faciales", "10 Corporales"],
  },
  {
    id: 5,
    name: "Kit Reparación Capilar",
    image: "/product.jpeg",
    price: 550000,
    originalPrice: 750000,
    discount: 27,
    items: 12,
    description: "Especializado en reparación del cabello",
    includes: ["6 Tratamientos", "4 Ampolletas", "2 Mascarillas Intensivas"],
  },
  {
    id: 6,
    name: "Kit Anti-Edad Premium",
    image: "/product.jpeg",
    price: 950000,
    originalPrice: 1400000,
    discount: 32,
    items: 18,
    description: "Lo mejor en tratamiento anti-edad",
    includes: ["8 Serums", "6 Cremas", "4 Contornos de Ojos"],
  },
];

const benefits = [
  "Descuentos de hasta 40% en compras mayoristas",
  "Envío gratuito en pedidos superiores a $500.000",
  "Asesoría personalizada para tu negocio",
  "Acceso exclusivo a nuevos productos",
  "Capacitación sobre productos",
  "Soporte prioritario",
];

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Mayoristas Kadash"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Programa de Mayoristas
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Haz crecer tu negocio con nuestros kits especiales
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Descripción */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Por qué unirte a nuestro programa?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            En Kadash ofrecemos oportunidades de negocio para distribuidores y
            revendedores. Nuestros kits mayoristas están diseñados para ayudarte
            a iniciar o expandir tu negocio con productos de alta calidad a
            precios competitivos.
          </p>
        </section>

        {/* Beneficios */}
        <section className="bg-primary/5 rounded-lg p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Beneficios Exclusivos
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Kits Disponibles */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Kits Disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wholesaleKits.map((kit) => (
              <Card key={kit.id} className="shadow-none hover:shadow-md transition-shadow">
                <CardHeader>
                  <Link href={`/mayoristas/${slugify(kit.name)}`}>
                    <div className="relative">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover hover:scale-105 transition-transform rounded-md"
                      />
                      <Badge className="absolute top-2 right-2 bg-destructive hover:bg-destructive">
                        -{kit.discount}%
                      </Badge>
                    </div>
                  </Link>

                  <div className="pt-3 space-y-2">
                    <Link
                      href={`/mayoristas/${slugify(kit.name)}`}
                      className="hover:text-primary"
                    >
                      <h3 className="font-bold text-lg line-clamp-2">
                        {kit.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="size-4" />
                      <span>{kit.items} productos incluidos</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {kit.description}
                  </p>

                  {/* Includes */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">Incluye:</p>
                    <ul className="space-y-1">
                      {kit.includes.map((item, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="size-1 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm line-through text-muted-foreground">
                        ${kit.originalPrice.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <span className="font-bold text-2xl text-primary">
                      ${kit.price.toLocaleString("es-CO")}
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full gap-2">
                    <ShoppingBag className="size-4" />
                    Solicitar Kit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Contacto */}
        <CTASection
          title="¿Necesitas un kit personalizado?"
          description="Contáctanos y crearemos un paquete especial adaptado a las necesidades de tu negocio"
          buttons={[
            {
              label: "mayoristas@kadash.com",
              icon: <Mail className="size-5" />,
              href: "mailto:mayoristas@kadash.com",
            },
            {
              label: "+57 300 123 4567",
              icon: <Phone className="size-5" />,
              href: "tel:+573001234567",
            },
          ]}
        />
      </div>
    </main>
  );
}
