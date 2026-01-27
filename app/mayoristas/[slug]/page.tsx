"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag,
  Package,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import Link from "next/link";
import { CTASection } from "@/components/cta-section";

type KitOverviewProps = { params: Promise<{ slug: string }> };

// Mock data - reemplazar con datos reales
const kitsData: Record<string, any> = {
  "kit-iniciador-cuidado-basico": {
    name: "Kit Iniciador - Cuidado Básico",
    price: 450000,
    originalPrice: 600000,
    discount: 25,
    items: 10,
    description: "Kit perfecto para comenzar tu negocio de cuidado capilar",
    longDescription:
      "Este kit está diseñado especialmente para emprendedores que desean iniciar su negocio en el sector de cuidado personal. Incluye una selección balanceada de productos básicos pero de alta calidad que te permitirán atender las necesidades más comunes de tus clientes.",
    includes: [
      { quantity: 5, item: "Champús de diferentes tipos" },
      { quantity: 3, item: "Acondicionadores reparadores" },
      { quantity: 2, item: "Mascarillas hidratantes" },
    ],
    benefits: [
      "Productos de marcas reconocidas",
      "Variedad para diferentes tipos de cabello",
      "Empaque atractivo para reventa",
      "Margen de ganancia del 40-50%",
    ],
    images: ["/product.jpeg", "/product.jpeg", "/product.jpeg"],
  },
  "kit-premium-tratamiento-completo": {
    name: "Kit Premium - Tratamiento Completo",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    items: 20,
    description: "Kit completo con productos de alta gama para tu negocio",
    longDescription:
      "Nuestro kit más completo, ideal para negocios establecidos que buscan ofrecer productos premium a sus clientes. Incluye tratamientos especializados y productos de lujo que te diferenciarán de la competencia.",
    includes: [
      { quantity: 8, item: "Champús premium de diferentes líneas" },
      { quantity: 6, item: "Acondicionadores de alta gama" },
      { quantity: 4, item: "Mascarillas intensivas" },
      { quantity: 2, item: "Serums reparadores" },
    ],
    benefits: [
      "Productos de línea premium",
      "Mayor margen de ganancia (50-60%)",
      "Clientela de alto poder adquisitivo",
      "Posicionamiento como tienda de lujo",
    ],
    images: ["/product.jpeg", "/product.jpeg", "/product.jpeg"],
  },
};

export default function KitDetailPage({ params }: KitOverviewProps) {
  const { slug } = use(params);
  const [quantity, setQuantity] = useState(1);

  // Obtener datos del kit o usar valores por defecto
  const kit = kitsData[slug] || {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    price: 550000,
    originalPrice: 750000,
    discount: 27,
    items: 12,
    description: "Kit especializado para distribuidores",
    longDescription:
      "Kit profesional diseñado para mayoristas y distribuidores que buscan productos de calidad para su negocio.",
    includes: [
      { quantity: 6, item: "Productos capilares variados" },
      { quantity: 4, item: "Tratamientos especiales" },
      { quantity: 2, item: "Productos complementarios" },
    ],
    benefits: [
      "Productos originales garantizados",
      "Precios competitivos",
      "Soporte para tu negocio",
      "Capacitación incluida",
    ],
    images: ["/product.jpeg"],
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          {" / "}
          <Link href="/mayoristas" className="hover:text-primary">
            Mayoristas
          </Link>
          {" / "}
          <span className="text-foreground">{kit.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
              <Image
                src={kit.images[0]}
                alt={kit.name}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 right-4 bg-destructive hover:bg-destructive">
                -{kit.discount}%
              </Badge>
            </div>
            {kit.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {kit.images.slice(1).map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-md overflow-hidden bg-secondary cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Image src={img} alt={`${kit.name} ${idx + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del kit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {kit.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="size-5" />
                <span>{kit.items} productos incluidos</span>
              </div>
            </div>

            {/* Precio */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm line-through text-muted-foreground">
                  ${kit.originalPrice.toLocaleString("es-CO")}
                </span>
                <Badge variant="destructive">Ahorra {kit.discount}%</Badge>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                ${kit.price.toLocaleString("es-CO")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Precio mayorista • IVA incluido
              </p>
            </div>

            <Separator />

            {/* Descripción */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {kit.longDescription}
              </p>
            </div>

            {/* Incluye */}
            <Card className="shadow-none">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Package className="size-5 text-primary" />
                  Contenido del Kit
                </h3>
                <ul className="space-y-2">
                  {kit.includes.map((item: any, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>{item.quantity}x</strong> {item.item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Beneficios */}
            <Card className="shadow-none bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Beneficios Mayoristas</h3>
                <ul className="space-y-2">
                  {kit.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Acciones */}
            <div className="space-y-3">
              <Button size="lg" className="w-full gap-2">
                <ShoppingBag className="size-5" />
                Solicitar Kit
              </Button>
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Mail className="size-5" />
                Solicitar Cotización Personalizada
              </Button>
            </div>

            {/* Info adicional */}
            <div className="space-y-3 text-sm pt-4 border-t">
              <div className="flex items-start gap-3">
                <Truck className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Envío Gratis</p>
                  <p className="text-muted-foreground">
                    En compras mayoristas superiores a $500.000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Productos Originales</p>
                  <p className="text-muted-foreground">
                    100% auténticos con certificados de garantía
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Asesoría Personalizada</p>
                  <p className="text-muted-foreground">
                    Contáctanos: mayoristas@kadash.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <section className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-xl font-bold">¿Por qué elegir este kit?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestros kits mayoristas están diseñados pensando en el éxito de
                tu negocio. Cada producto ha sido cuidadosamente seleccionado
                para garantizar la máxima satisfacción de tus clientes y
                optimizar tu rentabilidad.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Al adquirir nuestros kits, no solo obtienes productos de
                excelente calidad a precios competitivos, sino que también
                accedes a nuestro programa de soporte que incluye capacitación,
                material publicitario y asesoría continua para ayudarte a crecer.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Final */}
        <div className="mt-12">
          <CTASection
            title="¿Necesitas un kit personalizado?"
            description="Podemos crear un paquete especial adaptado a las necesidades específicas de tu negocio"
            buttons={[
              {
                label: "Contactar por Email",
                icon: <Mail className="size-5" />,
                href: "mailto:mayoristas@kadash.com",
              },
              {
                label: "Llamar Ahora",
                icon: <Phone className="size-5" />,
                href: "tel:+573001234567",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
