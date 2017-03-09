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
  public isSwitcherOpened: boolean = false;

  constructor (private languageService: LanguageSwitcherService) {
    this.languageService.getSwitcherStateEvents()
      .subscribe(state => this.isSwitcherOpened = state);
  }

  public changeLanguage(language: Language): void {
    this.isSwitcherOpened = false;
    this.languageService.setLanguage(language);
  }
}
