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

// Mock data - reemplazar con datos reales
const mockOrders = [
  {
    id: "1",
    orderNumber: "2026-001",
    date: "2026-01-20",
    status: "delivered" as const,
    total: 125000,
    items: [
      { id: "1", name: "Kit Reparación Profunda", quantity: 1, price: 85000 },
      { id: "2", name: "Serum Capilar Premium", quantity: 1, price: 40000 },
    ],
  },
  {
    id: "2",
    orderNumber: "2026-002",
    date: "2026-01-15",
    status: "shipped" as const,
    total: 95000,
    items: [
      { id: "3", name: "Pack Cuidado Corporal", quantity: 2, price: 47500 },
    ],
  },
  {
    id: "3",
    orderNumber: "2026-003",
    date: "2026-01-10",
    status: "processing" as const,
    total: 75000,
    items: [
      { id: "4", name: "Mascarilla Facial Premium", quantity: 1, price: 55000 },
      { id: "5", name: "Tónico Facial", quantity: 1, price: 20000 },
    ],
  },
  {
    id: "4",
    orderNumber: "2026-004",
    date: "2026-01-05",
    status: "delivered" as const,
    total: 210000,
    items: [
      {
        id: "6",
        name: "Kit Completo Cabello",
        quantity: 1,
        price: 120000,
      },
      { id: "7", name: "Acondicionador", quantity: 2, price: 45000 },
      { id: "8", name: "Serum Nocturno", quantity: 1, price: 45000 },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Mis Órdenes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Visualiza el estado de tus pedidos
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4 md:space-y-0 md:flex gap-3 flex-col md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Input
            placeholder="Buscar por número de orden..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>

        {/* Status Filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="processing">Procesando</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </div>

      {/* Empty State */}
      {mockOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No tienes órdenes aún
          </p>
          <Button>Ir a comprar</Button>
        </div>
      )}
    </div>
  );
}
