"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, Heart, ShoppingBag, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { useState } from "react";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const productsPerPage = 12;

  const categories = [
    { id: "kits", label: "Kits" },
    { id: "corporal", label: "Cuidado Corporal" },
    { id: "cabello", label: "Cuidado del Cabello" },
    { id: "skincare", label: "Skincare" },
    { id: "complementos", label: "Complementos" },
  ];

  const priceRanges = [
    { id: "0-25", label: "Menos de $25.000" },
    { id: "25-50", label: "$25.000 - $50.000" },
    { id: "50-100", label: "$50.000 - $100.000" },
    { id: "100+", label: "Más de $100.000" },
  ];

  // Mock products (valores determinísticos para evitar errores de hidratación)
  const allProducts = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    image: "/product.jpeg",
    price: 20000 + ((i * 5000) % 100000),
    originalPrice: 30000 + ((i * 7000) % 150000),
    rating: (3 + ((i * 0.3) % 2)).toFixed(1),
    reviews: 20 + ((i * 15) % 200),
  }));

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Ordenar por</h3>
        <Select defaultValue="relevance">
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevancia</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="rating">Mejor Valorados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label
                htmlFor={category.id}
                className="text-sm font-normal cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Rango de Precio</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox id={range.id} />
              <Label
                htmlFor={range.id}
                className="text-sm font-normal cursor-pointer"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
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
              {allProducts.length} productos encontrados
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {currentProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col h-full shadow-none gap-2"
              >
                <CardHeader className="flex flex-col gap-2">
                  <Link href={`/productos/${slugify(product.name)}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform z-0"
                    />
                  </Link>
                  <div className="flex justify-between items-start md:items-center gap-2 w-full">
                    <Link href={`/productos/${slugify(product.name)}`} className="hover:text-primary">
                      <h3 className="font-semibold text-lg line-clamp-2 min-h-3">{product.name}</h3>
                    </Link>
                    <Button className="group" variant="ghost" size="icon-lg">
                      <Heart className="size-6 text-primary group-hover:fill-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                    {product.rating}/5 ({product.reviews})
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text line-through text-muted-foreground">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-bold text-xl text-primary">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full gap-2">
                    <ShoppingBag className="size-4" />
                    Agregar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Paginación */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1,
                )
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </div>
                ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
