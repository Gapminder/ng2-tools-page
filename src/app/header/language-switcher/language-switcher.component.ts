import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-language-switcher',
  templateUrl: 'language-switcher.component.html',
  styleUrls: ['language-switcher.component.styl']
})
export class LanguageSwitcherComponent {

  private language: any;
  private languageList: Array<any> = [];

  public isSwitcherOpened: boolean = false;

  constructor (private languageService: LanguageSwitcherService) {
    this.languageService.getLanguageChangeEmitter()
      .subscribe(langItem => this.language = langItem);
    this.languageService.getSwitcherStateEmitter()
      .subscribe(state => this.isSwitcherOpened = state);

    this.languageList = this.languageService.getList();
    this.language = this.languageService.getLanguage();
  }

  public changeLanguage(languageItem: any): void {
    this.languageService.setLanguage(languageItem);
    this.language = this.languageService.getLanguage();

    this.isSwitcherOpened = false;
  }
}
