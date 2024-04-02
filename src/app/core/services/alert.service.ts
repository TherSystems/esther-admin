import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TherLoaderComponent } from '../alerts/ther-alerts/ther-loader.component';
import { TherModalsComponent } from '../alerts/ther-alerts/ther-modals.component';
import { ModalTypes } from '../alerts/ther-alerts/ther.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _modalService: BsModalService) {}

  private showModal(options: ModalOptions): BsModalRef<any> {
    const defaultOptions: ModalOptions = {
      class: 'modal-sm modal-dialog-centered',
      ignoreBackdropClick: false,
      keyboard: true,
      animated: true,
    };
    return this._modalService.show(TherModalsComponent, { ...defaultOptions, ...options });
  }

  private showLoader(options: ModalOptions): BsModalRef<any> {
    const defaultOptions: ModalOptions = {
      class: 'modal-sm modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      animated: false,
    };
    return this._modalService.show(TherLoaderComponent, { ...defaultOptions, ...options });
  }

  success(message: string): BsModalRef<any> {
    const options: ModalOptions = {
      initialState: {
        message,
        modalType: ModalTypes.SUCCESS,
      },
    };
    return this.showModal(options);
  }

  error(code: number, message: string): BsModalRef<any> {
    const options: ModalOptions = {
      initialState: {
        message,
        modalType: ModalTypes.ERROR,
        statusCode: code,
      },
    };
    return this.showModal(options);
  }

  warning(message: string): BsModalRef<any> {
    const options: ModalOptions = {
      initialState: {
        message,
        modalType: ModalTypes.WARNING,
      },
    };
    return this.showModal(options);
  }

  info(message: string): BsModalRef<any> {
    const options: ModalOptions = {
      initialState: {
        message,
        modalType: ModalTypes.INFO,
      },
    };
    return this.showModal(options);
  }

  question(question: string): Observable<boolean> {
    const options: ModalOptions = {
      initialState: {
        message: question,
        modalType: ModalTypes.QUESTION,
      },
      ignoreBackdropClick: true,
      keyboard: false,
    };
    const modalRef = this.showModal(options);
    // this.stopLoading();
    return (
      modalRef.onHide?.pipe(
        map<any, boolean>((reason: any) => reason),
        take(1)
      ) ?? new Observable<boolean>()
    );
  }

  loading(): BsModalRef<any> {
    const options: ModalOptions = {
      initialState: {
        modalType: ModalTypes.LOADER,
      },
    };
    return this.showLoader(options);
  }

  stopLoading(): void {
    this._modalService.hide();
  }
}
