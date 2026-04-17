import type { Property, PropertyType } from "#/lib/types";

export const PRICE_MIN = 0;
export const PRICE_STEP = 100000;

const DKK_FORMATTER = new Intl.NumberFormat("da-DK");

export function formatDkk(value: number): string {
  return `${DKK_FORMATTER.format(value)} kr.`;
}

export function getPropertyTypes(homes: readonly Property[]): PropertyType[] {
  return Array.from(new Set(homes.map((home: Property) => home.type)));
}

export function getPriceCeiling(homes: readonly Property[]): number {
  const highestPrice = homes.reduce((highest: number, home: Property) => {
    return home.price > highest ? home.price : highest;
  }, PRICE_MIN);

  const roundedCeiling = Math.ceil(highestPrice / PRICE_STEP) * PRICE_STEP;
  return Math.max(PRICE_STEP, roundedCeiling);
}

export function isPropertyType(
  value: string,
  propertyTypes: readonly PropertyType[],
): value is PropertyType {
  return propertyTypes.some(
    (propertyType: PropertyType) => propertyType === value,
  );
}

export function getPricePercent(
  value: number,
  min: number,
  max: number,
): number {
  if (max === min) {
    return 0;
  }

  const percent = ((value - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, percent));
}

export function clampMinPrice(value: number, currentMaxPrice: number): number {
  return Math.max(PRICE_MIN, Math.min(value, currentMaxPrice));
}

export function clampMaxPrice(
  value: number,
  currentMinPrice: number,
  ceiling: number,
): number {
  return Math.min(Math.max(value, currentMinPrice), ceiling);
}

export function filterHomes(
  homes: readonly Property[],
  propertyType: PropertyType | "",
  minPrice: number,
  maxPrice: number,
): Property[] {
  return homes.filter((home: Property) => {
    const matchType = propertyType ? home.type === propertyType : true;
    const matchPrice = home.price >= minPrice && home.price <= maxPrice;
    return matchType && matchPrice;
  });
}
