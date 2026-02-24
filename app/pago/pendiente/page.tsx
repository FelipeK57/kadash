"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useEffect } from "react";

export default function PagoPendientePage() {
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
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Clock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-2xl">Pago pendiente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Tu pago está pendiente de confirmación. Cuando lo recibamos,
            actualizaremos el estado de tu orden.
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
