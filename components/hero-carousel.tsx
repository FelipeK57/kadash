"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  { src: "/hero.webp", alt: "Hero 1" },
  { src: "/hero2.webp", alt: "Hero 2" },
] as const;

const AUTO_PLAY_INTERVAL_MS = 10000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((nextIndex: number) => {
    setIndex((prev) => (nextIndex + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(index + 1);
  }, [index, goTo]);

  const goPrev = useCallback(() => {
    goTo(index - 1);
  }, [index, goTo]);

  useEffect(() => {
    const id = setInterval(goNext, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-1920/700 w-full bg-muted">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              i === index ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1920}
              height={700}
              className="w-full h-full object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Botones anterior / siguiente */}
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full shadow-md hover:bg-background/90"
        onClick={goPrev}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full shadow-md hover:bg-background/90"
        onClick={goNext}
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="size-5" />
      </Button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "size-2 rounded-full transition-colors",
              i === index
                ? "bg-primary"
                : "bg-white/60 hover:bg-white/80"
            )}
            aria-label={`Ir a imagen ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
