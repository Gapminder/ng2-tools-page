import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, Language } from './store/language/language';
import { VizabiToolsService } from './vizabi-tools-service';

@Injectable()
export class LanguageService {
  constructor(private vizabiToolsService: VizabiToolsService) {
  }

  detectLanguage(): Language {
    return this.getLanguageFromUrl() || LanguageService.detectBrowserLanguage() || DEFAULT_LANGUAGE;
  }

  private getLanguageFromUrl(): Language {
    return LanguageService.findLanguageBy(this.vizabiToolsService.getLocaleIdFromUrl());
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

    return LanguageService.findLanguageBy(browserLang);
  }

  private static findLanguageBy(key: string): Language {
    return _.find(AVAILABLE_LANGUAGES, localeItem => localeItem.key === key);
  }
}
