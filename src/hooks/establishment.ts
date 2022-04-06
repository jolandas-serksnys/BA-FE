import { Establishment } from "@src/models/establishment";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { URL } from "@src/models/establishment";

export const establishmentQueryKey = 'establishment';

export const model = () => ({
  get: async (id: number): Promise<Establishment> => {
    return await api.get(generatePath(URL.GET, { id: String(id) })).then((response) => response?.data);
  }
});

export const useGetEstablishement = (id: number) => {
  return useQuery(establishmentQueryKey, () => model().get(id));
};