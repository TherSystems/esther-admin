import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';
import { AuthService } from '../auth.service';

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
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _routes: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['vgluzmaria96@gmail.com', [Validators.required, Validators.email, this._daliaValidators.noWhitespace]],
      password: ['ther2023', [Validators.required, this._daliaValidators.noWhitespace]],
      rememberMe: [false],
    });
  }

  logIn(): void {
    if (this.loginForm.invalid) {
      // this._popUpService.warningFormInvalid(); //Muestra un mensaje de advertencia si el formulario es inválido
      return;
    }
    this._authService.logIn(this.loginForm.value).subscribe({
      next: (response) =>{
        console.log('esto trae el response',response)
        this._routes.navigateByUrl('/')
      },
      error: (error)=> {console.log(error);}
    })

    // this._popUpService.loading(); //Inicia la animación de carga
  }

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.loginForm.controls;
  }
}
