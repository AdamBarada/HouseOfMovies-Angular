import { Category } from '../category.model';
import { Status } from '../status.model';

export interface IMovieResponseData {
  cast: string;
  categories: Category[];
  description: string;
  director: string;
  duration: string;
  id: string;
  image: string;
  landscape: string;
  releaseDate: string;
  status: Status;
  title: string;
  trailer: string;
  viewers: number;
}
