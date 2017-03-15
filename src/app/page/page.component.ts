import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { ToolService } from '../tool.service';
import { LanguageSwitcherService } from '../header/language-switcher/language-switcher.service';
import { Language } from '../types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.styl', './page.component.rtl.styl'],
  providers: [LanguageSwitcherService, ToolService]
})
export class PageComponent {

  private embeddedView: boolean = false;
  private languageKey: string;

  constructor(private router: Router, private languageSwitcherService: LanguageSwitcherService) {
    this.languageKey = this.languageSwitcherService.getLanguage().key;

    this.languageSwitcherService.getLanguageChangeEvents()
      .subscribe((language: Language) => {
        this.languageKey = language.key
      });

    this.router.events
      .subscribe((event: NavigationEvent) => {
        if(event instanceof NavigationEnd) {
          this.detectEmbeddedView();
        }
      });
  }

  public getPageClass(): string {
    const pageClass = ['wrapper'];
    this.embeddedView && pageClass.push('embedded-view');
    this.languageKey && pageClass.push(`page-lang-${this.languageKey}`);
    return pageClass.join(' ');
  }

  public baseElementClickHandler($event): void {
    const element = $event.target;

    const elemLangMobile = document.getElementsByClassName('lang-wrapper mobile')[0];
    const elemLangMobileVisible = elemLangMobile && window.getComputedStyle(elemLangMobile).display !== 'none';

    const elemLangDesktop = document.getElementsByClassName('lang-wrapper desktop')[0];
    const elemLangActive = elemLangMobileVisible ? elemLangMobile : elemLangDesktop;

    if (!elemLangActive.contains(element)) {
      this.languageSwitcherService.setSwitcherState(false);
    }
  };

  private detectEmbeddedView(): void {
    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);
    const queryParams = urlTree.queryParams || {};

    this.embeddedView = !!queryParams['embedded'];
  }
}
