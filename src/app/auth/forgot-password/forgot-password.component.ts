import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../core/services/alert.service';
import { PopUpService } from '../../core/services/popup.service';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  public resetPasswordForm!: UntypedFormGroup;
  public year: number = new Date().getFullYear();
  constructor(
    public _daliaDomValidators: DaliaDomValidators,
    private _daliaValidators: DaliaValidators,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
    private _popUpService: PopUpService
  ) {}
    

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.resetPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, this._daliaValidators.noWhitespace]],
    });
  }

  sendMail(): void {
    if(this.resetPasswordForm.invalid){
      this._popUpService.warningFormInvalid()
    }
    this._authService.sendMail(this.resetPasswordForm.value).subscribe({
      next:(response)=>{
        this._popUpService.success(response.message)
      },
      error:(error)=>{
        this._popUpService.errorsApi(error)
      }
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.resetPasswordForm.controls;
  }
}
