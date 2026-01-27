import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { CTASection } from "@/components/cta-section";

export default function StoresPage() {
  const storeInfo = {
    name: "Kadash Store Bogotá",
    address: "Calle 85 #15-32, Chapinero, Bogotá",
    phone: "+57 (1) 234-5678",
    whatsapp: "+57 300 123 4567",
    email: "tienda@kadash.com",
    hours: [
      { day: "Lunes a Viernes", time: "9:00 AM - 7:00 PM" },
      { day: "Sábados", time: "10:00 AM - 6:00 PM" },
      { day: "Domingos y Festivos", time: "11:00 AM - 4:00 PM" },
    ],
    coordinates: {
      lat: 4.6699,
      lng: -74.0564,
    },
  };

  const features = [
    "Asesoría personalizada de expertos",
    "Diagnóstico capilar y facial gratuito",
    "Prueba de productos en tienda",
    "Descuentos exclusivos para clientes presenciales",
    "Ambiente acogedor y moderno",
    "Estacionamiento disponible",
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Tienda Kadash"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Visítanos en Nuestra Tienda
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Vive la experiencia Kadash en persona
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Introducción */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Nuestra Tienda Física
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Te invitamos a conocer nuestro espacio en el corazón de Bogotá, donde
            podrás encontrar toda nuestra línea de productos, recibir asesoría
            personalizada y disfrutar de una experiencia de compra única.
          </p>
        </section>

        {/* Info Principal */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Ubicación y Contacto */}
          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  Ubicación
                </h3>
                <p className="font-semibold mb-2">{storeInfo.name}</p>
                <p className="text-muted-foreground">{storeInfo.address}</p>
                <Button className="mt-4 w-full gap-2" variant="outline" asChild>
                  <a
                    href={`https://www.google.com/maps?q=${storeInfo.coordinates.lat},${storeInfo.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="size-4" />
                    Cómo Llegar
                  </a>
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Phone className="size-5 text-primary" />
                  Contacto
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <a
                      href={`tel:${storeInfo.phone}`}
                      className="font-medium hover:text-primary"
                    >
                      {storeInfo.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <a
                      href={`https://wa.me/${storeInfo.whatsapp.replace(/\D/g, "")}`}
                      className="font-medium hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {storeInfo.whatsapp}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${storeInfo.email}`}
                      className="font-medium hover:text-primary"
                    >
                      {storeInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horarios */}
          <Card className="shadow-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                Horarios de Atención
              </h3>
              <div className="space-y-4">
                {storeInfo.hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0"
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Nota:</strong> Los horarios
                  pueden variar en fechas especiales. Te recomendamos llamar antes
                  de visitarnos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Características */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            ¿Qué encontrarás en nuestra tienda?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-none">
                <CardContent className="pt-6 flex items-start gap-3">
                  <div className="size-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mapa (placeholder) */}
        <section className="max-w-5xl mx-auto">
          <Card className="shadow-none overflow-hidden">
            <div className="relative w-full h-[300px] md:h-[400px] bg-muted">
              {/* Aquí iría el mapa real de Google Maps o similar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="size-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Mapa interactivo próximamente
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <CTASection
          title="¿Tienes dudas? ¡Contáctanos!"
          description="Nuestro equipo está listo para atenderte y ayudarte a encontrar los productos perfectos para ti"
          buttons={[
            {
              label: "Llamar Ahora",
              icon: <Phone className="size-5" />,
              href: `https://wa.me/${storeInfo.whatsapp.replace(/\D/g, "")}`,
              external: true,
            },
            {
              label: "Enviar Email",
              icon: <Mail className="size-5" />,
              href: `mailto:${storeInfo.email}`,
            },
          ]}
        />
      </div>
    </main>
  );
}
