import { Category, URL } from "@src/models/category";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const categoriesQueryKey = 'categories';
export const categoryQueryKey = (id: number) => `category-${id}`;

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    index: async () => {
      return await api.get<Category[]>(generatePath(URL.LIST, { establishmentId })).then((response) => response?.data);
    },
    get: async (id: number) => {
      return await api.get<Category>(generatePath(URL.GET, { establishmentId, id: `${id}` })).then((response) => response?.data);
    },
    create: async (data: Category) => {
      return await api.post(generatePath(URL.CREATE, { establishmentId }), data).then((response) => response?.data);
    },
    update: async (id: number, data: Category) => {
      return await api.put(generatePath(URL.DELETE, { establishmentId, id: `${id}` }), data).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId, id: `${id}` })).then((response) => response?.data);
    }
  });
};

export const useGetCategories = () => {
  return useQuery(categoriesQueryKey, model().index);
};

export const useGetCategory = (id: number) => {
  return useQuery(categoryQueryKey(id), async () => model().get(id));
};