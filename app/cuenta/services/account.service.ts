import { api } from "@/app/lib/api-client";
import axios from "axios";

export interface AccountClient {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  nuip: string;
  createdAt: string;
}

export interface AccountStats {
  favoritesCount: number;
  ordersCount: number;
}

export interface AccountRecentOrder {
  id: number;
  number: string;
  date: string;
  status: string;
  statusLabel: string;
  total: number;
}

export interface AccountData {
  client: AccountClient;
  stats: AccountStats;
  recentOrders: AccountRecentOrder[];
}

export async function getAccountData(): Promise<AccountData> {
  const res = await api.get<AccountData>("/store/account");
  return res.data;
}

export interface UpdateAccountDto {
  name?: string;
  email?: string;
  phone?: string;
  nuip?: string;
}

export interface UpdateAccountResponse {
  message: string;
  client: AccountClient;
}

export async function updateAccountData(
  data: UpdateAccountDto
): Promise<UpdateAccountResponse> {
  try {
    const res = await api.patch<UpdateAccountResponse>("/store/account", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw error.response.data.message;
    }
    throw "Error al actualizar los datos";
  }
}
