import { api } from "@/app/lib/api-client";
import axios from "axios";

export async function requestPasswordResetService(email: string) {
  try {
    await api.post("/auth/forgot-password", { email });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
    }
    throw "Error al enviar el código de recuperación";
  }
}

export async function verifyRecoveryCodeService(email: string, code: string) {
  try {
    const response = await api.post("/auth/verify-recovery-code", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
    }
    throw "Código inválido o expirado";
  }
}

export async function resetPasswordService(
  email: string,
  code: string,
  newPassword: string
) {
  try {
    await api.post("/auth/reset-password", {
      email,
      code,
      newPassword,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      }
    }
    throw "Error al cambiar la contraseña";
  }
}
