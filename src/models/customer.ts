import { User } from "./user";

export const URL = {
  SIGN_IN: '/sign-in'
}

export interface Customer extends User {
  displayName: string;
}

export interface CustomerApiResponse {
  user: Customer;
  accessToken: string;
}