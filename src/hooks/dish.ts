import { Dish, URL } from "@src/models/dish";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const categoriesQueryKey = 'dishes';

export const model = () => ({
  index: async (categoryId: number) => {
    return await api.get<Dish[]>(generatePath(URL.LIST, { categoryId: `${categoryId}` })).then((response) => response?.data);
  },
  get: async (categoryId: number, id: number) => {
    return await api.get<Dish>(generatePath(URL.GET, { categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
  },
  toggleVisibility: async (categoryId: number, id: number) => {
    return await api.post(generatePath(URL.TOGGLE_VISIBILITY, { categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
  },
  toggleAvailability: async (categoryId: number, id: number) => {
    return await api.post(generatePath(URL.TOGGLE_AVAILABILITY, { categoryId: `${categoryId}`, id: `${id}` })).then((response) => response?.data);
  },
})

export const useGetDishes = (categoryId: number) => {
  return useQuery([categoriesQueryKey, 'category', categoryId], () => model().index(categoryId));
};

export const useGetDish = (categoryId: number, id: number) => {
  return useQuery([categoriesQueryKey, id], () => model().get(categoryId, id));
};