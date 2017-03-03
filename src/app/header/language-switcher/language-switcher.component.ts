import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher.service';
import { Language } from '../../types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-language-switcher',
  templateUrl: 'language-switcher.component.html',
  styleUrls: ['language-switcher.component.styl']
})
export class LanguageSwitcherComponent {

  private selectedLanguage: Language;
  public isSwitcherOpened: boolean = false;

  constructor (private languageService: LanguageSwitcherService) {
    this.languageService.getLanguageChangeEvents()
      .subscribe((language: Language) => this.selectedLanguage = language);

    this.languageService.getSwitcherStateEvents()
      .subscribe(state => this.isSwitcherOpened = state);

    this.selectedLanguage = this.languageService.getLanguage();
  }

  public changeLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.selectedLanguage = this.languageService.getLanguage();
    this.isSwitcherOpened = false;
  }
}
