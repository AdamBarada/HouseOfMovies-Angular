import { Movie } from './movie.model';
import { Room } from './room.model';

export class Screening {
  constructor(
    public id:number,
    public date: Date,
    public price: number,
    public status: string,
    public movie: Movie,
    public room: Room
  ) {}
}
