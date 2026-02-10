"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Category, Product } from "./types";
import ProductCard from "./components/ProductCard";

type Props = {
  products: Product[];
  categories: Category[];
};

export default function ProductsClient({ products, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedCategories = useMemo(() => {
    const categoryParam = searchParams.get("category");
    return categoryParam ? categoryParam.split(",") : [];
  }, [searchParams]);

  const sortValue = searchParams.get("sort") ?? "nuevo";

  const updateQueryParam = (
    key: string,
    value: string,
    options?: { multi?: boolean },
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (options?.multi) {
      const current = params.get(key)?.split(",").filter(Boolean) ?? [];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      if (next.length > 0) {
        params.set(key, next.join(","));
      } else {
        params.delete(key);
      }
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Navegar a la nueva URL con los parámetros actualizados
    router.push(`/productos?${params.toString()}`);
    router.refresh();
  };

  const clearFilters = () => {
    router.push(`/productos`);
    router.refresh();
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Ordenar por</h3>
        <Select
          value={sortValue}
          onValueChange={(value) => updateQueryParam("sort", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="relevance">Relevancia</SelectItem> */}
            <SelectItem value="nuevo">Nuevo</SelectItem>
            <SelectItem value="menor_precio">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="mayor_precio">Precio: Mayor a Menor</SelectItem>
            {/* <SelectItem value="rating">Mejor Valorados</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={String(category.id)}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() =>
                  updateQueryParam("category", category.name, { multi: true })
                }
              />
              <Label
                htmlFor={String(category.id)}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Limpiar Filtros
      </Button>
    </div>
  );

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Botón Filtrar (Solo Mobile) */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4 gap-2">
              <Filter className="size-4" />
              Filtrar por
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Filtros</SheetTitle>
              </div>
            </SheetHeader>
            <div className="flex-1 px-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Sidebar Filtros (Desktop/Tablet) */}
        <aside className="hidden md:block w-full md:w-64 md:sticky md:top-28 md:self-start">
          <FiltersContent />
        </aside>

        {/* Grid de Productos */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Todos los Productos</h1>
            <p className="text-muted-foreground">
              {products.length} productos encontrados
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
