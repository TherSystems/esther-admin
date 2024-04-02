import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthTokenService } from '../core/services/token.service';

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
}
