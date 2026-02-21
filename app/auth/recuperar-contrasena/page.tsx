"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  requestPasswordResetService,
  verifyRecoveryCodeService,
  resetPasswordService,
} from "./services/forgot-password.service";
import { toast } from "sonner";

type Step = 1 | 2 | 3;

export default function RecuperarContrasenaPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors, email: "" };

    if (!email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!validateEmail(email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    setErrors(newErrors);
    if (newErrors.email) return;

    setIsLoading(true);
    try {
      await requestPasswordResetService(email);
      toast.success("Si el correo está registrado, recibirás un código");
      setStep(2);
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al enviar el código");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors, code: "" };

    if (!code || code.length !== 6) {
      newErrors.code = "Ingresa el código de 6 dígitos";
    }

    setErrors(newErrors);
    if (newErrors.code) return;

    setIsLoading(true);
    try {
      await verifyRecoveryCodeService(email, code);
      toast.success("Código verificado correctamente");
      setStep(3);
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Código inválido o expirado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      ...errors,
      password: "",
      confirmPassword: "",
    };

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    if (newErrors.password || newErrors.confirmPassword) return;

    setIsLoading(true);
    try {
      await resetPasswordService(email, code, password);
      toast.success("Contraseña actualizada correctamente");
      router.push("/auth/login");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Error al cambiar la contraseña");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-background flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {step === 1 ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Volver al inicio
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Atrás
          </button>
        )}

        <Card className="shadow-none">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {step === 1 && "Recuperar contraseña"}
              {step === 2 && "Código de verificación"}
              {step === 3 && "Nueva contraseña"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Ingresa tu correo para recibir el código"}
              {step === 2 && `Enviamos un código de 6 dígitos a ${email}`}
              {step === 3 && "Crea una nueva contraseña para tu cuenta"}
            </p>
          </CardHeader>

          <CardContent>
            {step === 1 && (
              <form onSubmit={handleStep1} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar código"}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={code}
                      onChange={setCode}
                    >
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors.code && (
                    <p className="text-sm text-destructive text-center">
                      {errors.code}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? "Verificando..." : "Verificar código"}
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleStep3} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={!!errors.password}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={!!errors.confirmPassword}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Cambiar contraseña"}
                </Button>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O
                </span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿Recordaste tu contraseña? </span>
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-semibold"
              >
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
