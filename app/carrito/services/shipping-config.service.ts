export interface ShippingConfig {
  freeShippingThreshold: number | null;
  shippingCost: number | null;
}

const DEFAULT_FREE_SHIPPING_THRESHOLD = 50000;
const DEFAULT_SHIPPING_COST = 8000;

export async function getShippingConfig(
  storeId: number | undefined
): Promise<{
  freeShippingThreshold: number;
  shippingCost: number;
}> {
  if (!storeId) {
    return {
      freeShippingThreshold: DEFAULT_FREE_SHIPPING_THRESHOLD,
      shippingCost: DEFAULT_SHIPPING_COST,
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/store/shipping-config?storeId=${storeId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return getDefaults();
    const data: ShippingConfig = await res.json();
    return {
      freeShippingThreshold:
        data.freeShippingThreshold ?? DEFAULT_FREE_SHIPPING_THRESHOLD,
      shippingCost: data.shippingCost ?? DEFAULT_SHIPPING_COST,
    };
  } catch {
    return getDefaults();
  }
}

function getDefaults() {
  return {
    freeShippingThreshold: DEFAULT_FREE_SHIPPING_THRESHOLD,
    shippingCost: DEFAULT_SHIPPING_COST,
  };
}
