import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';

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
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.resetPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, this._daliaValidators.noWhitespace]],
    });
  }

  sendMail(): void {}

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.resetPasswordForm.controls;
  }
}
