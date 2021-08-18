import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _token: string = "";
  private _isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  get token() {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  setStatus(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; admin: string }>(
      `${environment.url}token/generate-token/`,
      {
        email: email,
        password: password,
      }
    );
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(`${environment.url}public/request/sign-up/`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }
}
