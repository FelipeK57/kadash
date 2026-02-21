"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccountData } from "../services/account.service";
import { useAuthStore } from "@/store/auth-store";

export const ACCOUNT_QUERY_KEY = ["account"];

export function useAccount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ACCOUNT_QUERY_KEY,
    queryFn: getAccountData,
    enabled: isAuthenticated,
  });
}
