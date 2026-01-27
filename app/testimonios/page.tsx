import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { CTASection } from "@/components/cta-section";

// Mock data - Testimonios
const testimonials = [
  {
    id: 1,
    name: "María Fernanda López",
    location: "Bogotá, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 5,
    date: "Hace 2 semanas",
    title: "Excelente servicio y productos de calidad",
    content:
      "Llevo más de 6 meses usando los productos de Kadash y mi cabello ha mejorado increíblemente. Estaba muy maltratado por los tintes y ahora luce brillante y saludable. El kit de reparación profunda es mi favorito.",
    product: "Kit Reparación Profunda",
  },
  {
    id: 2,
    name: "Carlos Andrés Ruiz",
    location: "Medellín, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 5,
    date: "Hace 1 mes",
    title: "Resultados sorprendentes",
    content:
      "No creía que encontraría productos tan buenos para mi piel. El serum facial ha reducido notablemente mis manchas y mi piel se siente más firme. La atención al cliente es impecable.",
    product: "Serum Facial Hidratante",
  },
  {
    id: 3,
    name: "Laura Gómez",
    location: "Cali, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    rating: 5,
    date: "Hace 3 semanas",
    title: "Mi cabello nunca había estado mejor",
    content:
      "Tenía problemas de resequedad y caspa. Desde que uso el champú nutritivo y el acondicionador reparador, mi cabello está suave, brillante y sin caspa. Los recomiendo 100%.",
    product: "Champú Nutritivo",
  },
  {
    id: 4,
    name: "Daniela Torres",
    location: "Barranquilla, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniela",
    rating: 5,
    date: "Hace 1 semana",
    title: "Productos naturales y efectivos",
    content:
      "Me encanta que sean productos con ingredientes naturales. Mi piel ha mejorado muchísimo, está más hidratada y radiante. El envío fue rápido y el empaque muy cuidadoso.",
    product: "Crema Nutritiva de Noche",
  },
  {
    id: 5,
    name: "Andrés Martínez",
    location: "Cartagena, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres",
    rating: 4,
    date: "Hace 2 meses",
    title: "Muy satisfecho con la compra",
    content:
      "La calidad de los productos es excelente. He notado cambios positivos en mi piel. El único detalle es que me gustaría que tuvieran más variedad de productos para hombre, pero en general estoy muy contento.",
    product: "Tónico Facial Equilibrante",
  },
  {
    id: 6,
    name: "Valentina Sánchez",
    location: "Pereira, Colombia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
    rating: 5,
    date: "Hace 5 días",
    title: "Atención personalizada increíble",
    content:
      "Fui a la tienda física y la atención fue maravillosa. Me ayudaron a elegir los productos perfectos para mi tipo de cabello y me dieron tips de uso. Los resultados son visibles desde la primera semana.",
    product: "Mascarilla Reparadora",
  },
];

const stats = [
  { value: "15,000+", label: "Clientes Satisfechos" },
  { value: "4.8/5", label: "Calificación Promedio" },
  { value: "98%", label: "Recomendación" },
  { value: "10+", label: "Años de Experiencia" },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.webp"
          alt="Testimonios Kadash"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Testimonios</h1>
          <p className="text-base md:text-xl max-w-2xl mx-auto">
            Lo que nuestros clientes dicen sobre nosotros
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-12">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-none text-center">
              <CardContent className="pt-6">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Historias Reales de Transformación
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Nada nos hace más felices que ver los resultados en nuestros
            clientes. Estas son algunas de las historias que nos motivan a seguir
            mejorando cada día.
          </p>
        </section>

        {/* Testimonials Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="shadow-none hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="size-12 rounded-full bg-secondary"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Quote className="size-8 text-primary/20 flex-shrink-0" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {testimonial.date}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-2">{testimonial.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>

                {/* Product */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Producto:{" "}
                    <span className="font-medium text-foreground">
                      {testimonial.product}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* CTA */}
        <CTASection
          title="¿Quieres ser parte de estas historias?"
          description="Descubre cómo nuestros productos pueden transformar tu piel y cabello. Únete a miles de clientes satisfechos."
          buttons={[
            {
              label: "Explorar Productos",
              href: "/productos",
            },
            {
              label: "Diagnóstico Gratuito",
              href: "/diagnostico-capilar",
            },
          ]}
        />
      </div>
    </main>
  );
}
