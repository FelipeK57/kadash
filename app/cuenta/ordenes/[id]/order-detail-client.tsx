"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Package,
  DollarSign,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrderDetail } from "./hooks/use-order-detail";
import { useState } from "react";
import { retryMercadoPagoCheckout } from "@/app/carrito/services/checkout.service";
import { toast } from "sonner";

const statusConfig: Record<
  string,
  { label: string; icon: typeof Clock; className: string }
> = {
  PENDING: { label: "Pendiente", icon: Clock, className: "bg-amber-100 text-amber-800 border-amber-300" },
  PAID: { label: "Pagado", icon: Package, className: "bg-blue-100 text-blue-800 border-blue-300" },
  SHIPPED: { label: "En camino", icon: Truck, className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  CANCELLED: { label: "Cancelado", icon: Clock, className: "bg-red-100 text-red-800 border-red-300" },
};

const timelineIcons: Record<string, typeof Clock> = {
  pending: Clock,
  paid: Package,
  shipped: Truck,
  cancelled: Clock,
  delivered: CheckCircle2,
};

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const { data: order, isLoading } = useOrderDetail(orderId);
  const [retryLoading, setRetryLoading] = useState(false);

  const canRetryPayment =
    order?.status === "PENDING" &&
    order.payments?.some(
      (p) => p.method === "MERCADOPAGO" && (p.status === "FAILED" || p.status === "PENDING")
    );

  const handleRetryPayment = async () => {
    setRetryLoading(true);
    try {
      const { init_point } = await retryMercadoPagoCheckout(Number(orderId));
      if (init_point) {
        window.open(init_point, "_blank", "noopener,noreferrer");
        toast.success("Se abrió la ventana para completar el pago.");
      }
    } catch {
      toast.error("No se pudo iniciar el pago. Intenta de nuevo.");
    } finally {
      setRetryLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse text-muted-foreground text-center py-16">
          Cargando orden...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <p className="text-center text-muted-foreground py-8">
          Orden no encontrada
        </p>
        <Link href="/cuenta/ordenes">
          <Button>Volver a mis órdenes</Button>
        </Link>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status] ?? statusConfig.PENDING;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/cuenta/ordenes">
          <Button variant="ghost" size="icon" className="size-8 md:size-9">
            <ChevronLeft className="size-4 md:size-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Orden #{order.code}
          </h2>
          <p className="text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Status Section */}
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Estado del Pedido</CardTitle>
            <Badge variant="outline" className={cn("border", statusInfo.className)}>
              <StatusIcon className="size-3 mr-1" />
              {order.statusLabel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            {order.timeline.map((step, index) => {
              const StepIcon = timelineIcons[step.status] ?? Clock;
              const isLast = index === order.timeline.length - 1;

              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "size-8 md:size-10 rounded-full border-2 flex items-center justify-center",
                        step.completed
                          ? "bg-emerald-100 border-emerald-600"
                          : "bg-muted border-muted-foreground"
                      )}
                    >
                      <StepIcon
                        className={cn(
                          "size-4 md:size-5",
                          step.completed
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    {!isLast && (
                      <div
                        className={cn(
                          "w-0.5 h-16 md:h-20",
                          step.completed ? "bg-emerald-600" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-sm md:text-base">
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dirección de entrega */}
      {order.deliveryAddress && (
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="size-5" />
              Dirección de entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{order.deliveryAddress.label}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}
              {order.deliveryAddress.department
                ? `, ${order.deliveryAddress.department}`
                : ""}
            </p>
            {order.deliveryAddress.phone && (
              <p className="text-sm text-muted-foreground mt-1">
                Tel: {order.deliveryAddress.phone}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Items Section */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="size-5" />
            Productos ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              {item.imageUrl ? (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary shrink-0 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary shrink-0 flex items-center justify-center">
                  <Package className="size-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {item.slug ? (
                  <Link
                    href={`/productos/${item.slug}`}
                    className="hover:underline"
                  >
                    <p className="font-semibold text-sm md:text-base line-clamp-2">
                      {item.name}
                    </p>
                  </Link>
                ) : (
                  <p className="font-semibold text-sm md:text-base line-clamp-2">
                    {item.name}
                  </p>
                )}
                {item.sku && (
                  <p className="text-xs text-muted-foreground mt-1">
                    SKU: {item.sku}
                  </p>
                )}
                {item.size && (
                  <p className="text-xs text-muted-foreground">Talla: {item.size}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Cantidad: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-sm md:text-base">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currencyFormatter.format(item.price)} c/u
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="size-5" />
            Resumen de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.payments.length > 0 ? (
            order.payments.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="text-sm font-medium">{p.method}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.statusLabel}
                    {p.reference && ` · ${p.reference}`}
                  </p>
                </div>
                <span className="font-semibold">
                  {currencyFormatter.format(p.amount)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">Sin información de pago</p>
          )}
          {canRetryPayment && (
            <Button
              className="w-full gap-2"
              onClick={handleRetryPayment}
              disabled={retryLoading}
            >
              <CreditCard className="size-4" />
              {retryLoading ? "Abriendo..." : "Reintentar pago con Mercado Pago"}
            </Button>
          )}
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">
              {currencyFormatter.format(order.total)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Customer / Shipping info */}
      {order.customer && (
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="size-4" />
              Información de contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1 text-muted-foreground">
            <p className="font-semibold text-foreground">{order.customer.name}</p>
            {order.customer.email && <p>{order.customer.email}</p>}
            {order.customer.phone && <p>{order.customer.phone}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
