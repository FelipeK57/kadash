import { api } from "@/app/lib/api-client";

export interface OrderListItem {
  id: number;
  code: string;
  status: string;
  statusLabel: string;
  total: number;
  createdAt: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface OrderDetailItem {
  id: number;
  name: string;
  sku?: string;
  quantity: number;
  price: number;
  imageUrl?: string | null;
  slug?: string | null;
  size?: string;
}

export interface OrderPayment {
  id: number;
  amount: number;
  method: string;
  status: string;
  statusLabel: string;
  reference?: string | null;
  createdAt: string;
}

export interface OrderTimelineStep {
  status: string;
  label: string;
  date: string;
  completed: boolean;
}

export interface OrderDetail {
  id: number;
  code: string;
  status: string;
  statusLabel: string;
  total: number;
  createdAt: string;
  source: string;
  customer: {
    name: string;
    email: string | null;
    phone: string | null;
  } | null;
  items: OrderDetailItem[];
  payments: OrderPayment[];
  timeline: OrderTimelineStep[];
}

export async function getClientOrders(): Promise<OrderListItem[]> {
  const res = await api.get<OrderListItem[]>("/store/orders");
  return res.data;
}

export async function getClientOrderById(orderId: string): Promise<OrderDetail> {
  const res = await api.get<OrderDetail>(`/store/orders/${orderId}`);
  return res.data;
}
