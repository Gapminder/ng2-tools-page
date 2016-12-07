import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ToolService } from './../tool.service';
import { LanguageSwitcherService } from './../header/language-switcher/language-switcher.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.styl'],
  providers: [LanguageSwitcherService, ToolService]
})
export class PageComponent implements OnInit {

  router: Router;
  embeddedView = false;

  constructor(router: Router) {
    this.router = router;
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.detectEmbeddedView();
      }
    });
  }

  ngOnInit() {
  }

  private detectEmbeddedView() {
    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);
    const queryParams = urlTree.queryParams || {};

    this.embeddedView = !!queryParams['embedded'] ? true : false;
  }
}
