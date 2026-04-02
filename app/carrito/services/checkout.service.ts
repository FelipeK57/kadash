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
  /** Requerido cuando hay clientId (cliente autenticado) */
  deliveryAddressId?: number;
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

export interface SistecreditoCheckoutPayload {
  storeId: number;
  cart: MercadoPagoCartItem[];
  clientId?: number;
  deliveryAddressId?: number;
  guestEmail?: string;
  guestPhone?: string;
  successUrl?: string;
  paymentMethodId?: number;
  bankCode?: string | null;
  userType?: string;
  currency?: string;
  tax?: number;
  taxBase?: number;
  isActive?: boolean;
  status?: string;
  methodConfirmation?: string;
  docType?: string;
  document?: string;
  name?: string;
  lastName?: string;
  email?: string;
  indCountry?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
}

export interface SistecreditoCheckoutResponse {
  init_point: string | null;
  orderId: number;
  orderCode: string;
  sistecredito?: unknown;
}

export interface SistecreditoBankOption {
  code: string;
  name: string;
}

const normalizeBankList = (input: unknown): SistecreditoBankOption[] => {
  if (!input) return [];

  const candidateArrays: unknown[] = [];
  if (Array.isArray(input)) {
    candidateArrays.push(input);
  } else if (typeof input === "object") {
    const data = input as Record<string, unknown>;
    candidateArrays.push(
      data.banks,
      data.data,
      data.result,
      data.items,
      data.bankList
    );
  }

  const list = candidateArrays.find(Array.isArray) as unknown[] | undefined;
  if (!list) return [];

  return list
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const bank = item as Record<string, unknown>;
      const code =
        (bank.bankCode as string | undefined) ??
        (bank.code as string | undefined) ??
        (bank.id as string | undefined) ??
        "";
      const name =
        (bank.bankName as string | undefined) ??
        (bank.name as string | undefined) ??
        (bank.description as string | undefined) ??
        code;
      if (!code) return null;
      return { code: String(code), name: String(name) };
    })
    .filter((bank): bank is SistecreditoBankOption => Boolean(bank));
};

export async function getSistecreditoBankList(
  serviceCode: string
): Promise<SistecreditoBankOption[]> {
  const res = await api.get("/payments/sistecredito/banks", {
    params: { serviceCode },
  });
  return normalizeBankList(res.data);
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

export async function createSistecreditoCheckout(
  payload: SistecreditoCheckoutPayload
): Promise<SistecreditoCheckoutResponse> {
  const res = await api.post<SistecreditoCheckoutResponse>(
    "/payments/checkout/sistecredito",
    payload
  );
  return res.data;
}
