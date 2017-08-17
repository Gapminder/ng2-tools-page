import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { from } from 'rxjs/observable/from';
import { defer } from 'rxjs/observable/defer';
import { FlashDetectService } from '../flash-detect.service';
import { FlashAvailabilityDetermined } from './layout/layout.actions';
import { SelectTool } from './tools/tools.actions';
import { VizabiToolsService } from '../vizabi-tools-service';

@Injectable()
export class InitEffects {

  @Effect()
  init$: Observable<Action> = defer(() => {
    return from([
      new FlashAvailabilityDetermined(this.flashService.installed),
      new SelectTool(this.vizabiToolsService.getToolFromUrl())
    ]);
  });

  constructor(private flashService: FlashDetectService,
              private vizabiToolsService: VizabiToolsService) {
  }
}
