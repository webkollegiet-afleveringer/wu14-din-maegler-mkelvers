import PageHeader from "#/components/page-header";
import { useAuth } from "#/lib/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Fulde navn skal være mindst 2 tegn"),
    email: z.email("Indtast en gyldig e-mailadresse"),
    password: z.string().min(1, "Indtast et password"),
    confirmPassword: z.string().min(1, "Bekræft dit password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords matcher ikke.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setError(null);

    try {
      await register(data.fullName, data.email, data.password);
      await navigate({ to: "/" });
    } catch {
      setError("Oprettelse fejlede. Prøv igen.");
    }
  };

  return (
    <main>
      <PageHeader title="Account Register" auth />
      <section className="mx-auto my-10 w-full max-w-3xl border border-[#D3DEE8] px-6 py-10 md:my-14 md:px-16 md:py-14">
        <h1 className="text-center text-3xl font-semibold text-[#2A2C30]">
          Opret bruger hos Din Mægler
        </h1>

        <form className="mx-auto mt-10 max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">
              Fulde navn
            </span>
            <input
              type="text"
              {...registerField("fullName")}
              placeholder="Fulde navn"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
            {errors.fullName ? (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            ) : null}
          </label>

          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">
              Email adresse
            </span>
            <input
              type="email"
              {...registerField("email")}
              placeholder="Email adresse"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
            {errors.email ? (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Password</span>
            <input
              type="password"
              {...registerField("password")}
              placeholder="Password"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Bekræft password</span>
            <input
              type="password"
              {...registerField("confirmPassword")}
              placeholder="Bekræft password"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </label>

          {error && <p className="mb-5 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-full px-4 py-3 text-sm font-semibold text-white transition-opacity hover:cursor-pointer hover:opacity-90"
          >
            {isSubmitting ? "Opretter bruger..." : "Opret bruger"}
          </button>
        </form>
      </section>
    </main>
  );
}
