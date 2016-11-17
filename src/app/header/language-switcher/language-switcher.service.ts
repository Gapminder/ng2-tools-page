import { Injectable, EventEmitter } from '@angular/core';

import * as _ from "lodash";

@Injectable()
export class LanguageSwitcherService {

  LanguageAvailableList = [
    {key: 'en', text: 'English'},
    {key: 'se', text: 'Svenska'}
  ];

  LanguageList = [];
  Language = null;

  languageChangeEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.LanguageList = this.LanguageAvailableList.concat();
    const langFromUrl = this._detectLanguage();
    this.setLanguage(langFromUrl);
  }

  getLanguageChangeEmitter() {
    return this.languageChangeEmitter;
  }

  getList() {
    return this.LanguageList;
  }

  setLanguage(langItem) {
    this.Language = langItem;
    this.languageChangeEmitter.emit(this.Language);
  }

  getLanguage() {
    return this.Language;
  }

  private _detectLanguage() {
    /*
     const modelFromUrl = getModelFromUrl($location.hash());
     if (modelFromUrl.language) {
      return _.find($scope.languageList, function (langItem) {
      return langItem.key === modelFromUrl.language.id;
     });
     }
     */
    return _.first(this.LanguageList);
  }
}
