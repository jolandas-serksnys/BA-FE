import { Base } from "./base";

export const URL = {
  LIST: "/establishment/:establishmentId/table",
  CREATE: "/establishment/:establishmentId/table",
  GET: "/establishment/:establishmentId/table/:id",
  UPDATE: "/establishment/:establishmentId/table/:id",
  DELETE: "/establishment/:establishmentId/table/:id",
  CHECK_AVAILABILITY: "/establishment/:establishmentId/table/:id/check-availability",
  TOGGLE_AVAILABILITY: "/establishment/:establishmentId/table/:id/toggle-availability",
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