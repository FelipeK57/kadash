import { AccountLayout } from "@/components/layout/account-layout";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function CuentaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <AccountLayout>{children}</AccountLayout>
    </AuthGuard>
  );
}
