import { Base } from './base';
import { Customer } from './customer';
import { TableClaim } from './tableClaim';

export const URL = {
  ORDER: '/order',
  CALCULATE_PRICE: '/order/price',
  TABLE_ORDER: '/order/table',
  CANCEL: '/order/:id/cancel',
  ACTIVE: '/order/active',
  UPDATE_STATUS: '/order/:id/status',
  TOGGLE_TABBLE_ORDER_CLAIM: '/order/table/:id/toggle'
}

export interface OrderAddon extends Base {
  title: string;
  price: number;
}

export enum CustomerOrderStatus {
  CREATED = 'CREATED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export interface CustomerOrder extends Base {
  title: string;
  status: CustomerOrderStatus;
  comment: string;
  price: number;
  totalPrice: number;
  order_addons: OrderAddon[];
  owner: Customer;
}

export interface TableOrder extends Base {
  status: string;
  customer_orders: CustomerOrder[];
  table_claim?: TableClaim;
}