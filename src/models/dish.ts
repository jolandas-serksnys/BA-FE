import { Base } from './base';

export const URL = {
  INDEX: '/establishment/:establishmentId/category/:categoryId/dish',
  INDEX_EMPLOYEE: '/establishment/:establishmentId/category/:categoryId/dish/all',
  CREATE: '/establishment/:establishmentId/category/:categoryId/dish',
  GET: '/establishment/:establishmentId/category/:categoryId/dish/:id',
  UPDATE: '/establishment/:establishmentId/category/:categoryId/dish/:id',
  DELETE: '/establishment/:establishmentId/category/:categoryId/dish/:id',
  TOGGLE_VISIBILITY: '/establishment/:establishmentId/category/:categoryId/dish/:id/toggle-visibility',
  TOGGLE_AVAILABILITY: '/establishment/:establishmentId/category/:categoryId/dish/:id/toggle-availability',
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