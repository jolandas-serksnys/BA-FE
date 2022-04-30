import { User } from './user';

export const URL = {
  SIGN_IN: '/employee/sign-in',
  SIGN_UP: '/establishment/:establishmentId/employee/sign-up',
  UPDATE_ACCOUNT: '/employee/update-account',
  UPDATE_PASSWORD: '/employee/update-password',
  LIST: '/establishment/:establishmentId/employee',
  GET: '/establishment/:establishmentId/employee/:id',
  UPDATE: '/establishment/:establishmentId/employee/:id',
  DELETE: '/establishment/:establishmentId/employee/:id',
}

export enum EmployeeRole {
  GENERAL = 'general',
  WAITER = 'waiter',
  ADMINISTRATOR = 'administrator',
  KITCHEN = 'kitchenStaff',
  OTHER = 'other'
}

export interface Employee extends User {
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRole;
  establishmentId: number;
}

export interface EmployeeApiResponse {
  user: Employee;
  accessToken: string;
}