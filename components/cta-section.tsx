import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CTAButton {
  label: string;
  icon?: ReactNode;
  href: string;
  external?: boolean;
}

interface CTASectionProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  maxWidth?: "3xl" | "4xl" | "5xl";
}

export function CTASection({
  title,
  description,
  buttons,
  maxWidth = "4xl",
}: CTASectionProps) {
  const maxWidthClass = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  }[maxWidth];

  return (
    <section
      className={`bg-primary text-primary-foreground rounded-lg p-8 md:p-12 ${maxWidthClass} mx-auto text-center`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className="mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant="secondary"
            size="lg"
            className="gap-2"
            asChild
          >
            <a
              href={button.href}
              target={button.external ? "_blank" : undefined}
              rel={button.external ? "noopener noreferrer" : undefined}
            >
              {button.icon}
              {button.label}
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
}
