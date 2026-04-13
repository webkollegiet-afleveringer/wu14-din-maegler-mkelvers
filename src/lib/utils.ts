import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface NominatimSearchResult {
  lat: string;
  lon: string;
}

interface NominatimReverseResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: Record<string, unknown>;
}

export interface Coordinates {
  lat: number;
  long: number;
}

export interface StreetMapLocation {
  lat: number;
  long: number;
  displayName: string;
  street: string | null;
  mapUrl: string;
  embedUrl: string;
}

const isNominatimSearchResult = (
  value: unknown,
): value is NominatimSearchResult => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("lat" in value) || !("lon" in value)) {
    return false;
  }

  return typeof value.lat === "string" && typeof value.lon === "string";
};

const isNominatimReverseResult = (
  value: unknown,
): value is NominatimReverseResult => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("lat" in value) || !("lon" in value) || !("display_name" in value)) {
    return false;
  }

  return (
    typeof value.lat === "string" &&
    typeof value.lon === "string" &&
    typeof value.display_name === "string"
  );
};

const getAddressValue = (
  address: Record<string, unknown>,
  key: string,
): string | null => {
  if (!(key in address)) {
    return null;
  }

  const value = address[key];

  return typeof value === "string" ? value : null;
};

export const fetchCoordinates = async (
  query: string,
): Promise<Coordinates | null> => {
  if (!query.trim()) {
    return null;
  }

  try {
    const searchParams = new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "1",
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${searchParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return null;
    }

    const result = data[0];

    if (!isNominatimSearchResult(result)) {
      return null;
    }

    const lat = Number(result.lat);
    const long = Number(result.lon);

    if (Number.isNaN(lat) || Number.isNaN(long)) {
      return null;
    }

    return { lat, long };
  } catch {
    return null;
  }
};

export const fetchStreetMapFromCoordinates = async (
  lat: number,
  long: number,
): Promise<StreetMapLocation | null> => {
  if (!Number.isFinite(lat) || !Number.isFinite(long)) {
    return null;
  }

  try {
    const searchParams = new URLSearchParams({
      lat: String(lat),
      lon: String(long),
      format: "jsonv2",
      addressdetails: "1",
      zoom: "18",
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${searchParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (!isNominatimReverseResult(data)) {
      return null;
    }

    const parsedLat = Number(data.lat);
    const parsedLong = Number(data.lon);

    if (Number.isNaN(parsedLat) || Number.isNaN(parsedLong)) {
      return null;
    }

    const address = data.address;
    const street =
      address && typeof address === "object"
        ? (getAddressValue(address, "road") ??
          getAddressValue(address, "pedestrian") ??
          getAddressValue(address, "residential"))
        : null;

    const minLat = parsedLat - 0.005;
    const maxLat = parsedLat + 0.005;
    const minLong = parsedLong - 0.01;
    const maxLong = parsedLong + 0.01;

    return {
      lat: parsedLat,
      long: parsedLong,
      displayName: data.display_name,
      street,
      mapUrl: `https://www.openstreetmap.org/?mlat=${parsedLat}&mlon=${parsedLong}#map=18/${parsedLat}/${parsedLong}`,
      embedUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${minLong}%2C${minLat}%2C${maxLong}%2C${maxLat}&layer=mapnik&marker=${parsedLat}%2C${parsedLong}`,
    };
  } catch {
    return null;
  }
};
