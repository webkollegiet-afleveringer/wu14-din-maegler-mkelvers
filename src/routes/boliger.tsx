import PageHeader from "#/components/page-header";
import { Bolig } from "#/components/bolig";
import type { Property, PropertyType } from "#/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

const PRICE_MIN = 0;
const PRICE_MAX = 12000000;
const PRICE_STEP = 100000;
const PROPERTY_TYPES: PropertyType[] = [
  "Villa",
  "Ejerlejlighed",
  "Landejendom",
  "Byhus",
];

function isPropertyType(value: string): value is PropertyType {
  return PROPERTY_TYPES.some((propertyType) => propertyType === value);
}

function formatDkk(value: number): string {
  return `${value.toLocaleString("da-DK")} kr.`;
}

function getPricePercent(value: number): number {
  return ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
}

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
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [minPrice, setMinPrice] = useState<number>(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);

  const handleMinPriceChange = (value: number): void => {
    const nextMin = Math.min(value, maxPrice);
    setMinPrice(nextMin);
  };

  const handleMaxPriceChange = (value: number): void => {
    const nextMax = Math.max(value, minPrice);
    setMaxPrice(nextMax);
  };

  const filteredHomes = useMemo(() => {
    return homes.filter((home) => {
      const matchType = propertyType ? home.type === propertyType : true;
      const matchPrice = home.price >= minPrice && home.price <= maxPrice;
      return matchType && matchPrice;
    });
  }, [homes, propertyType, minPrice, maxPrice]);

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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setPropertyType("");
                      return;
                    }

                    if (isPropertyType(value)) {
                      setPropertyType(value);
                    }
                  }}
                  className="text-foreground w-full appearance-none rounded-sm border border-[#D3DEE8] bg-white px-4 py-3 pr-10 focus:outline-none"
                >
                  <option value="">Ejendomstype</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
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
              <div className="relative pt-1">
                <div className="relative h-6">
                  <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-[#D3DEE8]" />
                  <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#AFAFAF]"
                    style={{
                      left: `${getPricePercent(minPrice)}%`,
                      right: `${100 - getPricePercent(maxPrice)}%`,
                    }}
                  />

                  <input
                    id="min-price"
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={minPrice}
                    onChange={(e) =>
                      handleMinPriceChange(Number(e.target.value))
                    }
                    className="range-input pointer-events-none absolute top-1/2 right-0 left-0 z-20 w-full -translate-y-1/2"
                    aria-label="Mindste pris"
                  />

                  <input
                    id="max-price"
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={maxPrice}
                    onChange={(e) =>
                      handleMaxPriceChange(Number(e.target.value))
                    }
                    className="range-input pointer-events-none absolute top-1/2 right-0 left-0 z-30 w-full -translate-y-1/2"
                    aria-label="Højeste pris"
                  />
                </div>
                <div className="text-foreground/60 mt-2 flex justify-between text-sm">
                  <span>{formatDkk(minPrice)}</span>
                  <span>{formatDkk(maxPrice)}</span>
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
