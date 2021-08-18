import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IUserResponseData } from "../models/responses/IUserResponseData.model";

@Injectable({
  providedIn: "root",
})
export class AdminUserService {
  constructor(private http: HttpClient) {}

  getLoyalUsers() {
    return this.http.get<IUserResponseData[]>(
      `${environment.url}admin/request/users/loyal-clients/`
    );
  }

  getNumberOfUsers() {
    return this.http.get<{ total: number }>(
      `${environment.url}admin/request/users/number-users/`
    );
  }
}
