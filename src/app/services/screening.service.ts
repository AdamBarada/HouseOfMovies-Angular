import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";
import { IScreeningResponseData } from "../models/responses/IScreeningResponseData.model";
import { Room } from "../models/room.model";
import { Screening } from "../models/screening.model";
import { Seat } from "../models/seat.model";

@Injectable({
  providedIn: "root",
})
export class ScreeningService {
  constructor(private http: HttpClient) {}

  getScreeningDetail(id: number) {
    const extension  = (environment.url.includes("8000")) ? 'public/request/screenings/' : 'user/request/screening/';
    return this.http
      .get<IScreeningResponseData>(
        `${environment.url}${extension}${id}/`
      )
      .pipe(
        map((screeningData) => {
          return this.processScreeningData(screeningData);
        })
      );
  }

  getSeats(id: number) {
    return this.http
      .get<Seat[]>(`${environment.url}user/request/seats/screening/${id}/`)
      .pipe(
        map((currentData) => {
          let seats: Seat[] = [];
          for (let i = 0; i < currentData.length; i++) {
            seats.push(
              new Seat(
                currentData[i].id,
                currentData[i].row,
                currentData[i].number,
                currentData[i].taken,
                false
              )
            );
          }
          return seats;
        })
      );
  }

  getScreenings() {
    return this.http
      .get<IScreeningResponseData[]>(
        `${environment.url}public/request/screenings/`
      )
      .pipe(
        map((screenings: IScreeningResponseData[]) => {
          let screeningsArray: Screening[] = [];
          screenings.forEach(async (screeningData) => {
            const screening = this.processScreeningData(screeningData);
            screeningsArray.push(screening);
          });
          return screeningsArray;
        })
      );
  }

  processScreeningData(screeningData: IScreeningResponseData) {
    const movie: Movie = new Movie(
      +screeningData.movie.id,
      screeningData.movie.title,
      environment.url + screeningData.movie.image,
      environment.url + screeningData.movie.landscape,
      screeningData.movie.description,
      screeningData.movie.director,
      +screeningData.movie.duration,
      screeningData.movie.trailer,
      screeningData.movie.status,
      screeningData.movie.cast,
      screeningData.movie.categories,
      new Date(screeningData.movie.releaseDate),
      screeningData.movie.viewers
    );

    let seats: Seat[] = [];

    if (screeningData?.room?.seats) {
      for (
        let i = 0;
        i < screeningData.room.nbColumns * screeningData.room.nbRows;
        i++
      ) {
        seats.push(
          new Seat(
            screeningData.room.seats[i].id,
            screeningData.room.seats[i].row,
            screeningData.room.seats[i].number,
            screeningData.room.seats[i].taken,
            false
          )
        );
      }
    } else seats = [];

    const room: Room = new Room(
      screeningData.room.id,
      screeningData.room.name,
      screeningData.room.nbColumns,
      screeningData.room.nbRows,
      seats
    );

    const dateString = screeningData.date.split("-");
    const timeString = screeningData.time.split(":");
    const screening: Screening = new Screening(
      +screeningData.id,
      new Date(
        +dateString[0],
        +dateString[1] - 1,
        +dateString[2],
        +timeString[0],
        +timeString[1],
        0
      ),
      +screeningData.price,
      screeningData.status,
      movie,
      room
    );
    return screening;
  }
}
