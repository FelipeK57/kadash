import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Microscope,
  User,
  Mail,
  Phone,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";

export default function HairDiagnosticPage() {

  const benefits = [
    {
      icon: Microscope,
      title: "Análisis Profesional",
      description:
        "Evaluación detallada del estado de tu cuero cabelludo y fibra capilar",
    },
    {
      icon: CheckCircle2,
      title: "Diagnóstico Personalizado",
      description:
        "Recomendaciones específicas según tu tipo de cabello y necesidades",
    },
    {
      icon: User,
      title: "Expertos Certificados",
      description:
        "Tricólogos y especialistas con años de experiencia en cuidado capilar",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Análisis Visual",
      description:
        "Examinamos tu cabello y cuero cabelludo para identificar problemas visibles",
    },
    {
      number: "02",
      title: "Microscopía Capilar",
      description:
        "Usamos tecnología avanzada para ver la estructura de tu cabello en detalle",
    },
    {
      number: "03",
      title: "Evaluación Completa",
      description:
        "Analizamos factores como porosidad, elasticidad, y densidad capilar",
    },
    {
      number: "04",
      title: "Recomendaciones",
      description:
        "Te entregamos un plan personalizado con productos y tratamientos ideales",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Diagnóstico Capilar"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Diagnóstico Capilar Gratuito
          </h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Descubre el estado real de tu cabello y encuentra el tratamiento
            perfecto
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
        {/* ¿Qué es? */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Qué es un Diagnóstico Capilar?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Es un análisis completo y profesional del estado de tu cabello y
            cuero cabelludo. A través de este examen, identificamos problemas
            como resequedad, caída excesiva, caspa, puntas abiertas, exceso de
            grasa y más. Con esta información, podemos recomendarte los productos
            y tratamientos más efectivos para tu caso específico.
          </p>
        </section>

        {/* Beneficios */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            ¿Por qué hacer un Diagnóstico Capilar?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="shadow-none hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="mx-auto w-fit p-3 rounded-full bg-primary/10">
                      <Icon className="size-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Proceso */}
        <section className="bg-primary/5 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto para Agendar */}
        <section className="max-w-3xl mx-auto">
          <Card className="shadow-none bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Agenda tu Diagnóstico Gratuito
                </h2>
                <p className="text-primary-foreground/90 max-w-xl mx-auto">
                  Contáctanos por WhatsApp o Email para agendar tu cita. Te
                  atenderemos de inmediato y coordinaremos el mejor horario para ti.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 h-auto py-4"
                  asChild
                >
                  <a
                    href="https://wa.me/573001234567?text=Hola,%20me%20gustaría%20agendar%20un%20diagnóstico%20capilar%20gratuito"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="size-5" />
                    <div className="text-left">
                      <p className="font-bold">WhatsApp</p>
                      <p className="text-xs opacity-90">+57 300 123 4567</p>
                    </div>
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 h-auto py-4"
                  asChild
                >
                  <a href="mailto:diagnostico@kadash.com?subject=Solicitud de Diagnóstico Capilar&body=Hola, me gustaría agendar un diagnóstico capilar gratuito.">
                    <Mail className="size-5" />
                    <div className="text-left">
                      <p className="font-bold">Email</p>
                      <p className="text-xs opacity-90">diagnostico@kadash.com</p>
                    </div>
                  </a>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/20">
                <p className="text-sm text-center text-primary-foreground/80">
                  💡 <strong>Tip:</strong> Menciona tu preocupación principal
                  (caída, resequedad, caspa, etc.) para que podamos prepararnos
                  mejor para tu consulta
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ubicación */}
        <section className="max-w-4xl mx-auto">
          <Card className="shadow-none">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4 text-center">
                Nuestra Ubicación
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Dirección</p>
                      <p className="text-sm text-muted-foreground">
                        Calle 85 #15-32, Chapinero, Bogotá
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Horario de Atención</p>
                      <p className="text-sm text-muted-foreground">
                        Lunes a Viernes: 9:00 AM - 7:00 PM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sábados: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Contacto</p>
                      <p className="text-sm text-muted-foreground">
                        +57 (1) 234-5678
                      </p>
                      <p className="text-sm text-muted-foreground">
                        tienda@kadash.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-lg h-[250px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="size-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Mapa interactivo próximamente
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
