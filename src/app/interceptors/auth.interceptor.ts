import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authToken: string | null = this.authService.token;
    let authReq = request;
    if (!authToken) authToken = localStorage.getItem('token');

    // if user request

    if (authToken && !request.url.includes('public')) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authToken),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/error/notFound');
          return throwError(error);
        } else if (error.status === 401 || error.status === 403) {
          this.authService.setToken('');
          this.authService.setStatus(false)
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          retry(1)
        }
        return throwError(error);
      })
    );
  }
}
