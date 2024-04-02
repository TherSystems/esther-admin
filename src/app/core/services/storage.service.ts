import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key: string = environment.keyChipher; // The key size must be either 16, 24, or 32 bytes long. This is a 32 bytes long key, which is the maximum size that AES-256 supports.

  /**
   * Save a value in the local storage with a key and a value encrypted
   * @date 3/4/2024 - 7:32:08 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to save the value
   * @param {string} value The value to save
   */
  setItem(key: string, value: string): void {
    const securityValue = this.encript(value);
    localStorage.setItem(key, securityValue);
  }

  /**
   * Get a value from the local storage with a key and a value decrypted
   * @date 3/4/2024 - 7:32:08 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to get the value
   * @returns {string | null} The value decrypted
   */
  getItem(key: string): string | null {
    const securityValue = localStorage.getItem(key);
    if (securityValue) {
      return this.decript(securityValue);
    }
    return null;
  }

  /**
   * Save a value in the local storage with a key and a value encrypted
   * @date 3/4/2024 - 7:33:03 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to save the value
   * @param {any[]} value The value to save as an array
   */
  setArray<T>(key: string, value: T[]): void {
    const strinArray = JSON.stringify(value);
    const securityValue = this.encript(strinArray);
    localStorage.setItem(key, securityValue);
  }

  /**
   * Get a value from the local storage with a key and a value decrypted
   * @date 3/4/2024 - 7:33:03 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to get the value
   * @returns {any[] | null} The value decrypted as an array
   */
  getArray<T>(key: string): T[] | null {
    const securityValue = localStorage.getItem(key);
    if (securityValue) {
      const stringValue = this.decript(securityValue);
      return JSON.parse(stringValue) as T[];
    }
    return null;
  }

  /**
   * Save a value in the local storage with a key and a value encrypted
   * @date 3/4/2024 - 7:33:03 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to save the value
   * @param {T} value The value to save as an object
   */
  setObject<T>(key: string, value: T): void {
    const strinArray = JSON.stringify(value);
    const securityValue = this.encript(strinArray);
    localStorage.setItem(key, securityValue);
  }

  /**
   * Get a value from the local storage with a key and a value decrypted
   * @date 3/4/2024 - 7:33:03 PM
   * @author Victor R. Jose
   *
   * @param {string} key The key to get the value
   * @returns {T | null} The value decrypted as an object
   */
  getObject<T>(key: string): T | null {
    const securityValue = localStorage.getItem(key);
    if (securityValue) {
      const stringValue = this.decript(securityValue);
      return JSON.parse(stringValue) as T;
    }
    return null;
  }

  /**
   * Update a value from the local storage for object with a key and a value decrypted
   * @date 3/4/2024 - 10:23:02 PM
   * @author Victor R. Jose
   *
   * @template T
   * @param {string} key The key to get the value
   * @param {string} attribute The attribute to update
   * @param {*} value The value to update
   */
  setObjectAtribute<T>(key: string, attribute: string, value: any): void {
    const securityValue = this.getObject<T>(key) as Record<string, any> | null;
    if (securityValue) {
      securityValue[attribute] = value;
      this.setObject(key, securityValue);
    }
  }

  /**
   * remove a value from the local storage with a key
   * @date 3/4/2024 - 7:35:29 PM
   * @author Victor R. Jose
   *
   * @param {string} key
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear the local storage
   * @date 3/4/2024 - 7:35:29 PM
   * @author Victor R. Jose
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Encrypt a text
   * @date 3/4/2024 - 7:36:43 PM
   * @author Victor R. Jose
   *
   * @private
   * @param {string} text The text to encrypt
   * @returns {string} The text encrypted
   */
  private encript(text: string): string {
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

  /**
   * Decrypt a text
   * @author Victor R. Jose
   *
   * @private
   * @param {string} encrypted The text to decrypt
   * @returns {string} The text decrypted
   */
  private decript(encrypted: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypted, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
