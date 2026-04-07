import AboutUs from "#/components/about-us";
import { Bolig } from "#/components/bolig";
import type { Property } from "#/lib/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const properties = await context.queryClient.ensureQueryData({
      queryKey: ["properties"],
      queryFn: async (): Promise<Property[]> => {
        const res = await fetch(
          "https://dinmaegler.onrender.com/homes?_limit=4",
        );
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        return res.json();
      },
    });
    return { properties };
  },
});

function RouteComponent() {
  const { properties } = Route.useLoaderData();

  return (
    <main className="flex h-screen flex-col">
      <section className="w-full">
        {/* *:[grid-area:1/1] is so the image and article occupy the same space */}
        <figure className="isolate grid bg-[#444444] *:[grid-area:1/1]">
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

      <section className="bg-[#F8F8FB]">
        <div className="mx-auto max-w-7xl p-8 px-4 py-16">
          <article className="mx-auto max-w-xl space-y-3 text-center p-12">
            <h2 className="text-4xl font-semibold text-[#263048]">
              Udvalgte Boliger
            </h2>
            <p className="text-foreground">
              There are many variations of passages of Lorem Ipsum available but
              the this in majority have suffered alteration in some
            </p>
          </article>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {properties.map((property: Property) => (
              <Bolig key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-primary rounded-xs px-8 py-3 text-white hover:cursor-pointer">
              Se alle boliger
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
