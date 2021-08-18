import { Room } from '../room.model';
import { IMovieResponseData } from './IMovieResponseData.model';

export interface IScreeningResponseData {
  date: string;
  id: number;
  movie: IMovieResponseData;
  price: number;
  room: Room;
  status: string;
  time: string;
}
