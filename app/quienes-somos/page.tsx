import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Leaf } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Pasión por el Cuidado",
      description:
        "Nos apasiona ayudar a las personas a sentirse bien con su piel y cabello",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Trabajamos con los mejores productos y marcas reconocidas internacionalmente",
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Cada cliente es único y merece una atención especial y personalizada",
    },
    {
      icon: Leaf,
      title: "Productos Naturales",
      description:
        "Priorizamos ingredientes naturales que cuidan tu salud y el medio ambiente",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Kadash - Sobre Nosotros"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Quiénes Somos
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Más de 10 años cuidando tu belleza y bienestar
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
        {/* Historia */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Nuestra Historia
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Kadash nació hace más de una década con una visión clara: ofrecer
              productos de cuidado capilar y facial de la más alta calidad,
              accesibles para todos. Comenzamos como una pequeña tienda local en
              el corazón de Bogotá, impulsados por la pasión de ayudar a las
              personas a sentirse bien consigo mismas.
            </p>
            <p>
              Con el tiempo, nuestra dedicación y el compromiso con la
              excelencia nos permitieron crecer y expandirnos, llevando nuestros
              productos a todo el país. Hoy, nos enorgullece ser una de las
              marcas más confiables en Colombia para el cuidado personal.
            </p>
            <p>
              Cada producto que ofrecemos es cuidadosamente seleccionado,
              probado y avalado por expertos en dermatología y tricología. Nos
              importa tu bienestar, y trabajamos día a día para brindarte lo
              mejor.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="shadow-none hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-primary">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Proporcionar productos de cuidado personal de alta calidad que
                ayuden a nuestros clientes a realzar su belleza natural,
                promoviendo la confianza y el bienestar a través de soluciones
                efectivas y accesibles.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-primary">
                Nuestra Visión
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser la marca líder en Colombia en productos de cuidado capilar y
                facial, reconocida por nuestra calidad, innovación y compromiso
                con la satisfacción del cliente, expandiendo nuestra presencia a
                nivel internacional.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Compromiso */}
        <section className="bg-primary/5 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Nuestro Compromiso
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-center">
            <p>
              En Kadash, nos comprometemos a ofrecerte no solo productos de
              excelente calidad, sino también una experiencia de compra única.
              Nuestro equipo está siempre dispuesto a asesorarte y ayudarte a
              encontrar los productos perfectos para tus necesidades.
            </p>
            <p className="font-semibold text-foreground">
              Tu confianza es nuestro mayor logro. ¡Gracias por elegirnos!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
