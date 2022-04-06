import { Base } from "./base";

export const URL = {
  LIST: "/establishment",
  CREATE: "/establishment",
  GET: "/establishment/:id",
  UPDATE: "/establishment/:id",
  DELETE: "/establishment/:id",
}

export interface Establishment extends Base {
  title: string;
  description: string;
  type: string;
}