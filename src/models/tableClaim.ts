import { Base } from './base';
import { Customer } from './customer';
import { Table } from './table';

export const URL = {
  CLAIMED: '/claimed',
  TOGGLE_ACCESS_REQUESTS: '/toggle-access-requests',
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
}