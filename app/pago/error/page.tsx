"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { retryMercadoPagoCheckout } from "@/app/carrito/services/checkout.service";
import { toast } from "sonner";

export default function PagoErrorPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const { init_point } = await retryMercadoPagoCheckout(Number(orderId));
      if (init_point) {
        window.open(init_point, "_blank", "noopener,noreferrer");
        toast.success("Se abrió la ventana para reintentar el pago.");
      }
    } catch {
      toast.error("No se pudo iniciar el pago. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-16 px-4 flex flex-col items-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Pago no realizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            El pago no pudo completarse o fue rechazado. Puedes ver tu orden y
            reintentar el pago o volver al carrito.
          </p>
          <div className="flex flex-col gap-3 justify-center pt-2">
            {orderId && (
              <>
                <Button asChild>
                  <Link href={`/cuenta/ordenes/${orderId}`}>Ver mi orden</Link>
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRetry}
                  disabled={loading}
                >
                  {loading ? "Abriendo..." : "Reintentar pago"}
                </Button>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/carrito">Volver al carrito</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/productos">Seguir comprando</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
