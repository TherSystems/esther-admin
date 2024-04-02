import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthTokenService } from '../core/services/token.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _tokenService: AuthTokenService) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.

    const access_token = this._tokenService.getToken();
    // const access_token = localStorage.getItem('access_token');

    if (access_token && !AuthUtils.isTokenExpired(access_token)) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + access_token),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError(error => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          // this._authService.signOut();
          // // Reload the app
          // location.reload();
        }

        if (error instanceof HttpErrorResponse && error.status === 0) {
          error.error.message = 'No se pudo conectar con el servidor';
          error.error.statusCode = 503;
          // Sign out
          // this._authService.signOut();
          // // Reload the app
          // location.reload();
        }

        console.log(error);

        return throwError(error);
      })
    );
  }
}
