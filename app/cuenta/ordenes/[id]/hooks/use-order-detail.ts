"use client";

import { useQuery } from "@tanstack/react-query";
import { getClientOrderById } from "../../services/orders.service";
import { useAuthStore } from "@/store/auth-store";

export function useOrderDetail(orderId: string | undefined) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["client-order", orderId],
    queryFn: () => getClientOrderById(orderId!),
    enabled: isAuthenticated && !!orderId,
    refetchInterval: (query) =>
      (query.state.data as { status?: string } | undefined)?.status === "PENDING"
        ? 4000
        : false,
  });
}
