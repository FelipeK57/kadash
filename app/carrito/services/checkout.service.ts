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
