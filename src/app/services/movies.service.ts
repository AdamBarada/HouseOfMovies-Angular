import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";
import { IMovieResponseData } from "../models/responses/IMovieResponseData.model";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private _movies = new BehaviorSubject<Movie[]>([]);

  constructor(private http: HttpClient) {}

  get movies() {
    return this._movies.asObservable();
  }

  getAllMovies() {
    return this.http
      .get<IMovieResponseData[]>(`${environment.url}public/request/movies/`)
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
        }),
        tap((movies) => {
          this._movies.next(movies);
        })
      );
  }

  getComingMovies() {
    return this.http
      .get<IMovieResponseData[]>(
        `${environment.url}public/request/movies/coming-soon/`
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

  getSearchedMovies(searchString: string) {
    if (environment.url.includes("8000")) {
      return this.http
        .get<IMovieResponseData[]>(
          `${environment.url}public/request/movies/`,
          {
            params: {
              search: searchString,
            },
          }
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
    } else {
      return this.http
        .post<IMovieResponseData[]>(
          `${environment.url}public/request/movies/search/`,
          {
            search: searchString,
          }
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

  getTrendingMovies() {
    return this.http
      .get<IMovieResponseData[]>(
        `${environment.url}public/request/movies/trending/`
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

  getMovieById(id: number) {
    return this.http
      .get<IMovieResponseData>(`${environment.url}public/request/movies/${id}/`)
      .pipe(
        map((moviesData) => {
          const movie: Movie = new Movie(
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
          );
          return movie;
        })
      );
  }
}
