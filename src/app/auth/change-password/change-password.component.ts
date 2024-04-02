import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';
import { DaliaFormatValidators } from '../../core/validations/dalia.validator.enum';
import { ChangeRequestInterface } from './change-password.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  public newPasswordForm!: UntypedFormGroup;
  public year: number = new Date().getFullYear();
  public fieldTextType: boolean = false;
  public fieldTextType1: boolean = false;
  public formatTypes = DaliaFormatValidators;

  constructor(
    public _daliaDomValidators: DaliaDomValidators,
    private _daliaValidators: DaliaValidators,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.newPasswordForm = this._formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          this._daliaValidators.noWhitespace,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          this._daliaValidators.noWhitespace,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}$'),
        ],
      ],
    });
  }

  changePassword(): void {
    const data: ChangeRequestInterface = {
      token: '',
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value,
    };

    console.log(data);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.newPasswordForm.controls;
  }
}
