import { Injectable } from '@angular/core';
import { VizabiService } from 'ng2-vizabi';
import { LocationService } from './location.service';
import { isEqual, get, pick } from 'lodash-es';
import { TransitionType } from './charts-transition';

@Injectable()
export class VizabiToolsService {

  constructor(private vizabiService: VizabiService, private locationService: LocationService) {
  }

  getToolFromUrl(): string {
    const model = this.getModelFromUrl();

    return model ? model['chart-type'] : null;
  }

  areModelsEqual(modelA, modelB): boolean {
    return isEqual(modelA, modelB);
  }

  getLocaleIdFromUrl(): string {
    const model = this.getModelFromUrl();

    return get(model, 'locale.id') as string;
  }

  simplifyModel(transitionType: TransitionType) {
    let expectedModelFields = ['locale', 'chart-type', 'state.marker.select'];

    if (transitionType === TransitionType.FromSelectToShow) {
      expectedModelFields = ['locale', 'chart-type', 'state.marker.select'];
    }

    if (transitionType === TransitionType.FromShowToSelect) {
      expectedModelFields = ['locale', 'chart-type', 'state.entities.show'];
    }

    if (transitionType === TransitionType.FromNeither || transitionType === TransitionType.ToNeither) {
      expectedModelFields = ['locale', 'chart-type'];
    }

    return pick(this.getModelFromUrl(), expectedModelFields);
  }

  getModelFromUrl() {
    return this.vizabiService.stringToModel(this.locationService.getUrlHash());
  }

  convertModelToString(model): string {
    return this.vizabiService.modelToString(model);
  }

  getModelFromString(fragment: string) {
    return this.vizabiService.stringToModel(fragment);
  }
}
