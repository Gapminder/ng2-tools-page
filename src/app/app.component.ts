import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { State } from './core/store';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetectLanguage } from './core/store/language/language.actions';
import { EnableEmbeddedMode } from './core/store/layout/layout.actions';
import { ChangeClient } from './core/store/tools/tools.actions';

import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnDestroy {
  private languageDetectionSubscription: Subscription;
  private clientChangeDetectionSubscription: Subscription;
  private embeddedModeDetectionSubscription: Subscription;

  constructor(router: Router, store: Store<State>, activated: ActivatedRoute) {
    this.languageDetectionSubscription = router.events
      .filter(event => event instanceof NavigationEnd)
      .take(1)
      .subscribe(() => store.dispatch(new DetectLanguage()));

    this.embeddedModeDetectionSubscription = activated.queryParamMap
      .subscribe((paramMap: ParamMap) => {
        const embedded = paramMap.get('embedded') === 'true';
        if (embedded) {
          store.dispatch(new EnableEmbeddedMode(embedded));
        }
      });

    this.clientChangeDetectionSubscription = activated.params
      .subscribe((event: Params) => {
        if (!event.client) {
          return;
        }
        store.dispatch(new ChangeClient(event.client));
      });
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.languageDetectionSubscription,
      this.embeddedModeDetectionSubscription,
      this.clientChangeDetectionSubscription
    ];

    subscriptions.forEach(subscription => subscription && subscription.unsubscribe());
  }
}
