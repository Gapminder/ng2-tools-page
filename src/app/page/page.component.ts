import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ToolService } from './../tool.service';
import { LanguageSwitcherService } from './../header/language-switcher/language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.styl', './page.component.rtl.styl'],
  providers: [LanguageSwitcherService, ToolService]
})
export class PageComponent implements OnInit {

  router: Router;
  languageSwitcherService: LanguageSwitcherService;

  embeddedView = false;
  languageKey = '';

  constructor(router: Router, languageSwitcherService: LanguageSwitcherService) {
    this.languageSwitcherService = languageSwitcherService;
    this.languageSwitcherService.getSwitcherStateEmitter()
      .subscribe(langItem => this.languageKey = langItem.key);

    this.router = router;
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.detectEmbeddedView();
      }
    });
  }

  ngOnInit() {
  }

  public getPageClass() {
    let pageClass = ['wrapper'];
    this.embeddedView && pageClass.push('embedded-view');
    this.languageKey && pageClass.push(`page-lang-${this.languageKey}`);
    return pageClass.join(' ');
  }

  public baseElementClickHandler($event) {
    const element = $event.target;

    const elemLangMobile = document.getElementsByClassName('lang-wrapper mobile')[0];
    const elemLangMobileVisible = elemLangMobile && window.getComputedStyle(elemLangMobile).display !== 'none';

    const elemLangDesktop = document.getElementsByClassName('lang-wrapper desktop')[0];
    //const elemLangDesktopVisible = elemLangDesktop && window.getComputedStyle(elemLangDesktop).display!='none';

    const elemLangActive = elemLangMobileVisible ? elemLangMobile : elemLangDesktop;

    if (!elemLangActive.contains(element)) {
      this.languageSwitcherService.setSwitcherState(false);
    }
    console.log("handler");
  };

  private detectEmbeddedView() {
    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);
    const queryParams = urlTree.queryParams || {};

    this.embeddedView = !!queryParams['embedded'] ? true : false;
  }
}
