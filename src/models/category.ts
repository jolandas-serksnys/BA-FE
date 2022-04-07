import { Base } from "./base";
import { Dish } from "./dish";

export const URL = {
  LIST: "/establishment/:establishmentId/category",
  CREATE: "/establishment/:establishmentId/category",
  GET: "/establishment/:establishmentId/category/:id",
  UPDATE: "/establishment/:establishmentId/category/:id",
  DELETE: "/establishment/:establishmentId/category/:id",
}

export interface Category extends Base {
  establishmentId?: number;
  title: string;
  description: string;
  isVisible: boolean;
  dishes?: Dish[];
}