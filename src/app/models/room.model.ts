import { Seat } from './seat.model';

export class Room {
  constructor(
    public id: number,
    public name: string,
    public nbColumns: number,
    public nbRows: number,
    public seats: Seat[]
  ) {}
}
