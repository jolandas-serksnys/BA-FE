import { Employee, URL } from "@src/models/employee";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const employeesQueryKey = 'employees';
export const employeeQueryKey = (id: number) => `employee-${id}`;

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    index: async () => {
      return await api.get<Employee[]>(generatePath(URL.LIST, { establishmentId })).then((response) => response?.data);
    },
    get: async (id: number): Promise<Employee> => {
      return await api.get(generatePath(URL.GET, { establishmentId, id: `${id}` })).then((response) => response?.data);
    },
    update: async (employee: Employee): Promise<Employee> => {
      return await api.put(generatePath(URL.UPDATE, { establishmentId, id: `${employee.id}` }), employee).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId, id: `${id}` })).then((response) => response?.data);
    }
  });
};

export const useGetEmployee = (id: number) => {
  return useQuery(employeeQueryKey(id), () => model().get(id));
};

export const useGetEmployees = () => {
  return useQuery(employeesQueryKey, model().index);
};