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
  private currentHashModel: any;
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
    this.toolService.getToolLoadEvents().subscribe(data => {
      this.toolKeys = data.keys;
      this.toolItems = data.items;
      this.process();
    });

    this.toolService.getToolChangeEvents().subscribe(data => {
      this.updateChartType(data.active);
    });

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.urlChanged(event);
      }
    });

    this.langService.getLanguageChangeEvents().subscribe((language: Language) => {
      this.updateLanguage(language);
    });
  }

  private process(): void {
    this.setupVizabiDataBase();
    this.setupVizabiDataCharts();
    this.processUrl();
  }

  private processUrl(): void {
    const hashModel = this.vizabiService.stringToModel(ToolService.getUrlHash());

    if (this.validateChartType(hashModel)) {
      this.currentHashModel = hashModel;
      this.setupChartType();
      return;
    }

    // Home url by default
    window.location.href = `${window.location.pathname}#_chart-type=${this.toolDefault}`;
    this.currentHashModel = {'chart-type': this.toolDefault};
    this.toolService.changeActiveTool(this.toolDefault);
  }

  private validateChartType(hashModel: any): boolean {
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
    if (slug == this.currentChartType) {
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
    const vizabiModelString = this.vizabiService.modelToString(this.currentHashModel);

    // update:: not from model, but from url directly (back button)
    if (hashModelString != vizabiModelString && this.currentHashModel && this.currentChartType) {
      // store new state to stop urlChange event
      this.currentHashModel = this.vizabiService.stringToModel(hashModelString);
      const hashChartType = this.currentHashModel['chart-type'];

      if(!this.isVizabiInstanceInitialized(hashChartType)) {
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
  }

  private updateUrlHash(model: any): void {
    const modelForUpdate = this.vizabiService.modelToString(model);
    const modelCurrent = this.vizabiService.modelToString(this.currentHashModel);

    if (modelForUpdate != modelCurrent) {
      this.currentHashModel = model;
      window.location.hash = "#" + modelForUpdate;
    }

    const currentPathWithHash = this.location.path(true);
    this.ga.trackPage(currentPathWithHash);
    this.ga.trackVizabiModelChangedEvent(currentPathWithHash);
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
    if (!this.currentHashModel) {
      return;
    }

    if(!this.isVizabiInstanceInitialized(this.currentChartType)) {
      return;
    }

    const langModel = {locale: {id: language.key}};
    const updateModel = _.extend({}, this.currentHashModel, langModel);

    this.updateUrlHash(updateModel);

    this.currentHashModel = updateModel;
    const newModelState = _.extend({}, this.vizabiInstances[this.currentChartType].modelInitial, updateModel);
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

    const modelDiff = changes.modelDiff;
    modelDiff['chart-type'] = this.getChartType(changes.type);

    // vizabi issue :: don't remove/reset some values from model, using `setModel`
    this.updateUrlHash(changes.modelDiff);
  }
}
