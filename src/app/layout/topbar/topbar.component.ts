import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AuthService } from '../../auth/auth.service';
import { LanguageService } from '../../core/services/languaje.service';
import { StorageService } from '../../core/services/storage.service';
import { RootReducerState } from '../../store/index.reducer';
import { changeMode } from '../../store/layouts/layout.actions';
import { getLayoutmode } from '../../store/layouts/layout.selectors';
import { notification } from './data';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  public country: any;
  public selectedItem!: any;
  public flagvalue: any;
  public valueset: any;
  public countryName: any;
  public cookieValue: any;
  public userData: any;
  public cartData: any;
  public element: any;
  public mode: string | undefined;
  public total: any;
  public subtotal: any = 0;
  public totalsum: any;
  public taxRate: any = 0.125;
  public shippingRate: any = '65.00';
  public discountRate: any = 0.15;
  public discount: any;
  public tax: any;
  public notificationList: any;

  @Output() public mobileMenuButtonClicked = new EventEmitter();
  @ViewChild('removeNotificationModal', { static: false }) public removeNotificationModal?: ModalDirective;
  @ViewChild('removeCartModal', { static: false }) public removeCartModal?: ModalDirective;
  public deleteid: any;
  public totalNotify: number = 0;
  public newNotify: number = 0;
  public readNotify: number = 0;
  public qty: number = 0;
  public listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Español', flag: 'assets/images/flags/mx.svg', lang: 'es' },
    { text: 'Français', flag: 'assets/images/flags/fr.svg', lang: 'fr' },
  ];
  public checkedValGet: any[] = [];

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _authService: AuthService,
    private _router: Router,
    public _store: Store<RootReducerState>,
    private _languageService: LanguageService,
    private _storageService: StorageService
  ) {
    // this._languageService.setLanguage('es');
  }

  ngOnInit(): void {
    this.element = document.documentElement;
    this.userData = this._storageService.getItem('user');
    this.cartData = [];
    this.cartData.map((x: any) => {
      x['total'] = (x['qty'] * x['price']).toFixed(2);
      this.subtotal += parseFloat(x['total']);
    });
    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shippingRate) -
      parseFloat(this.discount)
    ).toFixed(2);

    this.cookieValue = this._storageService.getItem('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);

    if (val.length === 0) {
      console.log('entra aca if');
      if (this.flagvalue === undefined) {
        this.valueset = 'assets/images/flags/mx.svg';
        this._languageService.setLanguage('es');
      }
      this.countryName = 'Español';
    } else {
      console.log('entra aca else');
      this.flagvalue = val.map(element => element.flag);
    }

    this.notificationList = notification;
    this.notificationList.forEach((element: any) => {
      this.totalNotify += element.items.length;
      if (element.title == 'New') {
        this.newNotify = element.items.length;
      } else {
        this.readNotify = element.items.length;
      }
    });
  }

  windowScroll(): void {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'block';
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'none';
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  // Increment Decrement Quantity
  increment(qty: any, i: any, id: any): void {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty;
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2);
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty;
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2);
    }

    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total']);
    });

    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shippingRate) -
      parseFloat(this.discount)
    ).toFixed(2);
  }

  removeCart(id: any): void {
    this.removeCartModal?.show();
    this.deleteid = id;
  }

  confirmDelete(): void {
    this.removeCartModal?.hide();

    this.subtotal -= this.cartData[this.deleteid].total;
    this.subtotal = this.subtotal.toFixed(2);
    this.discount = (this.subtotal * this.discountRate).toFixed(2);
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (
      parseFloat(this.subtotal) +
      parseFloat(this.tax) +
      parseFloat(this.shippingRate) -
      parseFloat(this.discount)
    ).toFixed(2);
    this.cartData.splice(this.deleteid, 1);
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string): void {
    this.mode = mode;
    if (mode == 'auto') {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.setAttribute('data-topbar', 'light');
      document.documentElement.classList.add('mode-auto');
    } else {
      this._store.dispatch(changeMode({ mode }));
      this._store.select(getLayoutmode).subscribe(mode => {
        document.documentElement.setAttribute('data-bs-theme', mode);
      });
      document.documentElement.classList.remove('mode-auto');
      document.documentElement.setAttribute('data-topbar', mode);
    }
  }

  /***
   * Language Listing
   */

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string): void {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this._languageService.setLanguage(lang);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any): void {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen(): void {
    document.body.classList.toggle('fullscreen-enable');
    if (!document.fullscreenElement && !this.element.mozFullScreenElement && !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this._document.exitFullscreen) {
        this._document.exitFullscreen();
      } else if (this._document.mozCancelFullScreen) {
        /* Firefox */
        this._document.mozCancelFullScreen();
      } else if (this._document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this._document.webkitExitFullscreen();
      } else if (this._document.msExitFullscreen) {
        /* IE/Edge */
        this._document.msExitFullscreen();
      }
    }
  }

  // Search Topbar
  Search(): void {
    const searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    const dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    const input = document.getElementById('search-options') as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add('show');
      searchOptions.classList.remove('d-none');
      const inputVal = input.value.toUpperCase();
      const notifyItem = document.getElementsByClassName('notify-item');

      Array.from(notifyItem).forEach(function (element: any) {
        let notifiTxt = '';
        if (element.querySelector('h6')) {
          const spantext = element.getElementsByTagName('span')[0].innerText.toLowerCase();
          const name = element.querySelector('h6').innerText.toLowerCase();
          if (name.includes(inputVal)) {
            notifiTxt = name;
          } else {
            notifiTxt = spantext;
          }
        } else if (element.getElementsByTagName('span')) {
          notifiTxt = element.getElementsByTagName('span')[0].innerText.toLowerCase();
        }
        if (notifiTxt) element.style.display = notifiTxt.includes(inputVal) ? 'block' : 'none';
      });
    } else {
      dropdown.classList.remove('show');
      searchOptions.classList.add('d-none');
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn(): void {
    const searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    const dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    const searchInputReponsive = document.getElementById('search-options') as HTMLInputElement;
    dropdown.classList.remove('show');
    searchOptions.classList.add('d-none');
    searchInputReponsive.value = '';
  }

  // Remove Notification
  onCheckboxChange(): void {
    const checkedVal: any[] = [];
    let result;
    for (let i = 0; i < this.notificationList.length; i++) {
      for (let x = 0; x < this.notificationList[i].items.length; x++) {
        if (this.notificationList[i].items[x].state == true) {
          result = this.notificationList[i].items[x].id;
          checkedVal.push(result);
        }
      }
    }
    this.checkedValGet = checkedVal;
    checkedVal.length > 0
      ? ((document.getElementById('notification-actions') as HTMLElement).style.display = 'block')
      : ((document.getElementById('notification-actions') as HTMLElement).style.display = 'none');
  }

  notificationDelete(): void {
    for (let i = 0; i < this.checkedValGet.length; i++) {
      for (let j = 0; j < this.notificationList.length; j++) {
        for (let x = 0; x < this.notificationList[j].items.length; x++) {
          if (this.notificationList[j].items[x].id == this.checkedValGet[i]) {
            this.notificationList[j].items.splice(x, 1);
          }
        }
      }
    }
    this.calculatenotification();
    this.removeNotificationModal?.hide();
  }

  calculatenotification(): void {
    this.totalNotify = 0;
    this.checkedValGet = [];
    this.notificationList.forEach((element: any) => {
      this.totalNotify += element.items.length;
      if (element.title == 'New') {
        this.newNotify = element.items.length;
      } else {
        this.readNotify = element.items.length;
      }
    });
    this.checkedValGet.length > 0
      ? ((document.getElementById('notification-actions') as HTMLElement).style.display = 'block')
      : ((document.getElementById('notification-actions') as HTMLElement).style.display = 'none');
    if (this.totalNotify == 0) {
      document.querySelector('.empty-notification-elem')?.classList.remove('d-none');
    }
  }

  /**
   * Logout the user
   */
  logout(): void {
    this._authService.logOut();
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
    this._router.navigate(['/auth/login']);
  }
}
