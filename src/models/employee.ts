import { User } from "./user";

export const URL = {
  SIGN_IN: "/e/sign-in",
  SIGN_UP: "/e/sign-up",
  UPDATE_ACCOUNT: "/e/update-account",
}

export enum EmployeeRole {
  GENERAL = 'GENERAL',
  WAITER = 'WAITER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  RECEPTIONIS = 'RECEPTIONIS',
  KITCHEN = 'KITCHEN',
  OTHER = 'OTHER'
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