import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { VizabiService } from "ng2-vizabi";
import * as _ from "lodash";

@Injectable()
export class LanguageSwitcherService {

  LanguageAvailableList = [
    {key: 'en', text: 'English'},
    {key: 'ar-SA', text: 'العربية'}
  ];

  LanguageList = [];
  Language = null;

  languageChangeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private vService: VizabiService) {
    this.LanguageList = this.LanguageAvailableList.concat();

    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        const langFromUrl = this.detectLanguage();
        if(
          // language is not defined yet
          !this.Language ||
          // language changed
          (this.Language && langFromUrl.key != this.Language.key)
        ) {
          this.setLanguage(langFromUrl);
        }
      }
    });
  }

  getLanguageChangeEmitter() {
    return this.languageChangeEmitter;
  }

  getList() {
    return this.LanguageList;
  }

  setLanguage(langItem, emmit = true) {
    this.Language = langItem;
    this.languageChangeEmitter.emit(this.Language);
  }

  getLanguage() {
    return this.Language;
  }

  private detectLanguage() {
    let langFound = false;

    // top priority language from url
    const hash = window.location.hash;
    const hashPosition = hash.indexOf("#") + 1;
    const hashModelString = hash.substring(hashPosition);
    const hashModel = this.vService.stringToModel(hashModelString);

    if (hashModel.locale) {
      langFound = _.find(this.LanguageList, function (localeItem) {
        return localeItem.key === hashModel.locale.id;
      });
    }

    // second location browser locale
    const browserLanguage = this.detectBrowserLanguage();
    if (!langFound && browserLanguage) {
      langFound = _.find(this.LanguageList, function (localeItem) {
        return localeItem.key === browserLanguage;
      });
    }

    // last one is default EN
    const defaultLanguage = _.first(this.LanguageList);

    return langFound || defaultLanguage;
  }

  private detectBrowserLanguage() {
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
