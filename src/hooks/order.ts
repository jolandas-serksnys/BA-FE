import { CustomerOrderStatus, TableOrder, URL } from "@src/models/order";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const orderClaimQueryKey = 'order';
export const activeOrdersQueryKey = 'orders';

export const model = () => ({
  calculatePrice: async (data: any) => {
    return api.post(URL.CALCULATE_PRICE, data).then((response) => response?.data);
  },
  sendOrder: async (data: any) => {
    return api.post(URL.ORDER, data).then((response) => response?.data);
  },
  getTableOrder: async (id: number) => {
    return api.post<TableOrder>(URL.TABLE_ORDER, { id }).then((response) => response?.data);
  },
  cancel: async (id: number) => {
    return api.post<TableOrder>(URL.CANCEL, { id }).then((response) => response?.data);
  },
  active: async () => {
    return api.get<TableOrder[]>(URL.ACTIVE).then((response) => response?.data);
  },
  updateStatus: async (id: number, status: CustomerOrderStatus) => {
    return api.post(generatePath(URL.UPDATE_STATUS, { id: `${id}` }), { status }).then((response) => response?.data);
  },
  toggleTableOrderClaim: async (id: number) => {
    return api.post(generatePath(URL.TOGGLE_TABBLE_ORDER_CLAIM, { id: `${id}` })).then((response) => response?.data);
  },
});

export const useCalculatePrice = (options: any) => {
  return useQuery([orderClaimQueryKey, options], () => model().calculatePrice(options), {
    staleTime: 1000 * 60 * 5
  });
};

export const useGetTableOrder = (id: number) => {
  return useQuery(orderClaimQueryKey, () => model().getTableOrder(id));
};

export const useGetActiveTableOrders = () => {
  return useQuery(activeOrdersQueryKey, model().active);
};

