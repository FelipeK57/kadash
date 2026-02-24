"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { OrderCard } from "@/components/orders/order-card";
import { useClientOrders } from "./hooks/use-orders";
import { useState, useMemo } from "react";

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useClientOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter((o) =>
        o.code.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    return result;
  }, [orders, search, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Mis Órdenes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Visualiza el estado de tus pedidos
        </p>
      </div>

      <div className="space-y-4 md:space-y-0 md:flex gap-3 flex-col md:flex-row">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar por número de orden..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="PENDING">Pendiente</SelectItem>
            <SelectItem value="PAID">Pagado</SelectItem>
            <SelectItem value="SHIPPED">En camino</SelectItem>
            <SelectItem value="CANCELLED">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Cargando órdenes...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              orderNumber={order.code}
              date={order.createdAt}
              status={order.status}
              total={order.total}
              items={order.items.map((i) => ({
                id: i.id,
                name: i.name,
                quantity: i.quantity,
                price: i.price,
              }))}
              href={`/cuenta/ordenes/${order.id}`}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {orders.length === 0
              ? "No tienes órdenes aún"
              : "No se encontraron órdenes con los filtros aplicados"}
          </p>
          {orders.length === 0 && (
            <Link href="/productos">
              <Button>Ir a comprar</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
