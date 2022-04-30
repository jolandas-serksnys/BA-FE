/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@src/models/customer';
import { Employee, EmployeeRole } from '@src/models/employee';
import React, { ReactNode } from 'react';
import { AuthContext } from '../authContext';

export const withAuthContext = (children: ReactNode, override?: Employee | Customer) => {

  const signIn = (user: Customer | Employee, token?: string) => ({});

  const signOut = () => ({});

  const updatedEmployeeData = (user: Employee) => ({});

  const value = {
    user: {
      firstName: 'Jonas',
      lastName: 'Testauskas',
      email: 'jonas.testauskas@gmail.com',
      role: EmployeeRole.ADMINISTRATOR,
      establishmentId: 1,
      ...override
    },
    isLoading: false,
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