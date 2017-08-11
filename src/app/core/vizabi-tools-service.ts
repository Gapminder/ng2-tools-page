import { Injectable } from '@angular/core';
import { VizabiService } from 'ng2-vizabi';
import { LocationService } from './location.service';
import * as _ from 'lodash';

@Injectable()
export class VizabiToolsService {

  constructor(private vizabiService: VizabiService, private locationService: LocationService) {
  }

  getToolFromUrl(): string {
    const model = this.getModelFromUrl();
    return model ? model['chart-type'] : null;
  }

  areModelsEqual(modelA: any, modelB: any): boolean {
    return !_.isEqual(modelA, modelB);
  }

  getLocaleIdFromUrl(): string {
    const model = this.getModelFromUrl();
    return _.get(model, 'locale.id') as string;
  }

  simplifyModel(model: any): any {
    return _.pick(this.getModelFromUrl(), ['locale', 'chart-type']);
  }

  getModelFromUrl(): any {
    return this.vizabiService.stringToModel(this.locationService.getUrlHash());
  }

  convertModelToString(model: any): string {
    return this.vizabiService.modelToString(model);
  }
}
