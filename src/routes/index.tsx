import AboutUs from "#/components/about-us";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-screen flex-col">
      <section className="w-full">
        {/* *:[grid-area:1/1] is so the image and article occupy the same space */}
        <figure className="isolate grid bg-[#555555] *:[grid-area:1/1]">
          <img
            src="/imgs/hero.webp"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover mix-blend-soft-light"
          />
          <article className="relative flex flex-col items-center justify-center gap-6 px-4 py-8 text-white">
            <h2 className="text-center text-2xl font-bold md:text-4xl">
              Søg efter din drømmebolig
            </h2>
            <div className="w-full max-w-4xl bg-white p-4 text-black md:p-6">
              <h3 className="pb-2 text-base font-medium after:block after:w-8 after:border-b-3 after:border-black md:text-lg">
                Søg blandt 158 boliger til salg i 74 butikker
              </h3>
              <p className="mb-3 text-sm">
                Hvad skal din næste bolig indeholde
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                  className="w-full rounded-xs border border-[#D3DEE8] p-2 placeholder:text-[#7B7B7B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary w-full rounded-xs px-12 py-4 text-white hover:cursor-pointer md:w-auto"
                >
                  Søg
                </button>
              </div>
            </div>
          </article>
        </figure>
      </section>

      <AboutUs />
    </main>
  );
}
