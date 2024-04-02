import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { ModalTypes } from './ther.enum';

@Component({
  standalone: true,
  imports: [ModalModule],
  selector: 'app-success',
  templateUrl: './ther-modals.component.html',
})
export class TherModalsComponent implements OnInit {
  public ModalTypes = ModalTypes;
  public modalType: ModalTypes = ModalTypes.SUCCESS;
  public message!: string;
  public statusCode!: number;
  public duration: number = 3000;

  constructor(public _bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.modalType != ModalTypes.QUESTION && this.modalType != ModalTypes.LOADER) {
      setTimeout(() => {
        this._bsModalRef.hide();
      }, this.duration);
    }
  }

  closeQuestion(value: boolean): void {
    this._bsModalRef.hide();
    this._bsModalRef.onHide?.next(value);
  }
}
