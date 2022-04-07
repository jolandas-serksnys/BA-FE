import { Dish, URL } from "@src/models/dish";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const categoriesQueryKey = 'dishes';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    index: async (categoryId: number) => {
      return await api.get<Dish[]>(generatePath(URL.LIST, { establishmentId: `${establishmentId}`, categoryId: `${categoryId}` })).then((response) => response?.data);
    },
    get: async (categoryId: number, id: number) => {
      return await api.get<Dish>(generatePath(URL.GET, { establishmentId: `${establishmentId}`, categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
    },
    toggleVisibility: async (categoryId: number, id: number) => {
      return await api.post(generatePath(URL.TOGGLE_VISIBILITY, { establishmentId: `${establishmentId}`, categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
    },
    toggleAvailability: async (categoryId: number, id: number) => {
      return await api.post(generatePath(URL.TOGGLE_AVAILABILITY, { establishmentId: `${establishmentId}`, categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
    },
  });
};

export const useGetDishes = (categoryId: number) => {
  return useQuery([categoriesQueryKey, 'category', categoryId], () => model().index(categoryId));
};

export const useGetDish = (categoryId: number, id: number) => {
  return useQuery([categoriesQueryKey, id], () => model().get(categoryId, id));
};