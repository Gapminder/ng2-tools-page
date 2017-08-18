import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { of } from 'rxjs/observable/of';
import { ChangeClient, ChangeConfig } from './tools.actions';
import { CLIENT_CONFIGS } from './vizabi-configurations';

@Injectable()
export class ToolsEffects {

  @Effect()
  clients$: Observable<Action> = this.actions$
    .ofType(ChangeClient.TYPE)
    .switchMap((action: ChangeClient) => {
      return of(new ChangeConfig(CLIENT_CONFIGS[action.client]));
    });

  constructor(private actions$: Actions) {
  }
}
