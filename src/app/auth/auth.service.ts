import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthTokenService } from '../core/services/token.service';
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
    return this._httpClient.post<LoginResponse>(`${this.base}/api/v1/auth/login`,data)
  }

}

