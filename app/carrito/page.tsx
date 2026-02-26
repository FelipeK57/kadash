"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useShoppingCartStore,
  selectSubtotal,
} from "@/store/shopping-cart-store";
import { useAuthStore } from "@/store/auth-store";
import {
  createCheckoutOrder,
  createMercadoPagoCheckout,
} from "./services/checkout.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_QUERY_KEY } from "@/app/cuenta/hooks/use-account";
import { useState } from "react";
import { useShippingConfig } from "./hooks/use-shipping-config";

const PAYMENT_METHOD_MOCK = "MERCADOPAGO";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const items = useShoppingCartStore((state) => state.items);
  const subtotal = useShoppingCartStore(selectSubtotal);
  const updateQuantity = useShoppingCartStore((state) => state.updateQuantity);
  const removeItem = useShoppingCartStore((state) => state.removeItem);
  const clearCart = useShoppingCartStore((state) => state.clearCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authPayload = useAuthStore((state) => state.payload);
  const storeId = authPayload?.storeId ?? items[0]?.storeId;
  const { freeShippingThreshold, shippingCost: configShippingCost } =
    useShippingConfig(storeId);

  const shippingCost =
    subtotal >= freeShippingThreshold ? 0 : configShippingCost;
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Inicia sesión para proceder al pago");
      router.push("/auth/login");
      return;
    }

    setIsCheckoutLoading(true);
    try {
      if (PAYMENT_METHOD_MOCK === "MERCADOPAGO") {
        const storeId = authPayload.storeId || items[0]?.storeId;
        if (!storeId) {
          toast.error("No se pudo determinar la tienda");
          return;
        }
        const { init_point, orderId } = await createMercadoPagoCheckout({
          storeId,
          cart: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          clientId: authPayload.clientId,
        });
        if (init_point && orderId) {
          window.open(init_point, "_blank", "noopener,noreferrer");
          clearCart();
          queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
          toast.success(
            "Se abrió la ventana de pago. Al terminar verás el estado en tu orden."
          );
          router.push(`/cuenta/ordenes/${orderId}`);
          return;
        }
      }

      const payload = {
        items: items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        paymentMethod: PAYMENT_METHOD_MOCK,
      };

      await createCheckoutOrder(payload);
      clearCart();
      queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
      toast.success("¡Orden creada exitosamente!");
      router.push("/cuenta");
    } catch (error: unknown) {
      const msg =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Error al procesar el pago";
      toast.error(msg || "Error al procesar el pago");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">
          Agrega productos para continuar con tu compra
        </p>
        <Button asChild>
          <Link href="/productos">Explorar Productos</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Lista de productos */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <Card key={item.variantId} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    width={300}
                    height={300}
                    className="w-full aspect-square sm:w-24 sm:h-24 object-cover rounded-md z-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">
                          {item.productName}
                        </h3>
                        {item.variantSize && (
                          <p className="text-sm text-muted-foreground">
                            {item.variantSize}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.variantId)}
                        className="text-destructive shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {item.originalPrice != null &&
                        item.originalPrice > item.price && (
                          <p className="text-sm line-through text-muted-foreground">
                            {currencyFormatter.format(item.originalPrice)}
                          </p>
                        )}
                      <p className="text-primary font-bold text-lg sm:text-xl">
                        {currencyFormatter.format(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      <div className="text-end">
                        {item.originalPrice != null &&
                          item.originalPrice > item.price && (
                            <p className="text-sm line-through text-muted-foreground">
                              {currencyFormatter.format(
                                item.originalPrice * item.quantity
                              )}
                            </p>
                          )}
                        <p className="font-bold text-lg sm:text-xl">
                          {currencyFormatter.format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="lg:sticky lg:top-28 shadow-none">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Totales */}
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    {currencyFormatter.format(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Envío</span>
                  <span className="font-medium">
                    {shippingCost === 0
                      ? "Gratis"
                      : currencyFormatter.format(shippingCost)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {currencyFormatter.format(total)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
              >
                {isCheckoutLoading ? "Procesando..." : "Proceder al Pago"}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/productos">Continuar Comprando</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
