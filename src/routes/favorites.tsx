import PageHeader from "#/components/page-header";
import { useFavorites } from "#/lib/favorites";
import type { Property } from "#/lib/types";
import {
  formatPrice,
  getEnergyLabelColor,
  matchesPropertySearch,
} from "#/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const favoriteIds = useFavorites((state) => state.ids);
  const removeFavorite = useFavorites((state) => state.remove);
  const [search, setSearch] = useState<string>("");

  const { data: favoriteProperties = [], isLoading } = useQuery({
    queryKey: ["favorite-properties", favoriteIds],
    queryFn: async (): Promise<Property[]> => {
      const responses = await Promise.all(
        favoriteIds.map(async (id: string) => {
          const res = await fetch(
            `https://dinmaegler.onrender.com/homes/${id}`,
          );
          if (!res.ok) {
            throw new Error(`Failed to fetch property with id: ${id}`);
          }
          return res.json() as Promise<Property>;
        }),
      );
      return responses;
    },
    enabled: favoriteIds.length > 0,
  });

  const filteredFavorites = useMemo(() => {
    return favoriteProperties.filter((property: Property) =>
      matchesPropertySearch(property, search),
    );
  }, [favoriteProperties, search]);

  return (
    <main className="flex flex-col">
      <PageHeader title="Mine favoritboliger" />

      <section className="mx-auto w-full max-w-[980px] px-4 py-16">
        <div className="mb-6">
          <div className="relative w-full max-w-[280px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-[#7B7B7B]"
            >
              <path
                d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C12.7352 18 14.3229 17.3692 15.5466 16.3233L19.1114 19.8886C19.5019 20.2791 20.1351 20.2791 20.5256 19.8886C20.9161 19.4981 20.9161 18.8649 20.5256 18.4744L16.9603 14.9096C18.0062 13.6859 18.637 12.0982 18.637 10.363C18.637 6.49697 15.503 3.36296 11.637 3.36296H11ZM11 6C13.6569 6 15.8101 8.15313 15.8101 10.81C15.8101 13.4669 13.6569 15.62 11 15.62C8.34315 15.62 6.19 13.4669 6.19 10.81C6.19 8.15313 8.34315 6 11 6Z"
                fill="currentColor"
              />
            </svg>
            <input
              type="text"
              placeholder="Søg i favoritter"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xs border border-[#D3DEE8] bg-white py-3 pr-4 pl-10 text-sm text-[#2A2C30] placeholder:text-[#7B7B7B] focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-8 border-t border-[#D3DEE8]"></div>

        {isLoading ? (
          <p className="text-foreground py-8">Henter favoritter...</p>
        ) : filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-[#D3DEE8] bg-white py-24 text-center">
            <img
              src="/svgs/favorites.svg"
              alt="Heart"
              className="mb-6 size-16 opacity-30"
            />
            <h2 className="mb-2 text-2xl font-semibold text-[#2A2C30]">
              Ingen favoritter endnu
            </h2>
            <p className="text-foreground max-w-md">
              Du har ikke tilfojet nogen boliger til dine favoritter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFavorites.map((property: Property) => (
              <article
                key={property.id}
                className="mx-auto w-full rounded-xs border border-[#D3DEE8] bg-white p-5 lg:grid lg:grid-cols-[320px_minmax(0,1fr)_230px] lg:items-stretch lg:gap-6 lg:p-6"
              >
                <Link
                  to="/bolig/$id"
                  params={{ id: property.id }}
                  className="block shrink-0"
                >
                  <img
                    src={property.images[0]?.url}
                    alt={property.adress1}
                    className="h-44 w-full rounded-xs object-cover lg:h-full lg:min-h-[176px]"
                  />
                </Link>

                <div className="mt-4 flex min-w-0 flex-col gap-4 lg:mt-0 lg:justify-start">
                  <div className="flex min-w-0 flex-wrap items-start gap-4 lg:flex-nowrap lg:justify-between">
                    <div className="min-w-40 space-y-2">
                      <Link to="/bolig/$id" params={{ id: property.id }}>
                        <h2 className="text-xl leading-tight font-semibold text-[#2A2C30]">
                          {property.adress1}
                          {property.adress2 ? ` ${property.adress2}` : ""}
                        </h2>
                      </Link>
                      <p className="text-base text-[#2A2C30]">
                        {property.postalcode} {property.city}
                      </p>
                      <p className="text-base text-[#2A2C30]">
                        <span className="font-semibold">{property.type}</span>
                        <span className="text-foreground">
                          {" "}
                          • Ejerudgift: {formatPrice(property.cost)} kr.
                        </span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 lg:pt-0.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center text-xl font-semibold text-white ${getEnergyLabelColor(property.energylabel)}`}
                      >
                        {property.energylabel}
                      </div>
                      <span className="text-base whitespace-nowrap text-[#2A2C30]">
                        {property.rooms} værelser • {property.livingspace} m²
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex w-full min-w-0 flex-col gap-6 lg:mt-0 lg:h-full lg:items-end lg:justify-between">
                  <p className="text-2xl font-semibold text-[#2A2C30] lg:text-right">
                    Kr. {formatPrice(property.price)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFavorite(property.id)}
                    className="bg-primary w-full rounded-xs px-6 py-3 text-base font-medium text-white hover:cursor-pointer lg:w-[230px]"
                  >
                    Fjern fra favoritter
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
