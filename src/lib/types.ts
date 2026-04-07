export type EnergyLabel = 
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"

export type PropertyType = 
  | "Villa"
  | "Ejerlejlighed"
  | "Landejendom"
  | "Byhus"

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

export interface PropertyImage {
  name: string;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: ImageFormat;
  };
  id: string;
}

export interface AgentImage {
  name: string;
  size: number;
  url: string;
  formats: {
    thumbnail: ImageFormat;
  };
  width: number;
  height: number;
  id: string;
}

export interface Agent {
  name: string;
  title: string;
  phone: string;
  email: string;
  image: AgentImage;
  description: string;
  id: string;
}

export interface User {
  confirmed: boolean;
  blocked: boolean;
  homes: string[];
  username: string;
  email: string;
  role: string;
  id: string;
}

export interface FloorPlan {
  name: string;
  size: number;
  url: string;
  formats: {
    thumbnail: ImageFormat;
  };
  width: number;
  height: number;
  id: string;
}

export interface Property {
  energylabel: EnergyLabel;
  type: PropertyType;
  images: PropertyImage[];
  gross: number;
  payment: number;
  price: number;
  city: string;
  cost: number;
  basementsize?: number;
  lotsize?: number;
  netto: number;
  postalcode: number;
  adress1: string;
  adress2?: string;
  description: string;
  livingspace: number;
  agent: Agent;
  rooms: string;
  built: number;
  remodel?: number;
  floorplan?: FloorPlan;
  lat: number;
  long: number;
  users: User[];
  id: string;
}
