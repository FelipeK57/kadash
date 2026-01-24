import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstragramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "../icons/social-media";
import { MercadoPagoIcon, VisaIcon } from "../icons/payment-methods";

export const Footer = () => {
  const socialMediaLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/",
      icon: <YoutubeIcon />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/",
      icon: <TikTokIcon />,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FacebookIcon />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <InstragramIcon />,
    },
  ];

  const paymentMethods = [
    { name: "Mercado Pago", logo: <MercadoPagoIcon /> },
    {
      name: "Visa",
      logo: <VisaIcon />,
    },
    {
      name: "Mastercard",
      logo: (
        <Image
          src="https://www.mastercard.com/content/dam/mccom/shared/header/ma_symbol.svg"
          alt="Mastercard"
          width={48}
          height={32}
          className="h-4 w-auto"
        />
      ),
    },
    {
      name: "Sistecrédito",
      logo: (
        <Image
          src="https://www.sistecredito.com/wp-content/themes/sistecredito/assets/img/logo.svg"
          alt="Sistecrédito"
          width={96}
          height={32}
          className="h-3 w-auto"
        />
      ),
    },
  ];

  return (
    <footer className="flex flex-col border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo y redes sociales */}
          <article className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src={"./logo.svg"}
              alt="Logo"
              width={150}
              height={50}
              className="h-14 w-auto"
            />
            <div className="grid grid-cols-4 w-fit gap-1">
              {socialMediaLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center p-2 hover:opacity-75 transition"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </article>

          {/* Sobre nosotros */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-2">Sobre nosotros</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/quienes-somos"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link
                  href="/tiendas"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  Tiendas
                </Link>
              </li>
            </ul>
          </div>

          {/* Infórmate */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-2">Infórmate</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  Políticas
                </Link>
              </li>
            </ul>
          </div>

          {/* Medios de pago */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold mb-3">Medios de pago</h3>
            <div className="flex flex-row items-center gap-2 w-fit">
              {paymentMethods.map((method) => (
                <div key={method.name}>{method.logo}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary p-1 text-[10px] text-center text-primary-foreground font-semibold">
        &copy; Todos los derechos reservados. Desarollado por SITCOLS
      </div>
    </footer>
  );
};
