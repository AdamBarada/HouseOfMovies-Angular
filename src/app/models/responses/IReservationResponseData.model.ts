import { Seat } from '../seat.model';
import { IScreeningResponseData } from './IScreeningResponseData.model';
import { IUserResponseData } from './IUserResponseData.model';

export interface IReservationResponseData {
  date: string;
  id: number;
  screening: IScreeningResponseData;
  seats_reserved: [{id: string, seat: Seat }],
  status: string;
  time: string;
  total: number;
  user: IUserResponseData;
}
