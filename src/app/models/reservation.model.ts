import { Movie } from './movie.model';
import { Seat } from './seat.model';

export class Reservation {
  constructor(
    public date: Date,
    public id: number,
    public seatsReserved: Seat[],
    public status: string,
    public total: number,
    public movie: Movie,
    public roomName: string
  ) {}
}
