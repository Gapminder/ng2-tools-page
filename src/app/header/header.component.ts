import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageSwitcherService } from './language-switcher/language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {

  mobileMenuHidden = true;
  languageSwitcherService: LanguageSwitcherService;

  constructor(languageSwitcherService: LanguageSwitcherService) {
    this.languageSwitcherService = languageSwitcherService;
    this.languageSwitcherService.getLanguageChangeEmitter()
      .subscribe(langItem => this.mobileMenuHidden = true);
  }
}
