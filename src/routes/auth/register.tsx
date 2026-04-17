import PageHeader from "#/components/page-header";
import { useAuth } from "#/lib/context/authContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords matcher ikke.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(fullName, email, password);
      await navigate({ to: "/" });
    } catch {
      setError("Oprettelse fejlede. Prøv igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHeader title="Account Register" auth />
      <section className="mx-auto my-10 w-full max-w-3xl border border-[#D3DEE8] px-6 py-10 md:my-14 md:px-16 md:py-14">
        <h1 className="text-center text-3xl font-semibold text-[#2A2C30]">
          Opret bruger hos Din Mægler
        </h1>

        <form className="mx-auto mt-10 max-w-md" onSubmit={handleSubmit}>
          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">
              Fulde navn
            </span>
            <input
              type="text"
              placeholder="Fulde navn"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">
              Email adresse
            </span>
            <input
              type="email"
              placeholder="Email adresse"
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

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Bekræft password</span>
            <input
              type="password"
              placeholder="Bekræft password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
            {isSubmitting ? "Opretter bruger..." : "Opret bruger"}
          </button>
        </form>
      </section>
    </main>
  );
}
