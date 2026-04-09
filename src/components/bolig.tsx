import { cn } from "#/lib/utils";
import type { Property } from "@/lib/types";
import { Link } from "@tanstack/react-router";

export function Bolig({ property }: { property: Property }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("da-DK").format(price);
  };

  const getEnergyLabelColor = (label: string) => {
    switch (label) {
      case "A":
        return "bg-[#10AC84]";
      case "B":
        return "bg-[#F2C94C]";
      case "C":
        return "bg-[#F2994A]";
      case "D":
        return "bg-[#EB5757]";
      default:
        return "bg-gray-500";
    }
  };

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
        </figure>

        <div className="space-y-3 p-6">
          <h2 className="text-xl font-semibold text-[#2A2C30]">
            {property.adress1}
            {property.adress2 ? ` ${property.adress2}` : ""}
          </h2>

          <p className="text-foreground">
            {property.postalcode} {property.city}
          </p>

          <p className="border-b border-[#D3DEE8] pb-4 text-foreground">
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
