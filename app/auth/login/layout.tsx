import { AuthGuard } from "@/components/auth/auth-guard";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard mode="guest">{children}</AuthGuard>;
}
