import { Table, TableAccessCheckResponse, URL } from "@src/models/table";
import api from "@src/utils/api";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const tablesQueryKey = 'tables';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    index: async () => {
      return await api.get(generatePath(URL.LIST, { establishmentId: `${establishmentId}` })).then((response) => response?.data);
    },
    get: async (id: number) => {
      return await api.get(generatePath(URL.GET, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    },
    create: async (data: Table) => {
      return await api.post(generatePath(URL.CREATE, { establishmentId: `${establishmentId}` }), data).then((response) => response?.data);
    },
    update: async (id: number, data: Table) => {
      return await api.put(generatePath(URL.DELETE, { establishmentId: `${establishmentId}`, id: `${id}` }), data).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    },
    checkAvailability: async (id: number) => {
      return await api.get<TableAccessCheckResponse>(generatePath(URL.CHECK_AVAILABILITY, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    },
    toggleAvailability: async (id: number) => {
      return await api.post(generatePath(URL.TOGGLE_AVAILABILITY, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    }
  })
};

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

export const useCheckTable = () => {
  return useMutation(model().checkAvailability);
};