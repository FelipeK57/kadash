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
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Shampoo Fortificante",
      price: 35000,
      quantity: 2,
      image: "/product.jpeg",
    },
    {
      id: 2,
      name: "Acondicionador Hidratante",
      price: 32000,
      quantity: 1,
      image: "/product.jpeg",
    },
    {
      id: 3,
      name: "Mascarilla Nutritiva",
      price: 45000,
      quantity: 1,
      image: "/product.jpeg",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = 5000;
  const total = subtotal + shippingCost;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  if (cartItems.length === 0) {
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
          {cartItems.map((item) => (
            <Card key={item.id} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square sm:w-24 sm:h-24 object-cover rounded-md z-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <p className="text-primary font-bold text-lg sm:text-xl">
                      ${item.price.toLocaleString("es-CO")} COP
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
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
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      <p className="font-bold text-end text-lg sm:text-xl">
                        ${(item.price * item.quantity).toLocaleString("es-CO")}{" "}
                        COP
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="lg:sticky lg:top-36 shadow-none">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Totales */}
              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Envío</span>
                  <span className="font-medium">${shippingCost.toLocaleString("es-CO")}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${total.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full" size="lg">
                Proceder al Pago
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
