import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";
import { IScreeningResponseData } from "../models/responses/IScreeningResponseData.model";
import { Room } from "../models/room.model";
import { Screening } from "../models/screening.model";
import { ScreeningProto } from "../models/screeningProto.model";
import { ScreeningProtoDjango } from "../models/screeningProtoDjango.model";
import { Seat } from "../models/seat.model";

@Injectable({
  providedIn: "root",
})
export class AdminScreeningService {
  constructor(private http: HttpClient) {}

  getScreenings() {
    return this.http
      .get<IScreeningResponseData[]>(
        `${environment.url}admin/request/screenings/`
      )
      .pipe(
        map((screenings: IScreeningResponseData[]) => {
          let screeningsArray: Screening[] = [];
          screenings.forEach((screeningData) => {
            screeningsArray.push(this.processScreeningData(screeningData));
          });
          return screeningsArray;
        })
      );
  }

  addScreening(screening: ScreeningProto | ScreeningProtoDjango) {
    return this.http.post<ScreeningProto>(
      `${environment.url}admin/request/screenings/`,
      screening
    );
  }

  editScreening(screening: ScreeningProto | ScreeningProtoDjango, id: number) {
    return this.http.put<ScreeningProto>(
      `${environment.url}admin/request/screenings/${id}/`,
      screening
    );
  }

  deleteScreening(id: number) {
    return this.http.delete(`${environment.url}admin/request/screenings/${id}/`);
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
