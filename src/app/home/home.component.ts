import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { LanguageSwitcherService } from '../header/language-switcher/language-switcher.service';
import { ToolService } from '../tool.service';
import { environment } from '../../environments/environment';

import { VizabiService } from "ng2-vizabi";
import * as _ from "lodash";
import { GoogleAnalyticsService } from '../google-analytics.service';
import { Language } from '../types';

import 'rxjs/add/operator/distinctUntilChanged';

const WSReader = require('vizabi-ws-reader').WSReader;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements AfterViewInit {
  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;
  private metadata: any;
  private extResources: any;
  private stopUrlRedirect: boolean;

  private currentChartType: string = '';
  public currentHashModel: any;
  private switchingReady: boolean = true;

  private toolDefault = 'bubbles';
  private toolKeys: Array<any>;
  private toolItems: any;
  private toolTypeMatch: any = {};
  private vizabiInstances: any = {};

  constructor(private router: Router,
              private location: Location,
              private vizabiService: VizabiService,
              private toolService: ToolService,
              private langService: LanguageSwitcherService,
              private ga: GoogleAnalyticsService) {
  }

  public ngAfterViewInit(): void {
    this.toolItems = this.toolService.getTools();
    this.toolKeys = this.toolService.getToolKeys();
    this.setupVizabiDataBase();
    this.setupVizabiDataCharts();
    this.processUrl();
    this.updateChartType(this.toolService.getActive());

    this.toolService.getToolChangeEvents().subscribe(data => {
      this.updateChartType(data.active);
    });

    this.router.events
    .filter((event: any) => event instanceof NavigationEnd)
    .filter((event: NavigationEnd) => !this.currentModelEqualsToModelInUrl(event.url))
    .subscribe((event: NavigationEvent) => {
      this.urlChanged(event);
    });

    this.langService.getLanguageChangeEvents().subscribe((language: Language) => {
      this.updateLanguage(language);
    });
  }

  private processUrl(): void {
    const hashModel = this.vizabiService.stringToModel(ToolService.getUrlHash());
    if (this.chartTypeExistsIn(hashModel)) {
      this.currentHashModel = hashModel;
      this.setupChartType();
    } else {
      window.location.href = `${window.location.pathname}#_chart-type=${this.toolDefault}`;
      this.currentHashModel = {'chart-type': this.toolDefault};
    }
  }

  private chartTypeExistsIn(hashModel: any): boolean {
    return hashModel.hasOwnProperty('chart-type') && _.includes(this.toolKeys, hashModel['chart-type']);
  }

  private setupVizabiDataBase(): void {
    this.readerModuleObject = new WSReader();
    this.readerGetMethod = 'getReader';
    this.readerParams = [];
    this.readerName = 'waffle';
    this.metadata = {};
    this.stopUrlRedirect = true;
    this.extResources = {
      host: environment.wsUrl + '/',
      dataPath: '/api/ddf/',
      preloadPath: 'api/vizabi/'
    };
  }

  private setupVizabiDataCharts(): void {
    const hashModel = this.vizabiService.stringToModel(ToolService.getUrlHash());
    const slugFromHash = hashModel['chart-type'] || false;

    this.toolKeys.forEach(slug => {
      const chartType = this.toolItems[slug].tool;
      this.toolTypeMatch[chartType] = slug;

      this.vizabiInstances[slug] = {
        modelHash: '',
        chartType: chartType,
        model: _.cloneDeep(this.toolItems[slug].opts),
        instance: {},
        modelInitial: {}
      };
    });

    if (slugFromHash && _.includes(this.toolKeys, slugFromHash)) {
      this.vizabiInstances[slugFromHash].modelHash = ToolService.getUrlHash();
    }
  }

  public getVizabiInitialModel(slug: string): any {
    const initialModel = _.extend(this.vizabiInstances[slug].model, this.langService.getLocale());
    if (slug === 'mountain') {
      _.extend(_.get(initialModel, 'state.marker.group'), {manualSorting: ["asia", "africa", "americas", "europe"]});
    }
    return initialModel;
  }

  private setupChartType(slug: string = ''): void {

    const slugUpdate = slug || this.currentHashModel['chart-type'];

    // first load
    if (!slug) {
      this.toolService.changeActiveTool(slugUpdate);
      return;
    }

    this.currentHashModel['chart-type'] = slugUpdate;
    this.currentChartType = slugUpdate;
  }

  private updateChartType(slug: string): void {
    if (slug === this.currentChartType) {
      return;
    }

    this.switchingReady = false;
    this.scrollToChart(200, () => {
      this.setupChartType(slug);
      setTimeout(() => {
        this.switchingReady = true;
      }, 10);
    });
  }

  private urlChanged(event: NavigationEvent): void {
    const hashModelString = ToolService.getUrlHash(event.url);

    // update:: not from model, but from url directly (back button)
    this.currentHashModel = this.vizabiService.stringToModel(hashModelString);
    const hashChartType = this.currentHashModel['chart-type'];

    if (!this.isVizabiInstanceInitialized(hashChartType)) {
      return;
    }

    if (this.currentChartType !== hashChartType) {
      this.vizabiInstances[hashChartType].modelHash = ToolService.getUrlHash();
      this.setupChartType(hashChartType);
      return;
    }

    const newModelState = _.extend({}, this.vizabiInstances[this.currentChartType].modelInitial, this.currentHashModel);
    this.vizabiInstances[this.currentChartType].instance.setModel(newModelState);
  }

  private getChartType(chartType: string): any {
    return this.toolTypeMatch[chartType];
  }

  private scrollToChart(durationLeft, complete) {
    const element = document.querySelector('.wrapper');
    const positionFrom = element.scrollTop;
    const positionTo = 0 - positionFrom;

    if (positionTo < 0) {
      const positionDiff = positionTo / durationLeft * 10;
      element.scrollTop += positionDiff;
      setTimeout(() => {
        this.scrollToChart(durationLeft - 25, complete);
      }, 25);
    } else {
      complete();
    }
  }

  private isVizabiInstanceInitialized(chartType: string): boolean {
    return !_.isEmpty(_.get(this.vizabiInstances, `${chartType}.instance`))
  }

  private updateLanguage(language: Language): void {
    if (!this.currentHashModel || !this.isVizabiInstanceInitialized(this.currentChartType)) {
      return;
    }

    const newHashModel = _.extend({}, this.currentHashModel, this.langService.getLocale(language));
    const newModelState = _.extend({}, this.vizabiInstances[this.currentChartType].modelInitial, newHashModel);
    this.vizabiInstances[this.currentChartType].instance.setModel(newModelState);
  }

  public onCreated(changes: any): void {
    setTimeout(() => {
      const slug = this.getChartType(changes.type);

      this.vizabiInstances[slug].modelHash = '';
      this.vizabiInstances[slug].model = _.cloneDeep(this.toolItems[slug].opts);
      this.vizabiInstances[slug].model['chart-type'] = slug;
      this.vizabiInstances[slug].instance = changes.component;
      this.vizabiInstances[slug].modelInitial = changes.component.getModel();
    }, 10);
  }

  public onChanged(changes: any): void {
    const newModelBase = this.langService.getLocale();
    const modelDiff = _.extend(newModelBase, changes.modelDiff);

    if (!this.areModelsEqual(modelDiff, this.currentHashModel)) {
      this.currentHashModel = _.extend(modelDiff, {'chart-type': this.getChartType(changes.type)});
      window.location.hash = `#${this.vizabiService.modelToString(this.currentHashModel)}`;

      const currentPathWithHash = this.location.path(true);
      this.ga.trackPage(currentPathWithHash);
      this.ga.trackVizabiModelChangedEvent(currentPathWithHash);
    }
  }

  private currentModelEqualsToModelInUrl(modelFromUrlAsString: string): boolean {
    const hashModelFromUrl = this.vizabiService.stringToModel(ToolService.getUrlHash(modelFromUrlAsString));
    return this.areModelsEqual(hashModelFromUrl, this.currentHashModel);
  }

  private areModelsEqual(modelA: any, modelB: any) {
    return _.isEqual(modelA, modelB);
  }
}
