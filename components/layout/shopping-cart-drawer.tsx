"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

const FREE_SHIPPING_THRESHOLD = 50000; // Ajusta segun regla de negocio

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function ShoppingCartDrawer() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Kit reparación profunda",
      variant: "Cabello seco",
      price: 22500,
      quantity: 1,
      image: "/product.jpeg",
    },
    {
      id: "2",
      name: "Serum facial hidratante",
      variant: "30 ml",
      price: 45000,
      quantity: 2,
      image: "/product.jpeg",
    },
    {
      id: "3",
      name: "Champú nutritivo",
      variant: "250 ml",
      price: 18000,
      quantity: 1,
      image: "/product.jpeg",
    },
  ]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const total = subtotal; // Ajusta si agregas impuestos/envio

  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <ShoppingBag className="text-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Tu carrito</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-4 pb-4 max-h-[calc(100svh-160px)]">
          <div className="shrink-0 rounded-lg border border-border bg-muted/40 p-3">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>Envío gratis</span>
              <span className="text-primary">{progress.toFixed(0)}%</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {remainingForFreeShipping === 0
                ? "Has desbloqueado el envío gratis"
                : `Te faltan ${currencyFormatter.format(
                    remainingForFreeShipping,
                  )} para envío gratis`}
            </p>
          </div>

          <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-lg border border-border p-3"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                    className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-muted-foreground transition hover:text-destructive"
                    aria-label="Eliminar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {item.name}
                      </p>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">
                          {item.variant}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-semibold">
                      {currencyFormatter.format(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      className="h-8 w-12 text-center text-sm font-medium"
                      value={item.quantity}
                      readOnly
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 space-y-2 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">
                {currencyFormatter.format(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span className="font-semibold">
                {remainingForFreeShipping === 0
                  ? "Gratis"
                  : currencyFormatter.format(8000)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{currencyFormatter.format(total)}</span>
            </div>
          </div>
        </div>

        <DrawerFooter className="gap-2 border-t border-border bg-background/60 sticky bottom-0 pt-3 pb-3">
          <Link href="/carrito" asChild>
            <Button className="w-full">Ir a checkout</Button>
          </Link>
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Continuar comprando
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
