import { useAuth } from "@src/contexts/authContext";
import { CustomerApiResponse, URL as CustomerURL } from "@src/models/customer";
import { Employee, URL as EmployeeURL } from "@src/models/employee";
import { URL as UserURL } from "@src/models/user";
import api from "@src/utils/api";
import { useMutation, useQuery } from "react-query";
import { generatePath, useNavigate } from 'react-router-dom';

export const userQueryKey = 'user';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID;

  return ({
    getCurrentUser: async () => {
      return api.get(UserURL.CURRENT).then((response) => response?.data);
    },
    signInCustomer: async (data: any): Promise<CustomerApiResponse> => {
      return api.post(generatePath(CustomerURL.SIGN_IN, { establishmentId }), data).then((response) => response?.data);
    },
    signInEmployee: async (data: any) => {
      return api.post(EmployeeURL.SIGN_IN, data).then((response) => response?.data);
    },
    signUpEmployee: async (data: any) => {
      return api.post(generatePath(EmployeeURL.SIGN_UP, { establishmentId }), data).then((response) => response?.data);
    },
    employeeUpdateAccount: async (data: any): Promise<Employee> => {
      return api.post(EmployeeURL.UPDATE_ACCOUNT, data).then((response) => response?.data);
    },
    employeeUpdatePassword: async (data: any): Promise<Employee> => {
      return api.post(EmployeeURL.UPDATE_PASSWORD, data).then((response) => response?.data);
    },
  });
};


export const useGetCurrentUser = () => {
  return useQuery(userQueryKey, model().getCurrentUser);
};

export const useSignInCustomer = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return useMutation(model().signInCustomer, {
    onSuccess: (data) => {
      if (data) {
        const { user, accessToken } = data;
        if (user && accessToken) {
          signIn(user, accessToken);
          navigate('/menu');
        }
      }
    }
  });
};

export const useSignInEmployee = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return useMutation(model().signInEmployee, {
    onSuccess: (data) => {
      if (data) {
        const { user, accessToken } = data;
        if (user && accessToken) {
          signIn(user, accessToken);
          navigate('/e');
        }
      }
    }
  });
};

export const useSignUpEmployee = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return useMutation(model().signUpEmployee, {
    onSuccess: (data) => {
      if (data && data.user && data.accessToken) {
        const { user, accessToken } = data;

        signIn(user, accessToken);
        navigate('/e');
      }
    }
  });
};