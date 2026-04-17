import PageHeader from "#/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <PageHeader title="Account Register" auth />
      <section className="mx-auto my-10 w-full max-w-3xl border border-[#D3DEE8] px-6 py-10 md:my-14 md:px-16 md:py-14">
        <h1 className="text-center text-3xl font-semibold text-[#2A2C30]">
          Opret bruger hos Din Mægler
        </h1>

        <form className="mx-auto mt-10 max-w-md">
          <label className="mb-5 block">
            <span className="text-foreground mb-2 block text-sm">
              Fulde navn
            </span>
            <input
              type="text"
              placeholder="Fulde navn"
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
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm">Bekræft password</span>
            <input
              type="password"
              placeholder="Bekræft password"
              className="w-full border border-[#D3DEE8] bg-white px-4 py-3 text-sm focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="bg-primary w-full px-4 py-3 text-sm font-semibold text-white transition-opacity hover:cursor-pointer hover:opacity-90"
          >
            Opret bruger
          </button>
        </form>
      </section>
    </main>
  );
}
