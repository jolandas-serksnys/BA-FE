import { Base } from "./base";
import { EmployeeRole } from "./employee";

export const URL = {
  LIST: '/establishment/:establishmentId/sign-up-code',
  CREATE: '/establishment/:establishmentId/sign-up-code',
  DELETE: '/establishment/:establishmentId/sign-up-code/:id',
}

export interface SignUpCode extends Base {
  code: string;
  establishmentId: number;
  isClaimed: boolean;
  role: EmployeeRole;
}