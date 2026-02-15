import { AuthGuard } from "@/components/auth/auth-guard";

export default function FavoritosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard mode="protected">{children}</AuthGuard>;
}
