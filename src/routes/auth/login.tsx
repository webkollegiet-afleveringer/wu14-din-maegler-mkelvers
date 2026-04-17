import PageHeader from "#/components/page-header";
import { useAuth } from "#/lib/context/authContext";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      await navigate({ to: "/" });
    } catch {
      setError("Login fejlede. Tjek dine oplysninger og prøv igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHeader title="Account Login" auth />
      <section className="mx-auto my-10 w-full max-w-3xl border border-[#D3DEE8] px-6 py-10 md:my-14 md:px-16 md:py-14">
        <h1 className="text-center text-3xl font-semibold text-[#2A2C30]">
          Log ind på din konto
        </h1>

        <form className="mx-auto mt-10 max-w-md" onSubmit={handleSubmit}>
          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          {error && <p className="mb-5 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-full px-4 py-3 text-sm font-semibold text-white transition-opacity hover:cursor-pointer hover:opacity-90"
          >
            {isSubmitting ? "Logger ind..." : "Log ind"}
          </button>
        </form>

        <div className="mx-auto mt-8 max-w-md">
          <p className="text-sm">Log ind med</p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="bg-[#DD4B39] px-4 py-3 text-sm font-semibold text-white hover:cursor-pointer"
            >
              Google
            </button>
            <button
              type="button"
              className="bg-[#3B5999] px-4 py-3 text-sm font-semibold text-white hover:cursor-pointer"
            >
              Facebook
            </button>
            <button
              type="button"
              className="bg-primary px-4 py-3 text-sm font-semibold text-white hover:cursor-pointer"
            >
              Twitter
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-800">
            Har du ikke en konto?{" "}
            <Link
              to="/auth/register"
              className="text-[#2F80ED] hover:underline"
            >
              Opret bruger.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
