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
  embeddedView = false;
  languageKey = '';

  constructor(router: Router, languageSwitcherService: LanguageSwitcherService) {
    this.router = router;

    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.detectEmbeddedView();
      }
    });

    languageSwitcherService.getLanguageChangeEmitter()
      .subscribe(langItem => this.languageKey = langItem.key);
  }

  ngOnInit() {
  }

  public getPageClass() {
    let pageClass = ['wrapper'];
    this.embeddedView && pageClass.push('embedded-view');
    this.languageKey && pageClass.push(`page-lang-${this.languageKey}`);
    return pageClass.join(' ');
  }

  private detectEmbeddedView() {
    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);
    const queryParams = urlTree.queryParams || {};

    this.embeddedView = !!queryParams['embedded'] ? true : false;
  }
}
