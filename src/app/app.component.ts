import { Component, ViewEncapsulation } from '@angular/core';
import { State } from './core/store';
import { ActivatedRoute, Event, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetectLanguage } from './core/store/language/language.actions';
import { EnableEmbeddedMode } from './core/store/layout/layout.actions';
import { ChangeClient } from './core/store/tools/tools.actions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  constructor(router: Router, store: Store<State>, activated: ActivatedRoute) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        store.dispatch(new DetectLanguage());
      }
    });

    activated.queryParamMap.subscribe((paramMap: ParamMap) => {
      const embedded = paramMap.get('embedded') === 'true';
      if (embedded) {
        store.dispatch(new EnableEmbeddedMode(embedded));
      }
    });

    activated.params.subscribe((event: Params) => {
      if (!event.client) {
        return;
      }
      store.dispatch(new ChangeClient(event.client));
    });
  }
}
