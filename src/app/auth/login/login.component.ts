import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public fieldTextType: boolean = false;
  public year: number = new Date().getFullYear();

  constructor(
    public _daliaDomValidators: DaliaDomValidators,
    private _daliaValidators: DaliaValidators,
    private _formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, this._daliaValidators.noWhitespace]],
      password: ['', [Validators.required, this._daliaValidators.noWhitespace]],
      rememberMe: [false],
    });
  }

  logIn(): void {
    if (this.loginForm.invalid) {
      // this._popUpService.warningFormInvalid(); //Muestra un mensaje de advertencia si el formulario es inválido
      return;
    }

    // this._popUpService.loading(); //Inicia la animación de carga
  }

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.loginForm.controls;
  }
}
