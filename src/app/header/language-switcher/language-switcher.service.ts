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
        const langFromUrl = this._detectLanguage();
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

  private _detectLanguage() {
    const hash = window.location.hash;
    const hashPosition = hash.indexOf("#") + 1;
    const hashModelString = hash.substring(hashPosition);
    const hashModel = this.vService.stringToModel(hashModelString);

    let resultItem = _.first(this.LanguageList);

    if(!!hashModel.locale && !!hashModel.locale.id) {
      const foundItem = _.find(this.getList(), function (langItem) {
        return langItem.key === hashModel.locale.id;
      });
      return foundItem ? foundItem : resultItem;
    }

    return resultItem;
  }
}
