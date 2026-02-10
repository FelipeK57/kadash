import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "../types";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card key={product.id} className="flex flex-col h-full shadow-none gap-2">
      <CardHeader className="flex flex-col gap-2">
        <Link href={`/productos/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full rounded-lg aspect-square object-cover hover:scale-105 transition-transform z-0"
          />
        </Link>
        <div className="flex justify-between items-start md:items-center gap-2 w-full">
          <Link
            href={`/productos/${product.slug}`}
            className="hover:text-primary"
          >
            <h3 className="font-semibold text-lg line-clamp-2 min-h-3">
              {product.name}
            </h3>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* <span className="flex items-center gap-1 text-sm">
                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                    {product.rating}/5 ({product.reviews})
                  </span> */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* <span className="text line-through text-muted-foreground">
                      ${product.originalPrice.toLocaleString()}
                    </span> */}
          <span className="font-bold text-xl text-primary">
            ${product.variants[0].price}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 mt-auto">
        <Button className="w-full gap-2">
          <ShoppingBag className="size-4" />
          Agregar
        </Button>
        <Button variant={"outline"} className="w-full gap-2">
          <Heart className="size-4" />
          Favoritos
        </Button>
      </CardFooter>
    </Card>
  );
}
