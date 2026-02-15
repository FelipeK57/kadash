"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
  /** protected: requiere auth, redirige a login si no; guest: solo invitados, redirige a cuenta si ya está auth */
  mode?: "protected" | "guest";
}

export function AuthGuard({ children, mode = "protected" }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (mode === "protected") {
      if (!isAuthenticated) {
        router.replace("/auth/login");
      }
    } else {
      if (isAuthenticated) {
        router.replace("/cuenta");
      }
    }
  }, [hasHydrated, isAuthenticated, router, mode]);

  if (!hasHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (mode === "protected" && !isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Redirigiendo...
        </div>
      </div>
    );
  }

  if (mode === "guest" && isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Redirigiendo...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
