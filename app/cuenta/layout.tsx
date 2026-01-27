import { AccountLayout } from "@/components/layout/account-layout";

export default function CuentaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AccountLayout>{children}</AccountLayout>;
}
