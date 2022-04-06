import React from "react";
import { userQueryKey } from "@src/hooks/user";
import { Customer } from "@src/models/customer";
import { Employee } from "@src/models/employee";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextInterface {
  user: Customer | Employee | null;
  isLoading: boolean;
  signIn: (user: Customer | Employee, token?: string) => void;
  signOut: () => void;
  updatedEmployeeData: (user: Employee) => void;
}

const authContextDefaultValues: AuthContextInterface = {
  user: null,
  isLoading: true,
  signIn: (props: any) => ({}),
  signOut: () => ({}),
  updatedEmployeeData: () => ({}),
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaultValues);

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Customer | Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = (user: Customer | Employee, token?: string) => {
    setUser(user);
    localStorage.setItem(`${userQueryKey}-data`, JSON.stringify(user));
    if (token) {
      localStorage.setItem(userQueryKey, token);
    }
  };

  const signOut = () => {
    localStorage.removeItem(userQueryKey);
    localStorage.removeItem(`${userQueryKey}-data`);
    setUser(null);
  };

  const updatedEmployeeData = (user: Employee) => {
    setUser(user);
    localStorage.setItem(`${userQueryKey}-data`, JSON.stringify(user));
  };

  useEffect(() => {
    if (!localStorage.getItem(userQueryKey)) {
      setIsLoading(false);
    } else if (!user) {
      const userDataInStorage = localStorage.getItem(`${userQueryKey}-data`);
      const userTokenInStorage = localStorage.getItem(userQueryKey);

      if (userDataInStorage) {
        const user = JSON.parse(userDataInStorage);
        user.accessToken = userTokenInStorage;

        if (user && user.isEmployee) {
          signIn(user as Employee);
        } else if (user && !user.isEmployee) {
          signIn(user as Customer);
        }
      }

      setIsLoading(false);
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    updatedEmployeeData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};