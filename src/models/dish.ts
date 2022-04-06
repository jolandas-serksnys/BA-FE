import { Base } from "./base";

export const URL = {
  LIST: "/category/:categoryId/dish",
  CREATE: "/category/:categoryId/dish",
  GET: "/category/:categoryId/dish/:id",
  UPDATE: "/category/:categoryId/dish/:id",
  DELETE: "/category/:categoryId/dish/:id",
  TOGGLE_VISIBILITY: "/category/:categoryId/dish/:id/toggle-visibility",
  TOGGLE_AVAILABILITY: "/category/:categoryId/dish/:id/toggle-availability",
}

export interface Option extends Base {
  title: string;
  description: string;
  price: number;
  addonId: number;
}

export interface Addon extends Base {
  title: string;
  isOptional: boolean;
  options?: Option[];
}

export interface Tag extends Base {
  title: string;
}

export interface Dish extends Base {
  title: string;
  description: string;
  ageRestriction: string;
  isVisible: boolean;
  isAvailable: boolean;
  imageUrl: string;
  categoryId: number;
  basePrice: number;
  addons?: Addon[];
  tags?: Tag[];
}