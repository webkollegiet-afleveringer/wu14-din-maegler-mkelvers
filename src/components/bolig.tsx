import { cn, formatPrice, getEnergyLabelColor } from "#/lib/utils";
import type { Property } from "@/lib/types";
import { Link } from "@tanstack/react-router";

interface BoligFavoriteButton {
  isFavorite: boolean;
  isDisabled: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface BoligProps {
  property: Property;
  favoriteButton?: BoligFavoriteButton;
}

export function Bolig({ property, favoriteButton }: BoligProps) {

  return (
    <div className="overflow-hidden bg-white">
      <Link to="/bolig/$id" params={{ id: property.id }} className="block">
        <figure className="relative">
          <img
            src={property.images[0]?.url}
            alt={property.adress1}
            loading="eager"
            decoding="async"
            className="h-64 w-full object-cover"
          />

          {favoriteButton ? (
            <button
              type="button"
              onClick={favoriteButton.onToggle}
              disabled={favoriteButton.isDisabled}
              aria-label={
                favoriteButton.isFavorite
                  ? "Fjern fra favoritter"
                  : "Tilføj til favoritter"
              }
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white hover:cursor-pointer"
            >
              <img
                src={
                  favoriteButton.isFavorite
                    ? "/svgs/favorites-card-filled.svg"
                    : "/svgs/favorites-card.svg"
                }
                alt="favorites"
                className="size-5"
              />
            </button>
          ) : null}
        </figure>

        <div className="space-y-3 p-6">
          <h2 className="text-xl font-semibold text-[#2A2C30]">
            {property.adress1}
            {property.adress2 ? ` ${property.adress2}` : ""}
          </h2>

          <p className="text-foreground">
            {property.postalcode} {property.city}
          </p>

          <p className="text-foreground border-b border-[#D3DEE8] pb-4">
            <span className="font-semibold">{property.type}</span>
            <span className="text-foreground">
              {" "}
              • Ejerudgift: {formatPrice(property.cost)} kr.
            </span>
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center text-sm font-semibold text-white",
                  getEnergyLabelColor(property.energylabel),
                )}
              >
                {property.energylabel}
              </div>
              <span className="text-foreground">
                {property.rooms} • {property.livingspace} m²
              </span>
            </div>

            <div className="text-right">
              <span className="text-xl font-medium text-gray-900">
                Kr. {formatPrice(property.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
