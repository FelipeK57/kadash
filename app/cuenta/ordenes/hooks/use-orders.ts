"use client";

import { useQuery } from "@tanstack/react-query";
import { getClientOrders } from "../services/orders.service";
import { useAuthStore } from "@/store/auth-store";

export const ORDERS_QUERY_KEY = ["client-orders"];

export function useClientOrders() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: getClientOrders,
    enabled: isAuthenticated,
  });
}
