"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Menu, Dot } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  const routes = [
    { name: "Kits", href: "/productos?categoria=kits" },
    { name: "Cuidado Corporal", href: "/productos?categoria=cuidado-corporal" },
    {
      name: "Cuidado del Cabello",
      href: "/productos?categoria=cuidado-cabello",
    },
    { name: "Skincare", href: "/productos?categoria=skincare" },
    {
      name: "Complementos",
      href: "/productos?categoria=complementos",
      subRoutes: [
        {
          name: "Moñas",
          href: "/productos?categoria=complementos&subcategoria=monas",
        },
        {
          name: "Gorros de Satín",
          href: "/productos?categoria=complementos&subcategoria=gorros-satin",
        },
        {
          name: "Ganchos y Peines",
          href: "/productos?categoria=complementos&subcategoria=ganchos-peines",
        },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "Diagnóstico Capilar", href: "/diagnostico-capilar" },
    { name: "Punto de Venta", href: "/puntos-de-venta" },
    { name: "Testimonios", href: "/testimonios" },
  ];

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu className="text-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="Menú de navegación móvil">
        <DrawerHeader>
          <DrawerTitle>Menú</DrawerTitle>
        </DrawerHeader>
        <nav className="max-h-[calc(100vh-120px)] overflow-y-auto">
          {routes.map((route) => (
            <div key={route.name}>
              <Link href={route.href}>
                <button className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                  <Dot className="size-6 text-primary shrink-0" />
                  <span>{route.name}</span>
                </button>
              </Link>
              {route.subRoutes && (
                <div>
                  {route.subRoutes.map((subRoute) => (
                    <Link key={subRoute.name} href={subRoute.href}>
                      <button className="w-full px-4 py-2 pl-8 text-left text-sm hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-2">
                        <Dot className="size-6 text-primary shrink-0" />
                        <span>{subRoute.name}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
