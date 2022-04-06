import { Base } from "./base";
import { Customer } from "./customer";
import { Table } from "./table";

export const URL = {
  AVAILABILIY: "/table/:id/check",
  CLAIMED: "/table/claimed",
}

export interface TableClaim extends Base {
  tableId: number;
  customers?: Customer[];
  isOwner: boolean;
  ownerId: number;
  table: Table;
}