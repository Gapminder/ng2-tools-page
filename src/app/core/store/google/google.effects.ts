import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { GoogleAnalyticsService } from '../../google-analytics.service';
import { of } from 'rxjs/observable/of';
import { TrackGaPageEvent, TrackGaToolChangeEvent, TrackGaVizabiModelChangeEvent } from './google.actions';

@Injectable()
export class GoogleEffects {
  @Effect({ dispatch: false })
  gaToolChangeEvents$: Observable<Action> = this.actions$
    .ofType(TrackGaToolChangeEvent.TYPE)
    .switchMap((action: TrackGaToolChangeEvent) => {
      this.ga.trackToolChangedEvent({ from: action.fromTool, to: action.toTool });
      return of({} as Action);
    });

  @Effect({ dispatch: false })
  gaPageEvents$: Observable<Action> = this.actions$
    .ofType(TrackGaPageEvent.TYPE)
    .switchMap((action: TrackGaPageEvent) => {
      this.ga.trackPage(action.path);
      return of({} as Action);
    });

  @Effect({ dispatch: false })
  gaVizabiModelChangeEvents$: Observable<Action> = this.actions$
    .ofType(TrackGaVizabiModelChangeEvent.TYPE)
    .switchMap((action: TrackGaVizabiModelChangeEvent) => {
      this.ga.trackVizabiModelChangedEvent(action.path);
      return of({} as Action);
    });

  constructor(private actions$: Actions,
              private ga: GoogleAnalyticsService) {
  }
}
