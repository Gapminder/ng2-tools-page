import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { VizabiService } from "ng2-vizabi";
import * as _ from "lodash";
import { ToolService } from '../../tool.service';
import { Language } from '../../types';

@Injectable()
export class LanguageSwitcherService {
  private static DEFAULT_LANGUAGE: Language = {key: 'en', text: 'English'};

  private static AVAILABLE_LANGUAGES: ReadonlyArray<Language> = [
    LanguageSwitcherService.DEFAULT_LANGUAGE,
    {key: 'ar-SA', text: 'العربية'}
  ];

  private language: Language;

  private languageChangeEvents: EventEmitter<Language> = new EventEmitter();
  private switcherStateEvents: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private vService: VizabiService) {
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        if(this.languageIsNotSet() || this.languageChanged()) {
          const detectedLanguage = this.language || this.detectLanguage();
          this.setLanguage(detectedLanguage);
        }
      }
    });
  }

  private languageIsNotSet(): boolean {
    return !this.language;
  }

  private languageChanged(): boolean {
    const urlLangKey = _.get(this.getLanguageFromUrl(), 'key');
    return this.language && this.language.key != urlLangKey;
  }

  public getLanguageChangeEvents(): EventEmitter<Language> {
    return this.languageChangeEvents;
  }

  public getSwitcherStateEvents(): EventEmitter<boolean> {
    return this.switcherStateEvents;
  }

  public getLanguages(): ReadonlyArray<Language> {
    return LanguageSwitcherService.AVAILABLE_LANGUAGES;
  }

  public setLanguage(language: Language): void {
    this.language = language;
    this.languageChangeEvents.emit(this.language);
  }

  public setSwitcherState(state: boolean): void {
    this.switcherStateEvents.emit(state);
  }

  public getLanguage(): Language {
    return this.language;
  }

  private detectLanguage(): Language {
    return this.getLanguageFromUrl() || LanguageSwitcherService.detectBrowserLanguage() || LanguageSwitcherService.DEFAULT_LANGUAGE;
  }

  private getLanguageFromUrl(): Language {
    const model = this.vService.stringToModel(ToolService.getUrlHash());
    return LanguageSwitcherService.findLanguageBy(_.get(model, 'locale.id') as string);
  }

  private static detectBrowserLanguage(): Language {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return undefined;
    }

    let browserLang = window.navigator['languages'] ? window.navigator['languages'][0] : null;

    browserLang = browserLang ||
      window.navigator['language'] ||
      window.navigator['browserLanguage'] ||
      window.navigator['userLanguage'];

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }

    return LanguageSwitcherService.findLanguageBy(browserLang);
  }

  private static findLanguageBy(key: string): Language {
    return _.find(LanguageSwitcherService.AVAILABLE_LANGUAGES, localeItem => localeItem.key === key);
  }
}
