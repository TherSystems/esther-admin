import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PopUpService } from '../../core/services/popup.service';
import { DaliaDomValidators } from '../../core/validations/dalia.dom.service';
import { DaliaValidators } from '../../core/validations/dalia.service';
import { DaliaFormatValidators } from '../../core/validations/dalia.validator.enum';
import { AuthService } from '../auth.service';
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
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _popUpService: PopUpService
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
      token: this._activatedRoute.snapshot.params['token'],
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value,
    };
    this._authService.changePassword(data).subscribe({
      next: (response)=>{
        this._popUpService.success(response.message)
      },
      error: (error)=>{
        this._popUpService.errorsApi(error)
      }
    })
    console.log(data);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Global Getters                               */
  /* -------------------------------------------------------------------------- */
  get f(): { [key: string]: AbstractControl<any, any> } {
    return this.newPasswordForm.controls;
  }
}
