import { CustomerOrderStatus, CustomerReceipt, TableOrder, URL } from "@src/models/order";
import api from "@src/utils/api";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const orderClaimQueryKey = 'order';
export const activeOrdersQueryKey = 'orders';
export const customerReceptQueryKey = 'customer-receipt';
export const orderReceptsQueryKey = 'order-receipts';
export const orderReceptsTotalQueryKey = 'order-total';

export const model = () => ({
  calculatePrice: async (dishId: number, options: any[], quantity: number) => {
    return api.post(URL.CALCULATE_PRICE, { dishId, options, quantity }).then((response) => response?.data);
  },
  sendOrder: async (data: any) => {
    return api.post(URL.ORDER, data).then((response) => response?.data);
  },
  getTableOrder: async (id: number) => {
    return api.post<TableOrder>(URL.TABLE_ORDER, { id }).then((response) => response?.data);
  },
  cancel: async (id: number) => {
    return api.post<TableOrder>(generatePath(URL.CANCEL, { id: `${id}` })).then((response) => response?.data);
  },
  active: async (query?: string, dateFrom?: string, dateTo?: string) => {
    return api.post<TableOrder[]>(URL.ACTIVE, { query, dateFrom, dateTo }).then((response) => response?.data);
  },
  updateStatus: async (id: number, status: CustomerOrderStatus) => {
    return api.post(generatePath(URL.UPDATE_STATUS, { id: `${id}` }), { status }).then((response) => response?.data);
  },
  toggleTableOrderClaim: async (id: number) => {
    return api.post(generatePath(URL.TOGGLE_TABBLE_ORDER_CLAIM, { id: `${id}` })).then((response) => response?.data);
  },
  getUserReceipt: async () => {
    return api.get<CustomerReceipt>(URL.USER_RECEIPT).then((response) => response?.data);
  },
  getOrderReceipts: async () => {
    return api.get<CustomerReceipt>(URL.ORDER_RECEIPTS).then((response) => response?.data);
  },
  getOrderReceiptTotal: async () => {
    return api.get<{ total: number }>(URL.ORDER_TOTAL).then((response) => response?.data);
  },
});

export const useCalculatePrice = (dishId: number, options: any[], quantity: number) => {
  return useQuery([orderClaimQueryKey, options, quantity], () => model().calculatePrice(dishId, options, quantity), {
    staleTime: 1000 * 60 * 5
  });
};

export const useGetTableOrder = (id: number) => {
  return useQuery(orderClaimQueryKey, () => model().getTableOrder(id));
};

export const useGetActiveTableOrders = (query?: string, dateFrom?: string, dateTo?: string) => {
  return useQuery(activeOrdersQueryKey, () => model().active(query, dateFrom, dateTo));
};

interface CustomerOrderFilterProps {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useCustomerOrders = ({ query, dateFrom, dateTo }: CustomerOrderFilterProps) => {
  return useMutation(() => model().active(query, dateFrom, dateTo), {
    mutationKey: activeOrdersQueryKey,
  });
};

export const useCustomerReceipt = () => {
  return useQuery(customerReceptQueryKey, () => model().getUserReceipt());
}

export const useOrderRecepts = () => {
  return useQuery(orderReceptsQueryKey, () => model().getOrderReceipts());
}

export const useOrderReceptTotal = () => {
  return useQuery(orderReceptsTotalQueryKey, () => model().getOrderReceiptTotal());
}

