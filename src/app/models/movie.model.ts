import { Category } from './category.model';
import { Status } from './status.model';

export class Movie {

  constructor(
    public id: number,
    public title: string,
    public portraitImg: string,
    public landscapeImg: string,
    public description: string,
    public director: string,
    public duration: number,
    public trailer: string,
    public status: Status,
    public cast: String,
    public categories: Category[],
    public releaseDate: Date,
    public viewers: number
  ) {}

}
