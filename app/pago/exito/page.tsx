"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function PagoExitoPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      window.location.href = `/cuenta/ordenes/${orderId}`;
    }
  }, [orderId]);

  if (orderId) {
    return (
      <main className="container mx-auto py-16 px-4 flex flex-col items-center min-h-[60vh]">
        <p className="text-muted-foreground">Redirigiendo a tu orden...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-16 px-4 flex flex-col items-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Pago exitoso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Tu pago fue procesado correctamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild>
              <Link href="/cuenta/ordenes">Ver mis órdenes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/productos">Seguir comprando</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
