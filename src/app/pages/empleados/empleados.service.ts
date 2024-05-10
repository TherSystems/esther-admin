import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { EmpleadosResponse } from './empleados.interface';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private base: string = environment.baseURL;

  constructor(private _http: HttpClient) {}

  getEmpleados(): Observable<EmpleadosResponse[]> {
    return this._http.get<EmpleadosResponse[]>(`${this.base}/api/v1/employee`);
  }
}
