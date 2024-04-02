import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public languages: string[] = ['en', 'fr', 'es'];

  constructor(
    public _translate: TranslateService,
    public _storageService: StorageService
  ) {
    let browserLang: any;
    this._translate.addLangs(this.languages);
    if (this._storageService.getItem('lang')) {
      browserLang = this._storageService.getItem('lang');
      _translate.use(browserLang);
    } else {
      browserLang = _translate.getBrowserLang(); //Idioma que tengamos por defecto
      _storageService.setItem('lang', browserLang.match(/en|fr|es/) ? browserLang : 'es'); //Si no es ninguno de los idiomas que tenemos por defecto, se pone en español
      _translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'es'); //Si no es ninguno de los idiomas que tenemos por defecto, se pone en español
    }
  }

  public setLanguage(lang: any): void {
    this._translate.use(lang);
    this._storageService.setItem('lang', lang);
  }
}
