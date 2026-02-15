'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { User, Package, MapPin, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const menuItems = [
  {
    href: "/cuenta",
    label: "Mi Perfil",
    icon: User,
  },
  {
    href: "/cuenta/ordenes",
    label: "Mis Órdenes",
    icon: Package,
  }
];

export const AccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Mi Cuenta</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestiona tu perfil, órdenes y configuración
          </p>
        </div>

        {/* Layout Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Navegación */}
          <aside className="md:col-span-1">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3",
                        !isActive && "hover:bg-accent"
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {isActive && <ChevronRight className="size-4" />}
                    </Button>
                  </Link>
                );
              })}

              {/* Separator */}
              <div className="border-t my-2" />

              {/* Logout */}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="size-4" />
                <span className="flex-1 text-left">Cerrar Sesión</span>
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
