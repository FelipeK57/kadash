export type ProductsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type GetProductsParams = {
  categories?: string[];
  sort?: string;
  page?: number;
  limit?: number;
};

export async function getProducts({
  categories,
  sort,
  page = 1,
  limit = 12,
}: GetProductsParams) {
  const params = new URLSearchParams({
    storeId: process.env.NEXT_STORE_ID || "",
    sort: sort || "nuevo",
    page: String(page),
    limit: String(limit),
  });

  if (categories && categories.length > 0) {
    categories.forEach((cat) => params.append("category", cat));
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/store/products?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/store/products/${slug}?storeId=${process.env.NEXT_STORE_ID}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/store/categories?storeId=${process.env.NEXT_STORE_ID}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
