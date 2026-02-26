export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  imageUrl?: string | null;
  authorName?: string | null;
  createdAt: string;
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
  averageRating?: number | null;
  reviewsCount?: number;
  reviews?: Review[];
}

export interface ProductVariant {
  id?: number;
  size: string;
  sku?: string | null;
  price: number;
  discountPrice?: number | null;
  cost?: number | null;
  stock: number;
  imageUrl: string;
  productId: number;
  storeId?: number;
  isActive: boolean;
  createdAt?: string;
}
