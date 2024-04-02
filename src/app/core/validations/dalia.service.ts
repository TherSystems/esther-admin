import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { DaliaFormatValidators } from './dalia.validator.enum';

/**
 * Ayuda a validar distintos tipos de input
 *
 * @date 6/8/2022 - 12:05:16
 * @author Victor R. Jose Santiago
 *
 * @export
 * @class DaliaValidators
 * @typedef {DaliaValidators}
 */
@Injectable({
  providedIn: 'root',
})
export class DaliaValidators {
  // public formato = DaliaFormatValidators;
  constructor() {}

  /**
   * Valida que el control no tenga espacios en blanco
   *
   * @date 6/8/2022 - 12:05:56
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noWhitespace(control: FormControl): any {
    if (control.value == '') {
      return null;
    } else {
      const isWhitespace: boolean = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    }
  }

  /**
   * Valida que el control no contenga una edad menor a 18 años
   *
   * @date 6/8/2022 - 12:06:16
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noMinorAge(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const age: number = parseInt(control.value, 10);
      return age >= 18 ? null : { minorAge: true };
    }
  }

  /**
   * Valida que el dia seleccionado no sea mayor a 15 dias despues de ahora
   *
   * @date 6/8/2022 - 12:06:43
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noMoreThanFifteenDays(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const today = DateTime.local();
      const dateSelected = DateTime.local(control.value);
      const duration = dateSelected.diff(today, 'days').toObject();
      return duration.days && duration.days < 15 ? null : { moreThanFifteenDays: true };
    }
  }

  /**
   * Valida que el control no contenga una edad mayor a 70 años
   *
   * @date 6/8/2022 - 12:07:12
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noOldAge(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const age: number = parseInt(control.value, 10);
      return age <= 70 ? null : { oldAge: true };
    }
  }

  /**
   * Valida que la fecha seleccionada no sea posterior a hoy
   *
   * @date 6/8/2022 - 12:07:31
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noAfterNowDate(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const today = DateTime.local();
      const dateSelected = DateTime.local(control.value);
      return dateSelected.startOf('day') <= today.startOf('day') ? null : { afterDate: true };
    }
  }

  /**
   * Valida que la fecha seleccionada no sea anterior a hoy
   *
   * @date 6/8/2022 - 12:07:49
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noBeforeNowDate(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const today = DateTime.local();
      const dateSelected = DateTime.local(control.value);
      return dateSelected.startOf('day') >= today.startOf('day') ? null : { beforeDate: true };
    }
  }

  /**
   * Valida que el dia no sea domingo
   *
   * @date 6/8/2022 - 12:08:13
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noSundayDay(control: FormControl): any {
    if (control.value == null) {
      return null;
    } else {
      const day = DateTime.local(control.value).weekday;

      return day !== 7 ? null : { sundayDay: true };
    }
  }

  /**
   * Valida que una casilla de verificacion sea marcada -- Politicas de privacidad, obligciones etc
   *
   * @date 6/8/2022 - 12:09:57
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @returns
   */
  public noCheckMarked(control: FormControl): any {
    const isValid: boolean = control.value || '';
    return isValid ? null : { checkMarked: true };
  }

  /**
   * Crea mensajes de error comprensibles a los usuarios
   *
   * @date 6/8/2022 - 12:10:34
   * @author Victor R. Jose Santiago
   *
   * @public
   * @param control
   * @param [format]
   * @returns
   */
  public showErrorMessage(control: AbstractControl, format?: DaliaFormatValidators): string {
    let message: string = '';
    if (control.touched && control.errors != null) {
      if (control.errors['required']) {
        message = 'El campo es requerido';
      }
      if (control.errors['whitespace']) {
        message = 'Valide la información ingresada por favor no puede contener espacios en blanco';
      }
      if (control.errors['checkMarked']) {
        message = 'Es necesario que acepte las condiciones';
      }
      if (control.errors['minorAge']) {
        message = 'Lo sentimos para realizar el trámite es necesario ser mayor de edad';
      }
      if (control.errors['oldAge']) {
        message = 'Lo sentimos la edad máxima para solicitar un credido es de 70 años';
      }
      if (control.errors['afterDate']) {
        message = 'La fecha ingresada es posterior a hoy';
      }
      if (control.errors['beforeDate']) {
        message = 'La fecha ingresada es anterior a hoy';
      }
      if (control.errors['sundayDay']) {
        message = 'Lo sentimos. No tenemos servicio al público los domingos';
      }
      if (control.errors['moreThanFifteenDays']) {
        message = 'Solo se pueden agendar citas con 15 dias de anticipación';
      }
      if (control.errors['email']) {
        message = 'El formato del correo electrónico no es válido.';
      }
      if (control.errors['pattern']) {
        if (format === DaliaFormatValidators.CURP) {
          message = 'El formato de la CURP no es válida.';
        }
        if (format === DaliaFormatValidators.TELEFONO) {
          message = 'Ingrese el número telefónico a 10 digitos';
        }
        if (format === DaliaFormatValidators.RFC) {
          message = 'El formato del RFC no es válido.';
        }
        if (format === DaliaFormatValidators.CORREO) {
          message = 'El formato del correo electrónico no es válido.';
        }
        if (format === DaliaFormatValidators.FACEBOOK) {
          message = 'El formato del Facebook nos es válido.';
        }
        if (format === DaliaFormatValidators.CONTRASENIA) {
          message = `La contraseña debe contener al menos 8 caracteres,
          una letra mayúscula,
          una letra minúscula,
          un número y
          un caracter especial`;
        }
      }
      if (control.errors['minlength']) {
        message = 'Ingrese mínimo de ' + control.errors['minlength'].requiredLength + ' caracteres';
      }

      if (control.errors['maxlength']) {
        message = 'Solo se permite un máximo de ' + control.errors['maxlength'].requiredLength + ' caracteres';
      }
    }
    return message;
  }

  /**
   * Valida que un archivo contenga un formato y peso especifico
   *
   * @date 6/8/2022 - 12:11:36
   * @author Victor R. Jose Santiago
   *
   * @param image
   * @returns
   */
  validateImage(image: File): RetornoValidacion {
    if (
      image.type === 'image/png' ||
      image.type === 'application/pdf' ||
      image.type === 'image/jpeg' ||
      image.type === 'image/jpg'
    ) {
      if (image.size < 10000000) {
        return {
          isValid: true,
        };
      } else {
        return {
          isValid: false,
          message: 'El archivo que ha subido pesa más de 10mb, le recomendamos optimizarlo y volverlo a intentar',
        };
      }
    } else {
      return {
        isValid: false,
        message:
          'Solo se aceptan  archivos PDF e imágenes JPG, JPEG, PNG y verifique el tipo de archivo que desea subir',
      };
    }
  }

  /**
   * Valida que una imagen contenga un formato y un peso especifico
   *
   * @date 6/8/2022 - 12:12:33
   * @author Victor R. Jose Santiago
   *
   * @param image
   * @returns
   */
  validateFoto(image: File): RetornoValidacion {
    if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      if (image.size < 10000000) {
        return {
          isValid: true,
        };
      } else {
        return {
          isValid: false,
          message: 'El archivo que ha subido pesa más de 10mb, le recomendamos optimizarlo y volverlo a intentar',
        };
      }
    } else {
      return {
        isValid: false,
        message: 'Solo se aceptan   imágenes JPG, JPEG, PNG y verifique el tipo de archivo que desea subir',
      };
    }
  }
}

/**
 * Mensaje y confirmacion de validacion
 *
 * @date 6/8/2022 - 12:13:04
 * @author Victor R. Jose Santiago
 *
 * @interface RetornoValidacion
 * @typedef {RetornoValidacion}
 */
interface RetornoValidacion {
  isValid: boolean;
  message?: string;
}
