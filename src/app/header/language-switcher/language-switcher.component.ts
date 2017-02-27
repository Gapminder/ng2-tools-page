import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-language-switcher',
  templateUrl: 'language-switcher.component.html',
  styleUrls: ['language-switcher.component.styl']
})
export class LanguageSwitcherComponent {

  private selectedLanguage: any;
  public isSwitcherOpened: boolean = false;

  constructor (private languageService: LanguageSwitcherService) {
    this.languageService.getLanguageChangeEvents()
      .subscribe(langItem => this.selectedLanguage = langItem);

    this.languageService.getSwitcherStateEvents()
      .subscribe(state => this.isSwitcherOpened = state);

    this.selectedLanguage = this.languageService.getLanguage();
  }

  public changeLanguage(language: any): void {
    this.languageService.setLanguage(language);
    this.selectedLanguage = this.languageService.getLanguage();
    this.isSwitcherOpened = false;
  }
}
