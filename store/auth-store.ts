import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Payload del token JWT enviado por el backend IMS al autenticar un cliente.
 * Campos estándar de JWT (exp, iat) pueden estar presentes.
 */
export interface ClientTokenPayload {
  clientId: number;
  email: string;
  name: string;
  storeId: number;
  nuip?: string;
  phone?: string | null;
  exp?: number;
  iat?: number;
}

const payloadInitialState: ClientTokenPayload = {
  clientId: 0,
  email: "",
  name: "",
  storeId: 0,
};

interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  payload: ClientTokenPayload;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      payload: payloadInitialState,
      hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },

      login: (token) => {
        try {
          const decoded = jwtDecode<ClientTokenPayload>(token);
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return;
          }
          set({
            token,
            isAuthenticated: true,
            payload: decoded,
          });
        } catch {
          return;
        }
      },
      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
          payload: payloadInitialState,
        });
      },
    }),
    {
      name: "client-auth-storage",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);

          if (state?.token) {
            try {
              const decoded = jwtDecode<ClientTokenPayload>(state.token);
              if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                state.logout?.();
              } else {
                state.login?.(state.token);
              }
            } catch {
              state.logout?.();
            }
          }
        }
      },
    },
  ),
);
