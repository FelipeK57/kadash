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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useShoppingCartStore,
  selectSubtotal,
} from "@/store/shopping-cart-store";
import { useShippingConfig } from "@/app/carrito/hooks/use-shipping-config";
import type { ShippingConfigProp } from "./header";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

type ShoppingCartDrawerProps = {
  /** Si viene del layout (SSR), se usa este valor para envío; si no, se usa useShippingConfig(storeId) */
  shippingConfig?: ShippingConfigProp | null;
};

export function ShoppingCartDrawer({
  shippingConfig: shippingConfigProp,
}: ShoppingCartDrawerProps = {}) {
  const [open, setOpen] = useState(false);

  const items = useShoppingCartStore((state) => state.items);
  const subtotal = useShoppingCartStore(selectSubtotal);
  const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);
  const removeItem = useShoppingCartStore((state) => state.removeItem);
  const storeId = items[0]?.storeId;
  const clientConfig = useShippingConfig(storeId);

  const freeShippingThreshold =
    shippingConfigProp?.freeShippingThreshold ?? clientConfig.freeShippingThreshold;
  const configShippingCost =
    shippingConfigProp?.shippingCost ?? clientConfig.shippingCost;

  const remainingForFreeShipping = Math.max(
    freeShippingThreshold - subtotal,
    0,
  );
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : configShippingCost;
  const total = subtotal + shippingCost;
  const progress =
    freeShippingThreshold > 0
      ? Math.min((subtotal / freeShippingThreshold) * 100, 100)
      : 100;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
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
            {items.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Tu carrito está vacío
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-3 rounded-lg border border-border p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.variantId)}
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
                          {item.productName}
                        </p>
                        {item.variantSize && (
                          <p className="text-xs text-muted-foreground">
                            {item.variantSize}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm font-semibold">
                        {item.originalPrice != null &&
                          item.originalPrice > item.price && (
                            <p className="line-through text-muted-foreground">
                              {currencyFormatter.format(
                                item.originalPrice * item.quantity
                              )}
                            </p>
                          )}
                        <p>{currencyFormatter.format(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
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
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
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
                  : currencyFormatter.format(shippingCost)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{currencyFormatter.format(total)}</span>
            </div>
          </div>
        </div>

        <DrawerFooter className="gap-2 border-t border-border bg-background/60 sticky bottom-0 pt-3 pb-3">
          <Link href="/carrito" onClick={() => setOpen(false)}>
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
