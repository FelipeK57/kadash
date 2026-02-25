import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Info, Bell, CalendarDays } from "lucide-react";

export default function BlogPage() {
  const noticeTypes = [
    {
      icon: Megaphone,
      title: "Lanzamientos y promociones",
      description:
        "Entérate primero de nuevos productos, colecciones especiales y descuentos exclusivos.",
    },
    {
      icon: Info,
      title: "Avisos importantes",
      description:
        "Cambios en horarios de atención, actualizaciones de políticas y comunicados relevantes.",
    },
    {
      icon: Bell,
      title: "Recordatorios",
      description:
        "Fechas clave, campañas especiales y recomendaciones para el cuidado de tu piel y cabello.",
    },
  ];

  const sampleNotices = [
    {
      date: "15 Feb 2026",
      title: "Actualización de horarios de atención",
      description:
        "A partir de marzo ampliamos nuestro horario de atención en tienda y canales digitales.",
    },
    {
      date: "02 Feb 2026",
      title: "Nueva línea de cuidado capilar",
      description:
        "Descubre nuestra nueva colección formulada para nutrir y reparar el cabello dañado.",
    },
    {
      date: "20 Ene 2026",
      title: "Cambios en políticas de envíos",
      description:
        "Actualizamos nuestras condiciones de envío gratis y tiempos estimados de entrega.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Blog y avisos Kadash"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog y Avisos</h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Mantente al día con nuestras novedades, anuncios importantes y recomendaciones de
            cuidado.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
        {/* Introducción */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Avisos y Novedades</h2>
          <p className="text-muted-foreground leading-relaxed">
            En este espacio encontrarás toda la información importante sobre Kadash: anuncios
            oficiales, cambios en nuestras políticas, novedades de productos y contenido útil para
            cuidar tu piel y tu cabello.
          </p>
        </section>

        {/* Tipos de avisos */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            ¿Qué encontrarás aquí?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {noticeTypes.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="shadow-none hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="mx-auto w-fit p-3 rounded-full bg-primary/10">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Lista de avisos de ejemplo */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Últimos avisos publicados
          </h2>
          <div className="space-y-4">
            {sampleNotices.map((notice, index) => (
              <Card key={index} className="shadow-none hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="size-4 text-primary" />
                        <span>{notice.date}</span>
                      </div>
                      <h3 className="font-semibold text-base md:text-lg">{notice.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground md:max-w-xl">
                      {notice.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Nota final */}
        <section className="max-w-3xl mx-auto">
          <Card className="shadow-none bg-primary/5">
            <CardContent className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Este espacio se actualizará constantemente con nuevos avisos e información
                importante. Te invitamos a visitarlo con frecuencia para no perderte ninguna
                novedad.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
