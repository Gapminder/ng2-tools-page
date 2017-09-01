import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LanguageService } from '../../language.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { ChangeLanguage, DetectLanguage } from './language.actions';

@Injectable()
export class LanguageEffects {

  @Effect()
  language$: Observable<Action> = this.actions$
    .ofType(DetectLanguage.TYPE)
    .switchMap(() => {
      const detectedLanguage = this.langService.detectLanguage();
      return of(new ChangeLanguage(detectedLanguage));
    });

  constructor(private actions$: Actions,
              private langService: LanguageService) {
  }
}
