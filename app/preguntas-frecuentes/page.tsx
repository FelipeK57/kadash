"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const faqs = [
  {
    category: "Pedidos y Envíos",
    questions: [
      {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer:
          "Los tiempos de entrega varían según tu ubicación. Para Bogotá, el tiempo estimado es de 2-3 días hábiles. Para otras ciudades principales, entre 3-5 días hábiles. Para zonas rurales o más alejadas, puede tomar hasta 7-10 días hábiles.",
      },
      {
        question: "¿Cuál es el costo de envío?",
        answer:
          "El costo de envío depende de tu ubicación y el peso del pedido. Para compras superiores a $100.000, el envío es GRATIS a todo Colombia. Para montos menores, el costo se calcula automáticamente al momento de finalizar la compra.",
      },
      {
        question: "¿Puedo hacer seguimiento a mi pedido?",
        answer:
          "Sí, una vez que tu pedido sea despachado, recibirás un correo electrónico con el número de guía para hacer seguimiento. También puedes revisar el estado de tu pedido en la sección 'Mis Órdenes' de tu cuenta.",
      },
      {
        question: "¿Hacen envíos internacionales?",
        answer:
          "Por el momento, solo realizamos envíos dentro del territorio colombiano. Estamos trabajando para expandir nuestros servicios a nivel internacional próximamente.",
      },
    ],
  },
  {
    category: "Productos",
    questions: [
      {
        question: "¿Los productos son originales?",
        answer:
          "Absolutamente. Todos nuestros productos son 100% originales y están respaldados por certificados de autenticidad. Trabajamos directamente con marcas reconocidas y distribuidores autorizados.",
      },
      {
        question: "¿Qué hago si soy alérgico a algún ingrediente?",
        answer:
          "Te recomendamos revisar cuidadosamente la lista de ingredientes de cada producto antes de comprarlo. Si tienes dudas o alergias específicas, contáctanos y con gusto te asesoraremos para encontrar el producto más adecuado para ti.",
      },
      {
        question: "¿Puedo devolver un producto si no me gusta?",
        answer:
          "Sí, aceptamos devoluciones dentro de los primeros 30 días después de la compra, siempre y cuando el producto no haya sido usado y conserve su empaque original. Los gastos de envío de devolución corren por cuenta del cliente, excepto en casos de productos defectuosos.",
      },
      {
        question: "¿Ofrecen muestras gratuitas?",
        answer:
          "Ocasionalmente incluimos muestras gratuitas en los pedidos. También puedes solicitar muestras específicas al realizar tu compra (sujeto a disponibilidad).",
      },
    ],
  },
  {
    category: "Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, transferencias bancarias, y pago contra entrega en algunas zonas. Todos los pagos en línea son procesados de forma segura.",
      },
      {
        question: "¿Es seguro pagar en línea?",
        answer:
          "Totalmente seguro. Utilizamos encriptación SSL y trabajamos con pasarelas de pago certificadas que protegen tu información financiera. Nunca almacenamos datos de tarjetas de crédito en nuestros servidores.",
      },
      {
        question: "¿Puedo pagar en cuotas?",
        answer:
          "Sí, ofrecemos opciones de pago en cuotas con tarjetas de crédito a través de nuestras pasarelas de pago. Las opciones de financiación disponibles dependerán de tu banco emisor.",
      },
      {
        question: "¿Emiten factura?",
        answer:
          "Sí, emitimos factura electrónica para todas las compras. La recibirás por correo electrónico una vez se confirme tu pago. Si necesitas factura con NIT, asegúrate de proporcionar esta información al momento de la compra.",
      },
    ],
  },
  {
    category: "Cuenta y Seguridad",
    questions: [
      {
        question: "¿Necesito crear una cuenta para comprar?",
        answer:
          "No es obligatorio, pero te lo recomendamos. Con una cuenta podrás hacer seguimiento a tus pedidos, guardar tus direcciones, ver tu historial de compras y acceder a ofertas exclusivas.",
      },
      {
        question: "¿Cómo cambio mi contraseña?",
        answer:
          "Puedes cambiar tu contraseña desde la sección 'Mi Cuenta' > 'Configuración'. También puedes usar la opción '¿Olvidaste tu contraseña?' en la página de inicio de sesión.",
      },
      {
        question: "¿Qué hacen con mi información personal?",
        answer:
          "Protegemos tu información personal y solo la usamos para procesar tus pedidos y mejorar tu experiencia de compra. Nunca compartimos tus datos con terceros sin tu consentimiento. Consulta nuestra Política de Privacidad para más detalles.",
      },
    ],
  },
  {
    category: "Programa de Mayoristas",
    questions: [
      {
        question: "¿Cómo puedo ser mayorista?",
        answer:
          "Para unirte a nuestro programa de mayoristas, contáctanos a través del correo mayoristas@kadash.com o llámanos al +57 300 123 4567. Te proporcionaremos toda la información sobre requisitos, descuentos y beneficios.",
      },
      {
        question: "¿Qué descuentos ofrecen a mayoristas?",
        answer:
          "Los mayoristas obtienen descuentos de hasta el 40% dependiendo del volumen de compra. También ofrecemos envío gratuito en pedidos superiores a $500.000 y asesoría personalizada.",
      },
      {
        question: "¿Hay un mínimo de compra para mayoristas?",
        answer:
          "Sí, el pedido mínimo para acceder a precios de mayorista es de $300.000. Ofrecemos diferentes kits y paquetes diseñados específicamente para distribuidores.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar preguntas según el término de búsqueda
  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 md:py-12 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Preguntas Frecuentes
          </h1>
          <p className="text-muted-foreground">
            Encuentra respuestas rápidas a las preguntas más comunes
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar pregunta..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-none">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4 text-primary">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`item-${categoryIndex}-${faqIndex}`}
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-semibold">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-none">
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron preguntas que coincidan con tu búsqueda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-12">
          <Card className="shadow-none bg-primary/5">
            <CardContent className="pt-6 text-center space-y-3">
              <h3 className="text-xl font-bold">¿No encontraste lo que buscabas?</h3>
              <p className="text-muted-foreground">
                Nuestro equipo de soporte está listo para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="mailto:soporte@kadash.com"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 font-semibold transition-colors"
                >
                  Enviar Email
                </a>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 font-semibold transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
