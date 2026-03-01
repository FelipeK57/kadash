"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Mail,
  Phone,
  User,
  CreditCard,
  Package,
  Heart,
  ChevronRight,
  Pencil,
  MapPin,
  Plus,
  Trash2,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useAccount } from "./hooks/use-account";
import { updateAccountData } from "./services/account.service";
import { useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_QUERY_KEY } from "./hooks/use-account";
import { toast } from "sonner";
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "./hooks/use-addresses";
import type { DeliveryAddress } from "./services/addresses.service";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const quickStatsConfig = [
  {
    label: "Órdenes Totales",
    key: "ordersCount" as const,
    icon: Package,
    href: "/cuenta/ordenes",
  },
  {
    label: "Favoritos",
    key: "favoritesCount" as const,
    icon: Heart,
    href: "/favoritos",
  },
];

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "SHIPPED":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "PAID":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "PENDING":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "";
  }
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[0-9]{10}$/.test(phone.replace(/\s/g, ""));
}

export default function AccountPage() {
  const { data, isLoading } = useAccount();
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nuip: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    nuip: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: addresses = [], isLoading: addressesLoading } = useAddresses();
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<DeliveryAddress | null>(null);
  const [addressForm, setAddressForm] = useState({
    label: "",
    addressLine: "",
    city: "",
    department: "",
    phone: "",
    isDefault: false,
  });
  const [addressFormErrors, setAddressFormErrors] = useState<Record<string, string>>({});

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open);
    if (open && data?.client) {
      setFormData({
        name: data.client.name,
        email: data.client.email || "",
        phone: data.client.phone || "",
        nuip: data.client.nuip || "",
      });
      setFormErrors({ name: "", email: "", phone: "", nuip: "" });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: "",
      email: "",
      phone: "",
      nuip: "",
    };

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      errors.email = "El correo es requerido";
    } else if (!validateEmail(formData.email.trim())) {
      errors.email = "Correo electrónico inválido";
    }

    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      errors.phone = "El teléfono debe tener 10 dígitos";
    }

    if (!formData.nuip.trim()) {
      errors.nuip = "El número de identificación es requerido";
    } else if (formData.nuip.trim().length < 10) {
      errors.nuip = "Debe tener al menos 10 caracteres";
    }

    setFormErrors(errors);
    if (Object.values(errors).some((e) => e !== "")) return;

    setIsSubmitting(true);
    try {
      await updateAccountData({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        nuip: formData.nuip.trim(),
      });
      await queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY });
      toast.success("Datos actualizados correctamente");
      handleEditOpenChange(false);
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al actualizar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddressDialog = (address?: DeliveryAddress | null) => {
    setEditingAddress(address ?? null);
    setAddressForm({
      label: address?.label ?? "",
      addressLine: address?.addressLine ?? "",
      city: address?.city ?? "",
      department: address?.department ?? "",
      phone: address?.phone ?? "",
      isDefault: address?.isDefault ?? false,
    });
    setAddressFormErrors({});
    setAddressDialogOpen(true);
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!addressForm.label.trim()) err.label = "Nombre o etiqueta es requerido";
    if (!addressForm.addressLine.trim()) err.addressLine = "La dirección es requerida";
    if (!addressForm.city.trim()) err.city = "La ciudad es requerida";
    setAddressFormErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      if (editingAddress) {
        await updateAddressMutation.mutateAsync({
          id: editingAddress.id,
          data: {
            label: addressForm.label.trim(),
            addressLine: addressForm.addressLine.trim(),
            city: addressForm.city.trim(),
            department: addressForm.department.trim() || undefined,
            phone: addressForm.phone.trim() || undefined,
            isDefault: addressForm.isDefault,
          },
        });
        toast.success("Dirección actualizada");
      } else {
        await createAddressMutation.mutateAsync({
          label: addressForm.label.trim(),
          addressLine: addressForm.addressLine.trim(),
          city: addressForm.city.trim(),
          department: addressForm.department.trim() || undefined,
          phone: addressForm.phone.trim() || undefined,
          isDefault: addressForm.isDefault,
        });
        toast.success("Dirección agregada");
      }
      setAddressDialogOpen(false);
    } catch (msg) {
      toast.error(typeof msg === "string" ? msg : "Error al guardar");
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("¿Eliminar esta dirección?")) return;
    try {
      await deleteAddressMutation.mutateAsync(id);
      toast.success("Dirección eliminada");
    } catch (msg) {
      toast.error(typeof msg === "string" ? msg : "Error al eliminar");
    }
  };

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse text-muted-foreground text-center py-16">
          Cargando...
        </div>
      </div>
    );
  }

  const { client, stats, recentOrders } = data;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="shadow-none">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(client.name)}`}
                alt={client.name}
                className="size-16 md:size-20 rounded-full bg-secondary"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Miembro desde{" "}
                  {new Date(client.createdAt).toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Información de Contacto</CardTitle>
          <Dialog open={isEditOpen} onOpenChange={handleEditOpenChange}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="size-4" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Editar datos personales</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="edit-name"
                      placeholder="Juan Pérez"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      aria-invalid={!!formErrors.name}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-sm text-destructive">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="edit-email"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      aria-invalid={!!formErrors.email}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-sm text-destructive">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="edit-phone"
                      type="tel"
                      placeholder="3001234567"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      aria-invalid={!!formErrors.phone}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-sm text-destructive">{formErrors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nuip">Número de identificación</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="edit-nuip"
                      placeholder="1234567890"
                      className="pl-10"
                      value={formData.nuip}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, nuip: e.target.value }))
                      }
                      aria-invalid={!!formErrors.nuip}
                    />
                  </div>
                  {formErrors.nuip && (
                    <p className="text-sm text-destructive">{formErrors.nuip}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Nombre</p>
              <p className="text-sm md:text-base">{client.name}</p>
            </div>
          </div>
          <div className="border-t pt-4 flex items-center gap-3">
            <Mail className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Correo Electrónico</p>
              <p className="text-sm md:text-base break-all">
                {client.email || "No registrado"}
              </p>
            </div>
          </div>
          <div className="border-t pt-4 flex items-center gap-3">
            <Phone className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Teléfono</p>
              <p className="text-sm md:text-base">{client.phone || "N/A"}</p>
            </div>
          </div>
          <div className="border-t pt-4 flex items-center gap-3">
            <CreditCard className="size-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Identificación</p>
              <p className="text-sm md:text-base">{client.nuip || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Direcciones de entrega */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Direcciones de entrega</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => openAddressDialog()}
          >
            <Plus className="size-4" />
            Agregar dirección
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {addressesLoading ? (
            <p className="text-sm text-muted-foreground py-4">Cargando...</p>
          ) : addresses.length === 0 ? (
            <div className="text-center py-6 border rounded-lg border-dashed">
              <MapPin className="size-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                No tienes direcciones guardadas
              </p>
              <Button size="sm" variant="outline" onClick={() => openAddressDialog()}>
                Agregar primera dirección
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {addresses.map((addr) => (
                <li
                  key={addr.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{addr.label}</span>
                      {addr.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="size-3 fill-current" /> Predeterminada
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {addr.addressLine}, {addr.city}
                      {addr.department ? `, ${addr.department}` : ""}
                    </p>
                    {addr.phone && (
                      <p className="text-xs text-muted-foreground">{addr.phone}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openAddressDialog(addr)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteAddress(addr.id)}
                      disabled={deleteAddressMutation.isPending}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Editar dirección" : "Nueva dirección"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre o etiqueta (ej. Casa, Oficina)</Label>
              <Input
                value={addressForm.label}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, label: e.target.value }))
                }
                placeholder="Casa"
                aria-invalid={!!addressFormErrors.label}
              />
              {addressFormErrors.label && (
                <p className="text-sm text-destructive">{addressFormErrors.label}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input
                value={addressForm.addressLine}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, addressLine: e.target.value }))
                }
                placeholder="Calle 123 #45-67"
                aria-invalid={!!addressFormErrors.addressLine}
              />
              {addressFormErrors.addressLine && (
                <p className="text-sm text-destructive">
                  {addressFormErrors.addressLine}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input
                  value={addressForm.city}
                  onChange={(e) =>
                    setAddressForm((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="Bogotá"
                  aria-invalid={!!addressFormErrors.city}
                />
                {addressFormErrors.city && (
                  <p className="text-sm text-destructive">{addressFormErrors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Departamento (opcional)</Label>
                <Input
                  value={addressForm.department}
                  onChange={(e) =>
                    setAddressForm((p) => ({ ...p, department: e.target.value }))
                  }
                  placeholder="Cundinamarca"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Teléfono de contacto (opcional)</Label>
              <Input
                type="tel"
                value={addressForm.phone}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="3001234567"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="addr-default"
                checked={addressForm.isDefault}
                onChange={(e) =>
                  setAddressForm((p) => ({ ...p, isDefault: e.target.checked }))
                }
                className="rounded border-input"
              />
              <Label htmlFor="addr-default" className="font-normal cursor-pointer">
                Usar como dirección predeterminada
              </Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddressDialogOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  createAddressMutation.isPending || updateAddressMutation.isPending
                }
              >
                {editingAddress ? "Guardar" : "Agregar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {quickStatsConfig.map((stat) => {
          const Icon = stat.icon;
          const value = stats[stat.key];
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="shadow-none hover:shadow-md transition-shadow h-full cursor-pointer">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="size-5 md:size-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Órdenes Recientes</CardTitle>
          <Link href="/cuenta/ordenes">
            <Button size="sm" variant="ghost">
              Ver todas
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/cuenta/ordenes/${order.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors border">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      Orden #{order.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeClass(order.status)}
                    >
                      {order.statusLabel}
                    </Badge>
                    <span className="text-sm font-semibold">
                      {currencyFormatter.format(order.total)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">
                No tienes órdenes aún
              </p>
              <Link href="/productos">
                <Button className="mt-4">Empezar a Comprar</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
