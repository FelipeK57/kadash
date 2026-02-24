import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { ChevronRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
}

const STATUS_MAP: Record<string, "pending" | "processing" | "shipped" | "delivered" | "cancelled"> = {
  PENDING: "pending",
  PAID: "processing",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
};

export type OrderCardStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderCardProps {
  id: string | number;
  orderNumber: string;
  date: string;
  status: OrderCardStatus | string;
  total: number;
  items: OrderItem[];
  href?: string;
}

const statusConfig = {
  pending: {
    label: "Pendiente",
    variant: "secondary" as const,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  processing: {
    label: "Procesando",
    variant: "default" as const,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  shipped: {
    label: "Enviado",
    variant: "outline" as const,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  },
  delivered: {
    label: "Entregado",
    variant: "outline" as const,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  },
  cancelled: {
    label: "Cancelado",
    variant: "outline" as const,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
};

export const OrderCard = ({
  id,
  orderNumber,
  date,
  status,
  total,
  items,
  href,
}: OrderCardProps) => {
  const mappedStatus = STATUS_MAP[status] ?? status;
  const statusInfo = statusConfig[mappedStatus as OrderCardStatus] ?? statusConfig.pending;

  return (
    <Link href={href || `/cuenta/ordenes/${id}`} className="block">
      <Card className="shadow-none hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base md:text-lg">
                Orden #{orderNumber}
              </CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {new Date(date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge
              variant={statusInfo.variant}
              className={cn("w-fit whitespace-nowrap", statusInfo.color)}
            >
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Items Preview */}
          <div className="space-y-2">
            {items.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-2 text-sm"
              >
                <span className="text-muted-foreground flex-1 line-clamp-1">
                  {item.name}
                </span>
                <span className="text-foreground font-medium">
                  x{item.quantity}
                </span>
              </div>
            ))}

            {items.length > 2 && (
              <p className="text-xs text-muted-foreground pt-1">
                +{items.length - 2} producto{items.length - 2 > 1 ? "s" : ""} más
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {items.length} producto{items.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-bold">
                ${total.toLocaleString("es-CO")}
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
