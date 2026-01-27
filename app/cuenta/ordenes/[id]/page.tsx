import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Package,
  MapPin,
  Clock,
  DollarSign,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock data - reemplazar con datos reales
const mockOrderDetail: {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    sku: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  timeline: Array<{
    status: string;
    label: string;
    date: string;
    completed: boolean;
  }>;
} = {
  id: "1",
  orderNumber: "2026-001",
  date: "2026-01-20",
  status: "delivered",
  total: 125000,
  subtotal: 125000,
  tax: 0,
  shipping: 0,
  items: [
    {
      id: "1",
      name: "Kit Reparación Profunda",
      quantity: 1,
      price: 85000,
      image: "/product.jpeg",
      sku: "KRD-001",
    },
    {
      id: "2",
      name: "Serum Capilar Premium",
      quantity: 1,
      price: 40000,
      image: "/product.jpeg",
      sku: "SCP-002",
    },
  ],
  customer: {
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "+57 123 456 7890",
  },
  shippingAddress: {
    street: "Calle Principal 123",
    city: "Bogotá",
    state: "Cundinamarca",
    zipCode: "110111",
    country: "Colombia",
  },
  billingAddress: {
    street: "Calle Principal 123",
    city: "Bogotá",
    state: "Cundinamarca",
    zipCode: "110111",
    country: "Colombia",
  },
  timeline: [
    {
      status: "pending",
      label: "Pedido Confirmado",
      date: "2026-01-20 10:30 AM",
      completed: true,
    },
    {
      status: "processing",
      label: "Preparando Envío",
      date: "2026-01-20 02:45 PM",
      completed: true,
    },
    {
      status: "shipped",
      label: "Enviado",
      date: "2026-01-21 09:00 AM",
      completed: true,
    },
    {
      status: "delivered",
      label: "Entregado",
      date: "2026-01-23 05:15 PM",
      completed: true,
    },
  ],
};

const statusConfig = {
  pending: {
    label: "Pendiente",
    icon: Clock,
  },
  processing: {
    label: "Procesando",
    icon: Package,
  },
  shipped: {
    label: "Enviado",
    icon: Truck,
  },
  delivered: {
    label: "Entregado",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelado",
    icon: Clock,
  },
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const statusInfo = statusConfig[mockOrderDetail.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/cuenta/ordenes">
          <Button variant="ghost" size="icon" className="size-8 md:size-9">
            <ChevronLeft className="size-4 md:size-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Orden #{mockOrderDetail.orderNumber}
          </h2>
          <p className="text-sm text-muted-foreground">
            {new Date(mockOrderDetail.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Status Section */}
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Estado del Pedido</CardTitle>
            <Badge
              variant="default"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <StatusIcon className="size-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Timeline */}
          <div className="relative space-y-6">
            {mockOrderDetail.timeline.map((step, index) => {
              const StepIcon = statusConfig[step.status as keyof typeof statusConfig].icon;
              const isLast = index === mockOrderDetail.timeline.length - 1;

              return (
                <div key={index} className="flex gap-4">
                  {/* Timeline Line */}
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

                  {/* Content */}
                  <div className="pt-1">
                    <p className="font-semibold text-sm md:text-base">
                      {step.label}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {step.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="size-5" />
            Productos ({mockOrderDetail.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockOrderDetail.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              {/* Image */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/productos/slug`}
                  className="hover:underline"
                >
                  <p className="font-semibold text-sm md:text-base line-clamp-2">
                    {item.name}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  SKU: {item.sku}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cantidad: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm md:text-base">
                  ${(item.price * item.quantity).toLocaleString("es-CO")}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${item.price.toLocaleString("es-CO")} c/u
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="size-5" />
            Resumen de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${mockOrderDetail.subtotal.toLocaleString("es-CO")}</span>
          </div>
          {mockOrderDetail.tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Impuestos</span>
              <span>${mockOrderDetail.tax.toLocaleString("es-CO")}</span>
            </div>
          )}
          {mockOrderDetail.shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span>${mockOrderDetail.shipping.toLocaleString("es-CO")}</span>
            </div>
          )}
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">
              ${mockOrderDetail.total.toLocaleString("es-CO")}
            </span>
          </div>
        </CardContent>
      </Card>

        {/* Shipping Address */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="size-4" />
              Dirección de Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1 text-muted-foreground">
            <p className="font-semibold text-foreground">
              {mockOrderDetail.customer.name}
            </p>
            <p>{mockOrderDetail.shippingAddress.street}</p>
            <p>
              {mockOrderDetail.shippingAddress.city},{" "}
              {mockOrderDetail.shippingAddress.state}{" "}
              {mockOrderDetail.shippingAddress.zipCode}
            </p>
            <p>{mockOrderDetail.shippingAddress.country}</p>
            <p className="pt-2">{mockOrderDetail.customer.phone}</p>
          </CardContent>
        </Card>
    </div>
  );
}
