import { Base } from "./base";
import { Dish } from "./dish";

export const URL = {
  LIST: "/category",
  CREATE: "/category",
  GET: "/category/:id",
  UPDATE: "/category/:id",
  DELETE: "/category/:id",
}

export interface Category extends Base {
  establishmentId?: number;
  title: string;
  description: string;
  isVisible: boolean;
  dishes?: Dish[];
}