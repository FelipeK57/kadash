'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Package,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";

// Mock data - reemplazar con datos reales
const userData = {
  name: "Juan Pérez García",
  email: "juan@example.com",
  phone: "+57 123 456 7890",
  joinDate: "2025-06-15",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
};

const recentOrders = [
  {
    id: "1",
    number: "2026-001",
    date: "2026-01-20",
    status: "delivered" as const,
    total: 125000,
  },
  {
    id: "2",
    number: "2026-002",
    date: "2026-01-15",
    status: "shipped" as const,
    total: 95000,
  },
];

const quickStats = [
  {
    label: "Órdenes Totales",
    value: "4",
    icon: Package,
    href: "/cuenta/ordenes",
  },
  {
    label: "Favoritos",
    value: "12",
    icon: Heart,
    href: "/favoritos",
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="size-16 md:size-20 rounded-full bg-secondary"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {userData.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Miembro desde{" "}
                  {new Date(userData.joinDate).toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Edit Button
            <Button
              variant="outline"
              className="gap-2 self-start sm:self-auto"
            >
              <Edit className="size-4" />
              Editar Perfil
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Información de Contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Correo Electrónico</p>
              <p className="text-sm md:text-base break-all">{userData.email}</p>
            </div>
          </div>

          <div className="border-t pt-4 flex items-center gap-3">
            <Phone className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <p className="text-sm md:text-base">{userData.phone}</p>
            </div>
          </div>

          <div className="border-t pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <MapPin className="size-5 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Direcciones</p>
                <p className="text-sm md:text-base text-muted-foreground">
                  1 dirección guardada
                </p>
              </div>
            </div>
            <Link href="/cuenta/direcciones">
              <Button size="sm" variant="ghost">
                <ChevronRight className="size-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="shadow-none hover:shadow-md transition-shadow h-full cursor-pointer">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="size-5 md:size-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Órdenes Recientes</CardTitle>
          <Link href="/cuenta/ordenes">
            <Button size="sm" variant="ghost">
              Ver todas
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/cuenta/ordenes/${order.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      Orden #{order.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <Badge
                      variant="outline"
                      className={
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-blue-100 text-blue-800 border-blue-300"
                      }
                    >
                      {order.status === "delivered"
                        ? "Entregado"
                        : "En Camino"}
                    </Badge>
                    <span className="text-sm font-semibold">
                      ${order.total.toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">
                No tienes órdenes aún
              </p>
              <Link href="/productos">
                <Button className="mt-4">Empezar a Comprar</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences Card
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preferencias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3">
            Cambiar Contraseña
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            Configuración de Notificaciones
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
       */}
    </div>
  );
}
