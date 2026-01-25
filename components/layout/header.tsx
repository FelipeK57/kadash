import Image from "next/image";
import { Button } from "../ui/button";
import { Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { MobileMenu } from "./mobile-menu";
import { ShoppingCartDrawer } from "./shopping-cart-drawer";

export const Header = () => {
  return (
    <header className="flex flex-col gap-2 sticky top-0 bg-background z-50">
      <div className="bg-secondary p-2">
        <Image
          src={"./logo.svg"}
          alt="Logo"
          width={150}
          height={50}
          className="mx-auto h-8"
        />
      </div>
      <article className="flex gap-2 px-2">
        <MobileMenu />
        <div className="relative">
          <Input placeholder="Buscar" className="pr-8" />
          <Search className="absolute right-3 top-2.5 size-4 text-primary" />
        </div>
        <Button size="icon" variant="ghost">
          <User className="text-primary" />
        </Button>
        <ShoppingCartDrawer />
      </article>
      <div className="bg-primary p-1 text-xs text-center text-primary-foreground font-semibold">
        Envío gratis en compras mayores a $50.000
      </div>
    </header>
  );
};
