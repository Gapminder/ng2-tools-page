import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { LanguageSwitcherService } from './header/language-switcher/language-switcher.service';
import { ToolService } from './tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [LanguageSwitcherService, ToolService]
})
export class AppComponent {
  // relatedItems = RelatedItemsComponent;
  // seeAlso = SeeAlsoComponent;
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

  private detectEmbeddedView() {
    const pathSearch = this.router.url;
    const urlTree = this.router.parseUrl(pathSearch);
    const queryParams = urlTree.queryParams || {};

    this.embeddedView = !!queryParams['embedded'] ? true : false;
  }

}
