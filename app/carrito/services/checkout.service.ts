import { api } from "@/app/lib/api-client";

interface CheckoutItem {
  variantId: number;
  quantity: number;
  price: number;
}

interface CheckoutPayload {
  items: CheckoutItem[];
  total: number;
  paymentMethod: string;
}

export async function createCheckoutOrder(payload: CheckoutPayload) {
  const res = await api.post("/store/checkout", payload);
  return res.data;
}

/** Cart item para Mercado Pago: solo variantId y quantity (el total se calcula en backend). */
export interface MercadoPagoCartItem {
  variantId: number;
  quantity: number;
}

export interface MercadoPagoCheckoutPayload {
  storeId: number;
  cart: MercadoPagoCartItem[];
  clientId?: number;
  guestEmail?: string;
  guestPhone?: string;
  /** URLs de retorno después del pago (opcional; el backend usa STOREFRONT_URL si no se envían) */
  successUrl?: string;
  failureUrl?: string;
  pendingUrl?: string;
}

export interface MercadoPagoCheckoutResponse {
  init_point: string;
  orderId: number;
  orderCode: string;
}

/** Reintentar pago Mercado Pago para una orden pendiente (requiere auth cliente). */
export async function retryMercadoPagoCheckout(orderId: number): Promise<{
  init_point: string;
  orderId: number;
}> {
  const res = await api.post<{ init_point: string; orderId: number }>(
    "/payments/checkout/retry",
    { orderId }
  );
  return res.data;
}

/**
 * Crea checkout con Mercado Pago. Retorna init_point para redirigir.
 * No envía total ni precios desde el frontend; el backend calcula todo.
 */
export async function createMercadoPagoCheckout(
  payload: MercadoPagoCheckoutPayload
): Promise<MercadoPagoCheckoutResponse> {
  const res = await api.post<MercadoPagoCheckoutResponse>(
    "/payments/checkout",
    payload
  );
  return res.data;
}
