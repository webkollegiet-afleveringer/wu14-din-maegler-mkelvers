import PageHeader from "#/components/page-header";
import { Bolig } from "#/components/bolig";
import type { Property } from "#/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/boliger")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const homes = await context.queryClient.ensureQueryData({
      queryKey: ["all-properties"],
      queryFn: async (): Promise<Property[]> => {
        const res = await fetch("https://dinmaegler.onrender.com/homes");
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        return res.json();
      },
    });
    return { homes };
  },
});

function RouteComponent() {
  const { homes } = Route.useLoaderData();
  const [propertyType, setPropertyType] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(12000000);

  const filteredHomes = useMemo(() => {
    return homes.filter((home) => {
      const matchType = propertyType ? home.type === propertyType : true;
      const matchPrice = home.price <= maxPrice;
      return matchType && matchPrice;
    });
  }, [homes, propertyType, maxPrice]);

  return (
    <main className="flex flex-col">
      <PageHeader title="Boliger til salg" />

      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-12 space-y-8">
          <h2 className="relative pb-2 text-2xl font-semibold text-[#2A2C30]">
            Søg efter dit drømmehus
            <span className="bg-primary absolute bottom-0 left-0 h-1 w-16"></span>
          </h2>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="w-full max-w-xs space-y-2">
              <label
                htmlFor="ejendomstype"
                className="text-foreground text-sm font-medium"
              >
                Ejendomstype
              </label>
              <div className="relative">
                <select
                  id="ejendomstype"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="text-foreground w-full appearance-none rounded-sm border border-[#D3DEE8] bg-white px-4 py-3 pr-10 focus:outline-none"
                >
                  <option value="">Ejendomstype</option>
                  <option value="Villa">Villa</option>
                  <option value="Ejerlejlighed">Ejerlejlighed</option>
                  <option value="Landejendom">Landejendom</option>
                  <option value="Byhus">Byhus</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z"
                      fill="#D3DEE8"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl space-y-2">
              <label className="text-foreground text-sm font-medium">
                Pris-interval
              </label>
              <div className="relative pt-3">
                <input
                  type="range"
                  min="0"
                  max="12000000"
                  step="100000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D3DEE8] hover:cursor-pointer"
                />
                <div className="text-foreground/60 mt-2 flex justify-between text-sm">
                  <span>0 kr.</span>
                  <span>12.000.000 kr.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredHomes.map((property) => (
            <Bolig key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
