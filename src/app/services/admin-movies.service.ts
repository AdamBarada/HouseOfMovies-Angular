import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ChartData } from "../models/chartData.model";
import { Movie } from "../models/movie.model";
import { MovieProto } from "../models/movieProto.model";
import { PieData } from "../models/PieData.model";
import { IMovieResponseData } from "../models/responses/IMovieResponseData.model";

@Injectable({
  providedIn: "root",
})
export class AdminMoviesService {
  constructor(private http: HttpClient) {}

  deleteMovie(id: number) {
    return this.http.delete(`${environment.url}admin/request/movies/${id}/`);
  }

  getMovies() {
    return this.http
      .get<IMovieResponseData[]>(`${environment.url}admin/request/movies/`)
      .pipe(
        map((moviesData) => {
          const movies: Movie[] = [];
          moviesData.forEach((moviesData) => {
            movies.push(
              new Movie(
                +moviesData.id,
                moviesData.title,
                environment.url + moviesData.image,
                environment.url + moviesData.landscape,
                moviesData.description,
                moviesData.director,
                +moviesData.duration,
                moviesData.trailer,
                moviesData.status,
                moviesData.cast,
                moviesData.categories,
                new Date(moviesData.releaseDate),
                +moviesData.viewers
              )
            );
          });
          return movies;
        })
      );
  }

  updateMovie(movie: MovieProto, id: number) {
    return this.http.put(`${environment.url}admin/request/movies/${id}/`, movie);
  }

  addMovie(movie: MovieProto) {
    return this.http.post(`${environment.url}admin/request/movies/`, movie);
  }

  getMoviesDistribution(){
    return this.http
    .get<PieData[]>(`${environment.url}admin/request/movies/per-categories/`);
  }

  getTrendingMovies() {
    return this.http
      .get<IMovieResponseData[]>(
        `${environment.url}admin/request/movies/trending/`
      )
      .pipe(
        map((moviesData) => {
          const movies: Movie[] = [];
          moviesData.forEach((moviesData) => {
            movies.push(
              new Movie(
                +moviesData.id,
                moviesData.title,
                environment.url + moviesData.image,
                environment.url + moviesData.landscape,
                moviesData.description,
                moviesData.director,
                +moviesData.duration,
                moviesData.trailer,
                moviesData.status,
                moviesData.cast,
                moviesData.categories,
                new Date(moviesData.releaseDate),
                +moviesData.viewers
              )
            );
          });
          return movies;
        })
      );
  }

  getUpcomingMovies() {
    return this.http
      .get<IMovieResponseData[]>(
        `${environment.url}admin/request/movies/coming-soon/`
      )
      .pipe(
        map((moviesData) => {
          const movies: Movie[] = [];
          moviesData.forEach((moviesData) => {
            movies.push(
              new Movie(
                +moviesData.id,
                moviesData.title,
                environment.url + moviesData.image,
                environment.url + moviesData.landscape,
                moviesData.description,
                moviesData.director,
                +moviesData.duration,
                moviesData.trailer,
                moviesData.status,
                moviesData.cast,
                moviesData.categories,
                new Date(moviesData.releaseDate),
                +moviesData.viewers
              )
            );
          });
          return movies;
        })
      );
  }
}
