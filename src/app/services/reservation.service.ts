import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";
import { Reservation } from "../models/reservation.model";
import { IReservationResponseData } from "../models/responses/IReservationResponseData.model";
import { Seat } from "../models/seat.model";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  addReservation(id: number, seatIds: number[]) {
    return this.http
      .post<IReservationResponseData>(
        `${environment.url}user/request/reservations/`,
        {
          screening: id,
          seats_ids: seatIds,
        }
      )
      .pipe(
        map((currentData) => {
          return this.processData(currentData);
        })
      );
  }

  deleteReservation(id: number) {
    return this.http.delete(
      `${environment.url}user/request/reservations/${id}/`
    );
  }

  getUserReservations() {
    return this.http
      .get<IReservationResponseData[]>(
        `${environment.url}user/request/reservations/`
      )
      .pipe(
        map((currentData) => {
          let reservations: Reservation[] = [];
          if (!currentData) return [];
          currentData.forEach((currentData) => {
            let reservation: Reservation = this.processData(currentData);
            reservations.push(reservation);
          });
          return reservations;
        })
      );
  }

  processData(currentData: IReservationResponseData) {
    const dateString = currentData.screening.date.split("-");
    const timeString = currentData.screening.time.split(":");
    let seats: Seat[] = [];
    for (let i = 0; i < currentData.seats_reserved.length; i++) {
      seats.push(
        new Seat(
          currentData.seats_reserved[i].seat.id,
          currentData.seats_reserved[i].seat.row,
          currentData.seats_reserved[i].seat.number,
          currentData.seats_reserved[i].seat.taken,
          false
        )
      );
    }
    const movie: Movie = new Movie(
      +currentData.screening.movie.id,
      currentData.screening.movie.title,
      environment.url + currentData.screening.movie.image,
      environment.url + currentData.screening.movie.landscape,
      currentData.screening.movie.description,
      currentData.screening.movie.director,
      +currentData.screening.movie.duration,
      currentData.screening.movie.trailer,
      currentData.screening.movie.status,
      currentData.screening.movie.cast,
      currentData.screening.movie.categories,
      new Date(currentData.screening.movie.releaseDate),
      currentData.screening.movie.viewers
    );
    let reservation: Reservation = new Reservation(
      new Date(
        +dateString[0],
        +dateString[1] - 1,
        +dateString[2],
        +timeString[0],
        +timeString[1],
        0
      ),
      +currentData.id,
      seats,
      currentData.status,
      currentData.total,
      movie,
      currentData.screening.room.name
    );
    return reservation;
  }
}
