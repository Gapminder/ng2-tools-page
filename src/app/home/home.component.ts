import { ElementRef, EventEmitter, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { LanguageSwitcherService } from './../header/language-switcher/language-switcher.service';

import { defaultTranslations } from './default-translations';
import { VizabiService } from "ng2-vizabi";
import { ToolService } from './../tool.service';
import * as _ from "lodash";

const WSReader = require('vizabi-ws-reader').WSReader;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  private readerModuleObject: any;
  private readerGetMethod: string;
  private readerParams: Array<any>;
  private readerName: string;
  private metadata: any;
  private translations: any;
  private extResources: any;
  private stopUrlRedirect: boolean;

  private currentChartType = '';
  private currentHashModel: any;
  private switchingReady: boolean = true;

  private toolDefault = 'bubbles';
  private toolKeys: Array<any>;
  private toolTypeMatch = {};
  private toolItems: any;
  private vizabiInstances = {};

  private langServiceEmitter: EventEmitter<any>;
  private toolsServiceLoaderEmitter: EventEmitter<any>;
  private toolsServiceChangeEmitter: EventEmitter<any>;

  constructor(
    private router: Router,
    private vService: VizabiService,
    private toolService: ToolService,
    private domElement: ElementRef,
    private langService:LanguageSwitcherService
  ) {

    this.toolsServiceLoaderEmitter = this.toolService.getToolLoaderEmitter()
      .subscribe(data => {
        this.toolKeys = data.keys;
        this.toolItems = data.items;
        this.process();
      });

    this.toolsServiceChangeEmitter = this.toolService.getToolChangeEmitter()
      .subscribe(data => {
        this.updateChartType(data.active);
      });

    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.urlChanged(event);
      }
    });

    this.langServiceEmitter = this.langService.getLanguageChangeEmitter()
      .subscribe(langItem => this.updateLanguage(langItem));
  }

  ngOnInit() {}

  private process() {

    this.setupVizabiDataBase();
    this.setupVizabiDataCharts();

    if(this.validateUrl()) {
      this.setupChartType();
    }
  }

  private validateUrl() {

    const hash = this.getUrlHash();
    const hashModel = this.vService.stringToModel(hash);

    if(!hashModel['chart-type'] || this.toolKeys.indexOf(hashModel['chart-type']) === -1) {
      const redirect = window.location.pathname + "#_chart-type=" + this.toolDefault;
      window.location.href = redirect;

      this.toolService.changeActiveTool(this.toolDefault);
      return false;
    }

    this.currentHashModel = this.vService.stringToModel(hash);
    return true;
  }

  private getUrlHash(hash = '') {
    hash = hash || window.location.hash;
    const hashPosition = hash.indexOf("#") + 1;
    return hash.substring(hashPosition);
  }

  private setupVizabiDataBase() {
    this.readerModuleObject = new WSReader();
    this.readerGetMethod = 'getReader';
    this.readerParams = [];
    this.readerName = 'waffle';
    this.metadata = {};
    this.translations = defaultTranslations;
    this.stopUrlRedirect = true;
    this.extResources = {
      host: 'https://waffle-server-dev.gapminderdev.org/',
      dataPath: '/api/ddf/',
      preloadPath: 'api/vizabi/'
    };
  }

  private setupVizabiDataCharts() {

    const hash = this.getUrlHash();
    const hashModel = this.vService.stringToModel(hash);
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

    // update hashModel from Url
    if(slugFromHash && this.toolKeys.indexOf(slugFromHash) !== -1) {
      this.vizabiInstances[slugFromHash].modelHash = this.getUrlHash();
    }
  }

  private setupChartType(slug = '') {

    const slugUpdate = slug || this.currentHashModel['chart-type'];

    // first load
    if(!slug && slugUpdate != this.toolDefault) {
      return this.toolService.changeActiveTool(slugUpdate);
    }

    this.currentHashModel['chart-type'] = slugUpdate;
    this.currentChartType = slugUpdate;
  }

  private updateChartType(slug) {
    if(slug != this.currentChartType && this.validateUrl()) {
      this.switchingReady = false;
      this.scrollToChart(200, () => {
        this.setupChartType(slug);
        setTimeout(() => {
          this.switchingReady = true;
        }, 10);
      });
    }
  }

  private urlChanged(event) {

    const hashModelString = this.getUrlHash(event.url);
    const vizabiModelString = this.vService.modelToString(this.currentHashModel);

    // update:: not from model, but from url directly (back button)
    if(hashModelString != vizabiModelString && this.currentHashModel && this.currentChartType) {
      // store new state to stop urlChange event
      this.currentHashModel = this.vService.stringToModel(hashModelString);
      // update vizabi model
      const newModelState = _.extend({}, this.vizabiInstances[this.currentChartType].modelInitial, this.currentHashModel);
      this.vizabiInstances[this.currentChartType].instance.setModel(newModelState);
    }
  }

  private updateUrlHash(model) {
    const modelForUpdate = this.vService.modelToString(model);
    const modelCurrent = this.vService.modelToString(this.currentHashModel);

    if(modelForUpdate != modelCurrent) {
      this.currentHashModel = model;
      window.location.hash = "#" + modelForUpdate;
    }
  }

  private getChartType(chartType) {
    return this.toolTypeMatch[chartType];
  }

  private scrollToChart(durationLeft, complete) {
    //const element = document.querySelector('.wrapper');
    const element = document.querySelector('.wrapper');
    const positionFrom = element.scrollTop;
    const positionTo = 0 - positionFrom;

    if(positionTo < 0) {
      const positionDiff = positionTo / durationLeft * 10;
      element.scrollTop += positionDiff;
      // next tick
      setTimeout(() => {
        this.scrollToChart(durationLeft - 25, complete);
      }, 25);
    } else {
      complete();
    }
  }

  private updateLanguage(langItem) {
    if(!this.currentHashModel) {
      return;
    }

    const langModel = {locale: {id: langItem.key}};
    const updateModel = _.extend({}, this.currentHashModel, langModel);

    this.updateUrlHash(updateModel);

    this.currentHashModel = updateModel;
    const newModelState = _.extend({}, this.vizabiInstances[this.currentChartType].modelInitial, updateModel);
    this.vizabiInstances[this.currentChartType].instance.setModel(newModelState);
  }

  onCreated(changes) {

    // console.log("onCreate", changes);

    // reset instance for switching
    setTimeout(() => {

      const slug = this.getChartType(changes.type);

      // clear hash model after init :: required after chart switching
      this.vizabiInstances[slug].modelHash = '';
      this.vizabiInstances[slug].model = _.cloneDeep(this.toolItems[slug].opts);
      this.vizabiInstances[slug].model['chart-type'] = slug;

      // store vizabi instance and Initial Model
      this.vizabiInstances[slug].instance = changes.component;
      this.vizabiInstances[slug].modelInitial = changes.component.getModel();
    }, 10);

  }
  onChanged(changes) {

    // console.log("onChange", changes);

    const modelDiff = changes.modelDiff;
    modelDiff['chart-type'] = this.getChartType(changes.type);

    this.updateUrlHash(changes.modelDiff);
  }

  ngOnDestroy() {
    this.langServiceEmitter.unsubscribe();
    this.toolsServiceLoaderEmitter.unsubscribe();
    this.toolsServiceChangeEmitter.unsubscribe();
  }
}
