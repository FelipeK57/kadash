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
import type { ProductsPagination } from "./services/product.service";
import ProductCard from "./components/ProductCard";

type Props = {
  products: Product[];
  categories: Category[];
  pagination: ProductsPagination;
};

export default function ProductsClient({
  products,
  categories,
  pagination,
}: Props) {
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
    options?: { multi?: boolean; resetPage?: boolean },
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (options?.resetPage !== false) {
      params.delete("page");
    }

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

    router.push(`/productos?${params.toString()}`);
    router.refresh();
  };

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
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
              {pagination.total} productos encontrados
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.page > 1) {
                        goToPage(pagination.page - 1);
                      }
                    }}
                    aria-disabled={pagination.page <= 1}
                    className={
                      pagination.page <= 1
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    const current = pagination.page;
                    return (
                      p === 1 ||
                      p === pagination.totalPages ||
                      Math.abs(p - current) <= 1
                    );
                  })
                  .reduce<number[]>((acc, p) => {
                    const last = acc[acc.length - 1];
                    if (last !== undefined && p - last > 1) acc.push(-1);
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === -1 ? (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(p);
                          }}
                          isActive={p === pagination.page}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.page < pagination.totalPages) {
                        goToPage(pagination.page + 1);
                      }
                    }}
                    aria-disabled={pagination.page >= pagination.totalPages}
                    className={
                      pagination.page >= pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </main>
  );
}
