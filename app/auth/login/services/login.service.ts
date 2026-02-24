import { api } from "@/app/lib/api-client";
import axios from "axios";
import { LoginDto } from "../dtos";

export async function loginService(data: LoginDto) {
  try {
    const response = await api.post("/clients/login", {
      ...data,
      storeId: process.env.NEXT_PUBLIC_STORE_ID
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw error.response.data.message;
    }
    throw "Error de conexión. Intenta de nuevo.";
  }
}
