export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/products?storeId=${process.env.NEXT_STORE_ID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export async function getProductBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/products/${slug}?storeId=${process.env.NEXT_STORE_ID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};