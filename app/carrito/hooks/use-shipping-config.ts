import { useQuery } from "@tanstack/react-query";
import { getShippingConfig } from "../services/shipping-config.service";

const SHIPPING_CONFIG_QUERY_KEY = "shipping-config";

export function useShippingConfig(storeId: number | undefined) {
  const query = useQuery({
    queryKey: [SHIPPING_CONFIG_QUERY_KEY, storeId],
    queryFn: () => getShippingConfig(storeId),
    staleTime: 5 * 60 * 1000,
  });
  return {
    ...query,
    freeShippingThreshold: query.data?.freeShippingThreshold ?? 50000,
    shippingCost: query.data?.shippingCost ?? 8000,
  };
}
