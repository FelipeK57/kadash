import { api } from "@/app/lib/api-client";
import axios from "axios";

export interface DeliveryAddress {
  id: number;
  label: string;
  addressLine: string;
  city: string;
  department: string | null;
  phone: string | null;
  isDefault: boolean;
  clientId: number;
  storeId: number;
  createdAt: string;
}

export interface CreateAddressDto {
  label: string;
  addressLine: string;
  city: string;
  department?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDto {
  label?: string;
  addressLine?: string;
  city?: string;
  department?: string;
  phone?: string;
  isDefault?: boolean;
}

export async function getAddresses(): Promise<DeliveryAddress[]> {
  const res = await api.get<DeliveryAddress[]>("/store/addresses");
  return res.data;
}

export async function createAddress(
  data: CreateAddressDto
): Promise<DeliveryAddress> {
  try {
    const res = await api.post<DeliveryAddress>("/store/addresses", data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      throw e.response.data.message;
    }
    throw "Error al crear la dirección";
  }
}

export async function updateAddress(
  id: number,
  data: UpdateAddressDto
): Promise<DeliveryAddress> {
  try {
    const res = await api.patch<DeliveryAddress>(`/store/addresses/${id}`, data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      throw e.response.data.message;
    }
    throw "Error al actualizar la dirección";
  }
}

export async function deleteAddress(id: number): Promise<void> {
  try {
    await api.delete(`/store/addresses/${id}`);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      throw e.response.data.message;
    }
    throw "Error al eliminar la dirección";
  }
}
