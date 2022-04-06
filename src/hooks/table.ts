import { Table, URL } from "@src/models/table";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const tablesQueryKey = 'tables';

export const model = () => ({
  index: async () => {
    return await api.get(URL.LIST).then((response) => response?.data);
  },
  get: async (id: number) => {
    return await api.get(generatePath(URL.GET, { id: `${id}` })).then((response) => response?.data);
  },
  create: async (data: Table) => {
    return await api.post(URL.CREATE, data).then((response) => response?.data);
  },
  update: async (id: number, data: Table) => {
    return await api.put(generatePath(URL.DELETE, { id: `${id}` }), data).then((response) => response?.data);
  },
  delete: async (id: number) => {
    return await api.delete(generatePath(URL.DELETE, { id: `${id}` })).then((response) => response?.data);
  },
  toggleAvailability: async (id: number) => {
    return await api.post(generatePath(URL.TOGGLE_AVAILABILITY, { id: `${id}` })).then((response) => response?.data);
  }
});

export const useGetTables = () => {
  return useQuery(tablesQueryKey, model().index, {
    cacheTime: 0,
    staleTime: 0
  });
};

export const useGetTable = (id: number) => {
  return useQuery(tablesQueryKey, () => model().get(id), {
    cacheTime: 0,
    staleTime: 0
  });
};