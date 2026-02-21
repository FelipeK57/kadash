import { AuthGuard } from "@/components/auth/auth-guard";

export default function RecuperarContrasenaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard mode="guest">{children}</AuthGuard>;
}
