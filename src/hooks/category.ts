import { Category, URL } from "@src/models/category";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const categoriesQueryKey = 'categories';
export const categoryQueryKey = (id: number) => `category-${id}`;

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    index: async () => {
      return await api.get<Category[]>(generatePath(URL.LIST, { establishmentId: `${establishmentId}` })).then((response) => response?.data);
    },
    get: async (id: number) => {
      return await api.get<Category>(generatePath(URL.GET, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    },
    create: async (data: Category) => {
      return await api.post(generatePath(URL.CREATE, { establishmentId: `${establishmentId}` }), data).then((response) => response?.data);
    },
    update: async (id: number, data: Category) => {
      return await api.put(generatePath(URL.DELETE, { establishmentId: `${establishmentId}`, id: `${id}` }), data).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId: `${establishmentId}`, id: `${id}` })).then((response) => response?.data);
    }
  });
};

export const useGetCategories = () => {
  return useQuery(categoriesQueryKey, model().index);
};

export const useGetCategory = (id: number) => {
  return useQuery(categoryQueryKey(id), async () => model().get(id));
};