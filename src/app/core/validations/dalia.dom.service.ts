import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DaliaValidators } from './dalia.service';
import { DaliaFormatValidators } from './dalia.validator.enum';

/**
 * Clase general que ayuda a mostart y validar controles en el HTML
 *
 * @date 6/8/2022 - 12:17:46
 * @author Victor R. Jose Santiago
 *
 * @export
 * @class DaliaCheckValidators
 * @typedef {DaliaDomValidators}
 */
@Injectable({
  providedIn: 'root',
})
export class DaliaDomValidators {
  constructor(private _daliaValidators: DaliaValidators) {}

  /**
   * Muestra un error en el template del html
   *
   * @date 6/8/2022 - 12:19:27
   * @author Victor R. Jose Santiago
   *
   * @param control
   * @param { }[format]
   * @returns
   */
  showError(control: AbstractControl, format?: DaliaFormatValidators): string {
    return this._daliaValidators.showErrorMessage(control, format);
  }

  /**
   * Bandera para mostrar mensajes de error solo cuando un control es inválido y ha sido tocado por el usuario.
   *
   * @date 6/8/2022 - 12:19:55
   * @author Victor R. Jose Santiago
   *
   * @param control
   * @returns
   */
  validate(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }
}
