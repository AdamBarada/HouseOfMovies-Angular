import { IRolesResponseData } from './IRolesResponseData.model';

export interface IUserResponseData {
  email: string;
  firstName: string;
  lastName: string;
  roles: IRolesResponseData[];
  nbReservations: number
}
