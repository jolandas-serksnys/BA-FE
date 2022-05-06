import { Establishment , URL } from "@src/models/establishment";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";


export const establishmentQueryKey = 'establishment';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    get: async (): Promise<Establishment> => {
      return await api.get(generatePath(URL.GET, { id: establishmentId })).then((response) => response?.data);
    },
    update: async (establishment: Establishment): Promise<Establishment> => {
      return await api.put(generatePath(URL.UPDATE, { id: establishmentId }), establishment).then((response) => response?.data);
    },
  });
};

export const useGetEstablishement = () => {
  return useQuery(establishmentQueryKey, () => model().get());
};