import { api } from "@/app/lib/api-client";

export async function getFavorites() {
  const res = await api.get("/store/favorites");
  return res.data;
}

export async function addFavorite(productId: number) {
  const res = await api.post("/store/favorites", { productId });
  return res.data;
}

export async function removeFavorite(productId: number) {
  const res = await api.delete(`/store/favorites/${productId}`);
  return res.data;
}
