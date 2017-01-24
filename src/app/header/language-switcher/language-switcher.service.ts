import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { VizabiService } from "ng2-vizabi";
import * as _ from "lodash";

@Injectable()
export class LanguageSwitcherService {

  private languageAvailableList: Array<any> = [
    {key: 'en', text: 'English'},
    {key: 'ar-SA', text: 'العربية'}
  ];

  private languageList: Array<any> = [];
  private language: any;

  private languageChangeEmitter: EventEmitter<any> = new EventEmitter();
  private switcherStateEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private vService: VizabiService) {
    this.languageList = this.languageAvailableList.concat();

    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        if(this.languageIsNotSet() || this.languageChanged()) {
          const langFromUrl = this.detectLanguage();
          this.setLanguage(langFromUrl);
        }
      }
    });
  }

  private languageIsNotSet(): boolean {
    return !this.language;
  }

  private languageChanged(): boolean {
    const langFromUrl = this.detectLanguage();
    return this.language && langFromUrl.key != this.language.key;
  }

  public getLanguageChangeEmitter(): EventEmitter<any> {
    return this.languageChangeEmitter;
  }

  public getSwitcherStateEmitter(): EventEmitter<any> {
    return this.switcherStateEmitter;
  }

  public getList(): Array<any> {
    return this.languageList;
  }

  public setLanguage(langItem): void {
    this.language = langItem;
    this.languageChangeEmitter.emit(this.language);
  }

  public setSwitcherState(state: boolean): void {
    this.switcherStateEmitter.emit(state);
  }

  public getLanguage(): any {
    return this.language;
  }

  private detectLanguage(): any {
    let langFound = false;

    // top priority language from url
    const hash = window.location.hash;
    const hashPosition = hash.indexOf("#") + 1;
    const hashModelString = hash.substring(hashPosition);
    const hashModel = this.vService.stringToModel(hashModelString);

    if(_.get(hashModel, 'locale.id', false)) {
      langFound = _.find(this.languageList, localeItem => localeItem.key === hashModel.locale.id);
    }

    // second location browser locale
    const browserLanguage = this.detectBrowserLanguage();
    if (!langFound && browserLanguage) {
      langFound = _.find(this.languageList, localeItem => localeItem.key === browserLanguage);
    }

    // found language OR EN as default
    return langFound || _.first(this.languageList);
  }

  private detectBrowserLanguage(): any {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return false;
    }

    let browserLang = window.navigator['languages'] ? window.navigator['languages'][0] : null;

    browserLang = browserLang ||
      window.navigator['languages'] ||
      window.navigator['browserLanguage'] ||
      window.navigator['userLanguage'];

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }

    return browserLang;
  }
}
