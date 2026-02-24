export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Product {
  id?: number;
  name: string;
  slug: string;
  code: string;
  description: string;
  categories: Category[];
  storeId: number;
  createdAt?: string;
  image: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id?: number;
  size: string;
  sku?: string | null;
  price: number;
  cost?: number | null;
  stock: number;
  imageUrl: string;
  productId: number;
  storeId?: number;
  isActive: boolean;
  createdAt?: string;
}
