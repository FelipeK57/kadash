import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Item del carrito alineado con OrderItem del backend.
 * variantId + quantity + price son los campos requeridos para crear la orden.
 * Los campos de display (productName, variantSize, imageUrl) se guardan como snapshot
 * para mostrar el carrito sin necesidad de fetches adicionales.
 */
export interface CartItem {
  variantId: number;
  productId: number;
  productName: string;
  variantSize: string;
  price: number;
  quantity: number;
  imageUrl: string;
  storeId?: number;
}

interface ShoppingCartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity < 1) {
          set((state) => ({
            items: state.items.filter((i) => i.variantId !== variantId),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shopping-cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/** Selectores derivados para uso en componentes */
export const selectItemCount = (state: ShoppingCartStore) =>
  state.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectSubtotal = (state: ShoppingCartStore) =>
  state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
