import { Employee, URL } from "@src/models/employee";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const employeesQueryKey = 'employees';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    index: async () => {
      return await api.get<Employee[]>(generatePath(URL.LIST, { establishmentId })).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId, id: `${id}` })).then((response) => response?.data);
    }
  });
};

export const useGetEmployees = () => {
  return useQuery(employeesQueryKey, model().index);
};