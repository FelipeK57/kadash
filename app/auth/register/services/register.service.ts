import { api } from "@/app/lib/api-client";
import axios from "axios";
import { RegisterDto } from "../dtos";

export async function registerService(data: RegisterDto) {
  try {
    const response = await api.post("/clients/register", {
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
