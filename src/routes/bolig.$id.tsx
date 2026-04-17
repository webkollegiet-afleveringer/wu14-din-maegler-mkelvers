import type { Property } from "#/lib/types";
import { fetchStreetMapFromCoordinates } from "#/lib/utils";
import { useAuth } from "#/lib/context/authContext";
import { useToast } from "#/lib/context/toastContext";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Route = createFileRoute("/bolig/$id")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { id } = params;
    const property = await context.queryClient.ensureQueryData({
      queryKey: ["property", id],
      queryFn: async (): Promise<Property> => {
        const res = await fetch(`https://dinmaegler.onrender.com/homes/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch property with id: ${id}`);
        }
        return res.json();
      },
    });
    const mapLocation = await fetchStreetMapFromCoordinates(
      property.lat,
      property.long,
    );

    return { property, mapLocation };
  },
});

type GalleryView = "images" | "layers" | "location";

function formatPrice(price: number): string {
  return price.toLocaleString("da-DK");
}

type GalleryPreview =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "map";
      src: string;
      title: string;
    };

type PrimaryImage = {
  src: string;
  alt: string;
};

function getPrimaryImage(property: Property): PrimaryImage {
  const [firstImage] = property.images;

  if (firstImage) {
    return {
      src: firstImage.url,
      alt: firstImage.name,
    };
  }

  return {
    src: "/imgs/hero.webp",
    alt: `Billede af ${property.adress1}`,
  };
}

function getPreviewImage(
  property: Property,
  view: GalleryView,
  mapEmbedUrl: string | null,
): GalleryPreview {
  const primaryImage = getPrimaryImage(property);

  if (view === "layers" && property.floorplan?.url) {
    return {
      type: "image",
      src: property.floorplan.url,
      alt: `Plantegning for ${property.adress1}`,
    };
  }

  if (view === "location") {
    return {
      type: "map",
      src:
        mapEmbedUrl ??
        `https://www.openstreetmap.org/export/embed.html?bbox=${property.long - 0.01}%2C${property.lat - 0.005}%2C${property.long + 0.01}%2C${property.lat + 0.005}&layer=mapnik&marker=${property.lat}%2C${property.long}`,
      title: `Kort over ${property.city}`,
    };
  }

  return {
    type: "image",
    src: primaryImage.src,
    alt: primaryImage.alt,
  };
}

function RouteComponent() {
  const { property, mapLocation } = Route.useLoaderData();
  const { user, isAuthenticated, isUpdatingFavorites, updateFavorites } =
    useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<GalleryView | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const favoriteIds = user?.homes ?? [];
  const isFavorite = favoriteIds.includes(property.id);

  const galleryActions: {
    view: GalleryView;
    label: string;
    icon: string;
  }[] = [
    { view: "images", label: "Billeder", icon: "/svgs/images.svg" },
    { view: "layers", label: "Plantegning", icon: "/svgs/layers.svg" },
    { view: "location", label: "Placering", icon: "/svgs/location_white.svg" },
  ];

  const activePreview = activeView
    ? getPreviewImage(property, activeView, mapLocation?.embedUrl ?? null)
    : null;
  const primaryImage = getPrimaryImage(property);
  const canRenderPortal = typeof document !== "undefined";

  useEffect(() => {
    if (!activeView) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveView(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeView]);

  const handleToggleFavorite = async (): Promise<void> => {
    if (!isAuthenticated) {
      return;
    }

    const nextHomes = isFavorite
      ? favoriteIds.filter((id: string) => id !== property.id)
      : [...favoriteIds, property.id];

    try {
      await updateFavorites(nextHomes);
      await queryClient.invalidateQueries({
        queryKey: ["favorite-properties"],
      });
    } catch {
      addToast("Kunne ikke opdatere favoritter");
    }
  };

  useEffect(() => {
    if (!activeView) {
      return;
    }

    closeButtonRef.current?.focus();
  }, [activeView]);

  return (
    <>
      <main className="bg-white text-gray-800">
        <figure>
          <img
            src={primaryImage.src}
            alt={primaryImage.alt}
            className="aspect-2/1 w-full object-cover"
          />
        </figure>

        <div className="container mx-auto max-w-5xl px-4 py-12">
          <div className="mb-6 flex flex-col items-start justify-between border-b border-[#D3DEE8] pb-8 md:flex-row md:items-center">
            <div>
              <h1 className="text-primary text-xl font-bold">
                {property.adress1}
              </h1>
              <p className="text-primary font-semibold">
                {property.postalcode} {property.city}
              </p>
            </div>

            <div className="flex items-center gap-6">
              {galleryActions.map((item) => (
                <button
                  key={item.view}
                  type="button"
                  className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  onClick={() => setActiveView(item.view)}
                  aria-label={`Vis ${item.label.toLowerCase()}`}
                >
                  <img src={item.icon} alt="" aria-hidden="true" />
                </button>
              ))}

              {isAuthenticated ? (
                <button
                  type="button"
                  className="hover:cursor-pointer"
                  onClick={() => {
                    void handleToggleFavorite();
                  }}
                  disabled={isUpdatingFavorites}
                  aria-label={
                    isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"
                  }
                >
                  <img
                    src={
                      isFavorite
                        ? "/svgs/favorites-filled.svg"
                        : "/svgs/favorites.svg"
                    }
                    alt="favorites"
                  />
                </button>
              ) : null}
            </div>

            <div className="text-primary flex flex-col text-2xl font-bold">
              <span className="md:place-self-end">Kr.</span>
              {formatPrice(property.price)}
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
            <table className="w-full">
              <tbody className="[&_tr:not(:first-child)_td]:pt-2">
                <tr>
                  <td>Sagsnummer:</td>
                  <td className="text-right">{property.id}</td>
                </tr>
                <tr>
                  <td>Boligareal:</td>
                  <td className="text-right">{property.livingspace} m²</td>
                </tr>
                <tr>
                  <td>Grundareal:</td>
                  <td className="text-right">{property.lotsize || "-"} m²</td>
                </tr>
                <tr>
                  <td>Rum/værelser:</td>
                  <td className="text-right">{property.rooms}</td>
                </tr>
                <tr>
                  <td>Antal Plan:</td>
                  <td className="text-right">-</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="[&_tr:not(:first-child)_td]:pt-2">
                <tr>
                  <td>Kælder:</td>
                  <td className="text-right">{property.basementsize || "-"}</td>
                </tr>
                <tr>
                  <td>Byggeår:</td>
                  <td className="text-right">{property.built}</td>
                </tr>
                <tr>
                  <td>Ombygget:</td>
                  <td className="text-right">{property.remodel || "-"}</td>
                </tr>
                <tr>
                  <td>Energimærke:</td>
                  <td className="text-right">{property.energylabel}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="[&_tr:not(:first-child)_td]:pt-2">
                <tr>
                  <td>Udbetaling:</td>
                  <td className="text-right">
                    Kr. {formatPrice(property.payment)}
                  </td>
                </tr>
                <tr>
                  <td>Brutto ex ejerudgift:</td>
                  <td className="text-right">
                    Kr. {formatPrice(property.gross)}
                  </td>
                </tr>
                <tr>
                  <td>Netto ex ejerudgift:</td>
                  <td className="text-right">
                    Kr. {formatPrice(property.netto)}
                  </td>
                </tr>
                <tr>
                  <td>Ejerudgifter:</td>
                  <td className="text-right">
                    Kr. {formatPrice(property.cost)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold text-[#2A2C30]">
                Beskrivelse
              </h2>
              <div className="space-y-4 leading-relaxed whitespace-pre-line text-gray-600">
                {property.description}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-[#2A2C30]">
                Ansvalig mægler
              </h2>
              <div className="flex flex-col gap-6 border border-gray-200 p-6 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <div className="relative aspect-square">
                    <img
                      src={property.agent.image.url}
                      alt={property.agent.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-0 flex gap-4 bg-[#162A41] px-2 py-1 text-white">
                      <img src="/svgs/instagram.svg" alt="instagram" />
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.89509 5.32356H0.212054V16.3838H3.89509V5.32356ZM4.12946 1.90838C4.1183 0.825788 3.33705 -0.000105143 2.07589 -0.000105143C0.825893 -0.000105143 0 0.825788 0 1.90838C0 2.96864 0.792411 3.81686 2.03125 3.81686H2.05357C3.33705 3.81686 4.14063 2.96864 4.12946 1.90838ZM17.1429 10.0445C17.1429 6.65168 15.3348 5.06686 12.9129 5.06686C10.9263 5.06686 10.0558 6.17177 9.57589 6.9307H9.59821V5.32356H5.92634C5.92634 5.32356 5.97098 6.3615 5.92634 16.3838H9.59821V10.2119C9.59821 9.87713 9.6317 9.55347 9.72098 9.30793C9.98884 8.64945 10.5915 7.96864 11.6071 7.96864C12.9353 7.96864 13.471 8.98427 13.471 10.4686V16.3838H17.1429V10.0445Z"
                          fill="white"
                        />
                      </svg>

                      <img src="/svgs/skype.svg" alt="skype" />
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col justify-center sm:w-1/2">
                  <h3 className="text-lg font-bold text-[#162A41]">
                    {property.agent.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-400">
                    {property.agent.title}
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3952 13.1277C17.1707 13.1277 15.9684 12.9362 14.8291 12.5597C14.2708 12.3693 13.5845 12.544 13.2438 12.8939L10.995 14.5915C8.38703 13.1994 6.78057 11.5934 5.40745 9.00505L7.0551 6.81484C7.48318 6.38734 7.63672 5.76286 7.45276 5.17693C7.07464 4.03161 6.88255 2.8299 6.88255 1.6049C6.8826 0.719948 6.16266 0 5.27776 0H1.60484C0.719948 0 0 0.719948 0 1.60484C0 11.7481 8.25198 20 18.3952 20C19.2801 20 20.0001 19.2801 20.0001 18.3952V14.7325C20 13.8477 19.2801 13.1277 18.3952 13.1277Z"
                          fill="#162A41"
                        />
                      </svg>

                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_305_93)">
                          <path
                            d="M7.29199 15.6768V19.5418C7.29199 19.8118 7.46532 20.0509 7.72199 20.1359C7.78616 20.1567 7.85199 20.1667 7.91699 20.1667C8.11199 20.1667 8.30032 20.0751 8.42032 19.9118L10.6812 16.8351L7.29199 15.6768Z"
                            fill="#162A41"
                          />
                          <path
                            d="M19.7375 1.11591C19.5459 0.980074 19.2942 0.961741 19.0859 1.07091L0.335871 10.8626C0.114204 10.9784 -0.0166296 11.2151 0.00170373 11.4642C0.0208704 11.7142 0.186704 11.9276 0.422537 12.0084L5.63504 13.7901L16.7359 4.29841L8.14587 14.6476L16.8817 17.6334C16.9467 17.6551 17.015 17.6667 17.0834 17.6667C17.1967 17.6667 17.3092 17.6359 17.4084 17.5759C17.5667 17.4792 17.6742 17.3167 17.7017 17.1342L19.9934 1.71757C20.0275 1.48424 19.9292 1.25257 19.7375 1.11591Z"
                            fill="#162A41"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_305_93">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span className="truncate">{property.agent.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {activePreview && canRenderPortal
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2C30]/90 p-4"
              role="presentation"
              onClick={() => setActiveView(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Ejendomsvisning"
                className="w-full max-w-5xl p-4 md:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                {activePreview.type === "image" ? (
                  <img
                    src={activePreview.src}
                    alt={activePreview.alt}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <iframe
                    src={activePreview.src}
                    title={activePreview.title}
                    className="aspect-video w-full border-0"
                    loading="lazy"
                  />
                )}

                <div className="mt-4 flex items-center justify-center gap-8">
                  {galleryActions.map((item) => (
                    <button
                      key={item.view}
                      type="button"
                      className={
                        activeView === item.view
                          ? "opacity-100"
                          : "opacity-70 transition-opacity hover:opacity-100"
                      }
                      onClick={() => setActiveView(item.view)}
                      aria-label={`Vis ${item.label.toLowerCase()}`}
                      aria-pressed={activeView === item.view}
                    >
                      <img src={item.icon} alt="" aria-hidden="true" />
                    </button>
                  ))}
                  {isAuthenticated ? (
                    <button
                      type="button"
                      className="opacity-70 transition-opacity hover:opacity-100"
                      onClick={() => {
                        void handleToggleFavorite();
                      }}
                      disabled={isUpdatingFavorites}
                      aria-label={
                        isFavorite
                          ? "Fjern fra favoritter"
                          : "Tilføj til favoritter"
                      }
                    >
                      <img
                        src={
                          isFavorite
                            ? "/svgs/favorites-filled.svg"
                            : "/svgs/favorites.svg"
                        }
                        alt="favorites"
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
