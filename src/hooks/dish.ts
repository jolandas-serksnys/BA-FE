import { Dish, URL } from "@src/models/dish";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const categoriesQueryKey = 'dishes';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    index: async (categoryId: number) => {
      return await api.get<Dish[]>(generatePath(URL.INDEX, {
        establishmentId,
        categoryId: `${categoryId}`
      })).then((response) => response?.data);
    },
    indexEmployee: async (categoryId: number) => {
      return await api.get<Dish[]>(generatePath(URL.INDEX_EMPLOYEE, {
        establishmentId,
        categoryId: `${categoryId}`
      })).then((response) => response?.data);
    },
    create: async (categoryId: number, dish: Dish) => {
      return await api.post<Dish>(generatePath(URL.CREATE, {
        establishmentId,
        categoryId: `${categoryId}`
      }), dish).then((response) => response?.data);
    },
    update: async (categoryId: number, dish: Dish) => {
      return await api.put<Dish>(generatePath(URL.UPDATE, {
        establishmentId,
        categoryId: `${categoryId}`,
        id: `${dish.id}`,
      }), dish).then((response) => response?.data);
    },
    get: async (categoryId: number, id: number) => {
      return await api.get<Dish>(generatePath(URL.GET, {
        establishmentId,
        categoryId: `${categoryId}`,
        id: `${id}`
      })).then((response) => response?.data);
    },
    toggleVisibility: async (categoryId: number, id: number) => {
      return await api.post(generatePath(URL.TOGGLE_VISIBILITY, {
        establishmentId,
        categoryId: `${categoryId}`,
        id: `${id}`
      })).then((response) => response?.data);
    },
    toggleAvailability: async (categoryId: number, id: number) => {
      return await api.post(generatePath(URL.TOGGLE_AVAILABILITY, {
        establishmentId,
        categoryId: `${categoryId}`,
        id: `${id}`
      })).then((response) => response?.data);
    },
  });
};

export const useIndexDishes = (categoryId: number) => {
  return useQuery([categoriesQueryKey, 'category', categoryId], () => model().index(categoryId));
};

export const useIndexDishesEmployee = (categoryId: number) => {
  return useQuery([categoriesQueryKey, 'category', categoryId], () => model().indexEmployee(categoryId));
};

export const useGetDish = (categoryId: number, id: number) => {
  return useQuery([categoriesQueryKey, id], () => model().get(categoryId, id));
};