import { Establishment } from "@src/models/establishment";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";
import { URL } from "@src/models/establishment";

export const establishmentQueryKey = 'establishment';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    get: async (): Promise<Establishment> => {
      return await api.get(generatePath(URL.GET, { id: establishmentId })).then((response) => response?.data);
    }
  });
};

export const useGetEstablishement = () => {
  return useQuery(establishmentQueryKey, () => model().get());
};