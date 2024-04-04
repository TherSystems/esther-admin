import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthTokenService } from '../core/services/token.service';
import { ChangeRequestInterface } from './change-password/change-password.interface';
import { LoginRequest, LoginResponse } from './login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base: string = environment.baseURL;

  constructor(
    private _httpClient: HttpClient,
    private _tokenService: AuthTokenService
  ) {}

  logOut(): void {
    this._tokenService.signOut();
  }
  logIn(data:LoginRequest):Observable<LoginResponse>{
    return this._httpClient.post<LoginResponse>(`${this.base}/api/v1/auth/login`,data).pipe(
      switchMap((response:LoginResponse)=>{
        this._tokenService.saveToken(response.access_token);
        console.log("esto muestra el save",this._tokenService.saveToken);
        this._tokenService.saveUser(response.user);
        return of(response)
      })
    )
  }

  sendMail( email: string ): Observable<any>{
    return this._httpClient.post<any>(`${this.base}/api/v1/auth/password/mail`,email)
  }

  changePassword(data:ChangeRequestInterface):Observable<any>{
    return this._httpClient.patch<any>(`${this.base}/api/v1/auth/password/restore`,data)
  }

}

