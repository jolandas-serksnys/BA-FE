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
  INDEX_ADDONS: '/establishment/:establishmentId/category/:categoryId/dish/:id/addons',
  CREATE_ADDON: '/establishment/:establishmentId/category/:categoryId/dish/:id/addons',
  UPDATE_ADDON: '/establishment/:establishmentId/category/:categoryId/dish/:dishId/addons/:id',
  DELETE_ADDON: '/establishment/:establishmentId/category/:categoryId/dish/:dishId/addons/:id',
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
  isMultiple: boolean;
  options?: Option[];
}

export interface Tag extends Base {
  title: string;
}

export interface Dish extends Base {
  title: string;
  description: string;
  warningLabel: string;
  isVisible: boolean;
  isAvailable: boolean;
  imageUrl: string;
  categoryId: number;
  basePrice: number;
  addons?: Addon[];
  tags?: Tag[];
}