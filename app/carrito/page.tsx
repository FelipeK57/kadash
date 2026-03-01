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
import { useAddresses } from "@/app/cuenta/hooks/use-addresses";
import { MapPin, Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

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
  const { data: addresses = [], isLoading: addressesLoading } = useAddresses();

  const shippingCost =
    subtotal >= freeShippingThreshold ? 0 : configShippingCost;
  const total = subtotal + shippingCost;

  const defaultAddressId = addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id;
  const effectiveAddressId = selectedAddressId ?? defaultAddressId;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Inicia sesión para proceder al pago");
      router.push("/auth/login");
      return;
    }

    if (addresses.length === 0) {
      toast.error("Agrega al menos una dirección de entrega en tu cuenta");
      router.push("/cuenta");
      return;
    }

    const deliveryAddressId = effectiveAddressId;
    if (!deliveryAddressId) {
      toast.error("Selecciona una dirección de entrega");
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
          deliveryAddressId,
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
        deliveryAddressId,
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
              {/* Dirección de entrega (solo si está logueado) */}
              {isAuthenticated && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span className="font-medium text-sm">Dirección de entrega</span>
                    </div>
                    {addressesLoading ? (
                      <p className="text-sm text-muted-foreground">Cargando...</p>
                    ) : addresses.length === 0 ? (
                      <div className="text-sm text-muted-foreground border rounded-lg p-3 bg-muted/50">
                        <p className="mb-2">No tienes direcciones guardadas.</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/cuenta">Gestionar direcciones</Link>
                        </Button>
                      </div>
                    ) : (
                      <RadioGroup
                        value={String(effectiveAddressId)}
                        onValueChange={(v) => setSelectedAddressId(Number(v))}
                        className="space-y-2"
                      >
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className="flex items-start gap-2 border rounded-lg p-3 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                          >
                            <RadioGroupItem
                              value={String(addr.id)}
                              id={`addr-${addr.id}`}
                              className="mt-0.5"
                            />
                            <Label
                              htmlFor={`addr-${addr.id}`}
                              className="flex-1 cursor-pointer text-sm font-normal"
                            >
                              <span className="font-medium">{addr.label}</span>
                              {addr.isDefault && (
                                <Star className="size-3 inline fill-amber-500 text-amber-500 ml-1" />
                              )}
                              <p className="text-muted-foreground mt-0.5">
                                {addr.addressLine}, {addr.city}
                                {addr.department ? `, ${addr.department}` : ""}
                              </p>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                  <Separator />
                </>
              )}

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
                disabled={
                  isCheckoutLoading ||
                  (isAuthenticated && addresses.length === 0)
                }
              >
                {isCheckoutLoading
                  ? "Procesando..."
                  : isAuthenticated && addresses.length === 0
                    ? "Agrega una dirección de entrega"
                    : "Proceder al Pago"}
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
