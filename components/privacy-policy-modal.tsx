"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function PrivacyPolicyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition text-left w-full">
          Política de Privacidad
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Política de Privacidad</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              1. Información que Recopilamos
            </h3>
            <p>
              Recopilamos información personal que nos proporciona directamente,
              como nombre, correo electrónico, teléfono y dirección. También
              recopilamos información sobre su navegación a través de cookies y
              tecnologías similares.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              2. Uso de la Información
            </h3>
            <p>
              Utilizamos la información recopilada para procesar pedidos, mejorar
              nuestros servicios, personalizar su experiencia y enviarle
              información relevante sobre nuestros productos. Nunca venderemos su
              información a terceros sin su consentimiento.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              3. Cookies y Tecnologías de Rastreo
            </h3>
            <p>
              Utilizamos cookies para mejorar su experiencia de navegación. Puede
              controlar las cookies a través de la configuración de su navegador.
              Algunas cookies son necesarias para el funcionamiento del sitio.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              4. Seguridad de Datos
            </h3>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger su información personal contra el acceso no autorizado,
              alteración, divulgación o destrucción.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              5. Derechos del Usuario
            </h3>
            <p>
              Tiene derecho a acceder, rectificar, suprimir y portabilidad de sus
              datos personales. Para ejercer estos derechos, contáctenos a
              privacidad@kadash.com.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">
              6. Cambios en esta Política
            </h3>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad
              en cualquier momento. Los cambios entrarán en vigencia cuando se
              publiquen en nuestro sitio web.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-foreground">7. Contacto</h3>
            <p>
              Si tiene preguntas sobre esta política de privacidad, contáctenos a:{" "}
              <a
                href="mailto:privacidad@kadash.com"
                className="text-primary hover:underline"
              >
                privacidad@kadash.com
              </a>
            </p>
          </section>

          <div className="pt-4 border-t text-xs text-muted-foreground italic">
            Última actualización: Enero 27, 2026
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
