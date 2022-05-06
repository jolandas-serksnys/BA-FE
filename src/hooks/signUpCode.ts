import api from "@src/utils/api";
import { SignUpCode, URL } from "@src/models/signUpCode";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const signUpCodesQueryKey = 'sign-up-codes';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    list: async () => {
      return await api.get<SignUpCode[]>(generatePath(URL.LIST, { establishmentId })).then((response) => response?.data);
    },
    create: async (params: Partial<SignUpCode>) => {
      return await api.post<SignUpCode>(generatePath(URL.CREATE, { establishmentId }), params).then((response) => response?.data);
    },
    delete: async (id: number) => {
      return await api.delete(generatePath(URL.DELETE, { establishmentId, id: `${id}` })).then((response) => response?.data);
    }
  });
};

export const useGetSignUpCodes = () => {
  return useQuery(signUpCodesQueryKey, model().list);
};