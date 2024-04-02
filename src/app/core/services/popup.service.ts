import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ErrorResponseInterface } from '../interface/response.interface';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  constructor(
    private _toast: NgToastService,
    private _alertService: AlertService
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                   Basics                                   */
  /* -------------------------------------------------------------------------- */
  success(message: string): void {
    return this._toast.success({
      detail: 'Acción exitosa',
      summary: message,
      duration: 4000,
      position: 'bottomRight',
    });
  }

  info(message: string): void {
    return this._toast.info({
      detail: 'Información',
      summary: message,
      duration: 4000,
      position: 'bottomRight',
    });
  }

  warning(message: string): void {
    return this._toast.warning({
      detail: 'Atención',
      summary: message,
      duration: 4000,
      position: 'bottomRight',
    });
  }

  error(code: number, message: string): void {
    return this._toast.error({
      detail: 'Error - ' + code,
      summary: message,
      duration: 4000,
      position: 'bottomRight',
    });
  }

  loading(): void {
    this._alertService.loading();
  }

  stopLoading(): void {
    this._alertService.stopLoading();
  }

  /* -------------------------------------------------------------------------- */
  /*                                Personalized                                */
  /* -------------------------------------------------------------------------- */
  warningFormInvalid(): void {
    return this.warning('Asegurese de llenar todos los campos correctamente');
  }

  errorsApi(error: ErrorResponseInterface): void {
    if (error.error.statusCode == 503) {
      this.info('No es posible conectar con el servidor, intente de nuevo más tarde');
      return;
    }
    this.error(error.error.statusCode, error.error.message);
  }
}
