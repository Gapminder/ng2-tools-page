import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { of } from 'rxjs/observable/of';
import { PromptForSharingLink, PromptForEmbeddedUrl, } from './user-interaction.actions';
import { LocationService } from '../../location.service';
import { BitlyService } from '../../bitly.service';

@Injectable()
export class UserInteractionEffects {
  @Effect({ dispatch: false })
  embeddedUrl$: Observable<Action> = this.actions$
    .ofType(PromptForEmbeddedUrl.TYPE)
    .switchMap(() => {
      const message = 'Copy this fragment and paste it in your website or blog:\n(more instructions on vizabi.org/tutorials)';

      prompt(message, wrapInIFrame(this.locationService.getUrlReadyForEmbedding()));

      return of({} as Action);
    });

  @Effect({ dispatch: false })
  shareLink$: Observable<Action> = this.actions$
    .ofType(PromptForSharingLink.TYPE)
    .switchMap(() =>
      this.bitlyService.shortenUrl()
        .do((shortened: string) => prompt('Copy the following link: ', shortened))
        .map(() => ({} as Action)));


  constructor(private actions$: Actions,
              private locationService: LocationService,
              private bitlyService: BitlyService) {
  }
}

function wrapInIFrame(content: string): string {
  return `<iframe src="${content}" style="width: 100%; height: 500px; margin: 0 0 0 0; border: 1px solid grey;"></iframe>`;
}
