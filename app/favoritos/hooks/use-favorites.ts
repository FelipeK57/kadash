"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFavorites,
  addFavorite as addFavoriteApi,
  removeFavorite as removeFavoriteApi,
} from "../services/favorites.service";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export const FAVORITES_QUERY_KEY = ["favorites"];

export function useFavorites() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: getFavorites,
    enabled: isAuthenticated,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavoriteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
      toast.success("Agregado a favoritos");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const msg = error.response?.data?.message || "Error al agregar";
      toast.error(msg);
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavoriteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
      toast.success("Eliminado de favoritos");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const msg = error.response?.data?.message || "Error al eliminar";
      toast.error(msg);
    },
  });
}

export function useIsFavorite(productId: number | undefined) {
  const { data: favorites = [] } = useFavorites();
  return productId
    ? favorites.some((p: { id?: number }) => p.id === productId)
    : false;
}
