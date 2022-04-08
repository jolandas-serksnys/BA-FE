import { Base } from './base';

export const URL = {
  CURRENT: '/user',
  REFRESH: '/refresh',
}

export interface User extends Base {
  isEmployee: boolean;
  accessToken: string;
}