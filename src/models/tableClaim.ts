import { Base } from "./base";
import { Customer } from "./customer";
import { Table } from "./table";

export const URL = {
  CLAIMED: '/claimed',
  TOGGLE_ACCESS_REQUESTS: '/toggle-access-requests',
  TOGGLE_SEATS_BYPASS: '/claim/:id/toggle-seats-limit',
  ASSISTANCE: '/assistance',
  ASSISTANCE_REQUESTS: '/establishment/:establishmentId/assistance-requests',
  DISMISS_ASSISTANCE_REQUEST: '/establishment/:establishmentId/assistance-requests/:id/dismiss',
}

export enum AssistanceRequestType {
  HELP = 'HELP',
  PAYCASH = 'PAYCASH',
  PAYCARD = 'PAYCARD',
  OTHER = 'OTHER'
}

export interface AssistanceRequest extends Base {
  tableClaimId: number;
  type: AssistanceRequestType;
  message: string;
  isHidden: boolean;
  tableClaim?: TableClaim;
}

export enum TableClaimStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export interface TableClaim extends Base {
  tableId: number;
  customers?: Customer[];
  isOwner: boolean;
  ownerId: number;
  table: Table;
  requestsEnabled: boolean;
  status: TableClaimStatus;
  requestCode: string;
  allowSeatsBypass: boolean;
  assistanceRequests?: AssistanceRequest[];
}