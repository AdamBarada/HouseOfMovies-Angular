import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Room } from "../models/room.model";

@Injectable({
  providedIn: "root",
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<Room[]>(`${environment.url}admin/request/rooms/`);
  }
}
