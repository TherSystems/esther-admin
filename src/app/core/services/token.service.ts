import { Injectable } from '@angular/core';
import { UserLoginResponse } from '../../auth/login/login.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  constructor(private _storageService: StorageService) {}

  /**
   * Remove credentials from the local storage
   * @date 3/4/2024 - 10:43:16 PM
   * @author Victor R. Jose
   */
  signOut(): void {
    this._storageService.remove('access_token');
  }

  /**
   * Save the token in the local storage
   * @date 3/4/2024 - 8:21:10 PM
   * @author Victor R. Jose
   *
   * @public
   * @param {string} token The token to save
   */
  saveToken(token: string): void {
    this._storageService.setItem('access_token', token);
  }

  /**
   * Get the token from the local storage
   * @date 3/4/2024 - 8:21:10 PM
   * @author Victor R. Jose
   *
   * @returns {string | null} The token
   */
  getToken(): string | null {
    return this._storageService.getItem('access_token');
  }

  saveUser(user: UserLoginResponse): void {
    this._storageService.setObject('user', user);
  }
  getUser(): UserLoginResponse | null {
    return this._storageService.getObject<UserLoginResponse>('user');
  }
}
