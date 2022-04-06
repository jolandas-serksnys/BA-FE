import { Base } from "./base";

export const URL = {
  LIST: "/table",
  CREATE: "/table",
  GET: "/table/:id",
  UPDATE: "/table/:id",
  DELETE: "/table/:id",
  TOGGLE_AVAILABILITY: "/table/:id/toggle-availability",
}

export interface Table extends Base {
  displayName: string;
  number: number;
  isAvailable: boolean;
  seats: number;
  establishmentId: number;
  seatsTaken?: number;
}

export interface TableRequest extends Table {
  useId: boolean;
}