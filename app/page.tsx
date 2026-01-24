import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const categories = [
    {
      name: "Kits",
      image: "/category.webp",
      href: "/productos?categoria=kits",
    },
    {
      name: "Cuidado Corporal",
      image: "/category.webp",
      href: "/productos?categoria=cuidado-corporal",
    },
    {
      name: "Cuidado del Cabello",
      image: "/category.webp",
      href: "/productos?categoria=cuidado-cabello",
    },
    {
      name: "Skincare",
      image: "/category.webp",
      href: "/productos?categoria=skincare",
    },
    {
      name: "Complementos",
      image: "/category.webp",
      href: "/productos?categoria=complementos",
    },
  ];

  return (
    <main className="flex flex-col">
      <Image
        src="/hero.webp"
        alt="Hero Image"
        width={1920}
        height={600}
        className="w-full h-auto"
      />
      {/* Categorias */}
      <section className="container mx-auto p-4">
        <h2 className="text-xl font-semibold text-center mb-4">
          Explora nuestras categorías
        </h2>
        <div className="overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-8 pb-2 md:justify-center min-w-max md:min-w-0">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center gap-2 group"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-colors"
                />
                <span className="text-sm font-semibold text-center max-w-32 group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
