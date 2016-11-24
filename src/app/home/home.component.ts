import { ElementRef, EventEmitter, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { defaultTranslations } from './default-translations';
import { VizabiService } from "ng2-vizabi";
import { ToolService } from './../tool.service';

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

  private toolDefault = 'bubbles';
  private toolKeys: Array<any>;
  private toolItems: any;
  private vizabiInstances = {};

  private toolsServiceLoaderEmitter: EventEmitter<any>;
  private toolsServiceChangeEmitter: EventEmitter<any>;

  constructor(
    private router: Router,
    private vService: VizabiService,
    private toolService: ToolService,
    private domElement: ElementRef
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
    const hash = window.location.hash.substring(1);
    const hashModel = this.vService.stringToModel(hash);

    if(!hashModel['chart-type'] || this.toolKeys.indexOf(hashModel['chart-type']) === -1) {
      const redirect = window.location.pathname + "#_chart-type=" + this.toolDefault;
      console.log("first load + redirect");

      window.location.href = redirect;
      this.toolService.changeActiveTool(this.toolDefault);

      return false;
    }

    // store hash model
    this.currentHashModel = hashModel;
    return true;
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
      reader: 'waffle',
      host: 'https://waffle-server.gapminderdev.org/',
      dataPath: '/api/ddf/',
      preloadPath: 'api/vizabi/'
    };
  }
  private setupVizabiDataCharts() {
    this.toolKeys.forEach(slug => {
      this.vizabiInstances[slug] = {
        modelHash: '',
        model: this.toolItems[slug].opts,
        chartType: this.toolItems[slug].tool
      };
    });
  }

  private setupChartType(slug = '') {

    const slugUpdate = slug || this.currentHashModel['chart-type'];

    if(!slug && slugUpdate != this.toolDefault) {
      return this.toolService.changeActiveTool(slugUpdate);
    }

    this.currentHashModel['chart-type'] = slugUpdate;
    this.currentChartType = slugUpdate;
  }

  private updateChartType(slug) {
    if(slug != this.currentChartType && this.validateUrl()) {
      this.scrollToChart(200, () => {
        this.setupChartType(slug);
      });
    }
  }

  private scrollToChart(durationLeft, complete) {
    //const element = document.querySelector('.wrapper');
    const element = document.querySelector('.wrapper');
    const positionFrom = element.scrollTop;
    const positionTo = 0 - positionFrom;
    console.log("scrollToChart", durationLeft, element.scrollTop);

    if(positionTo < 0) {
      const duration = durationLeft;
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

  onCreated(changes) {
    console.log("onCreate", changes);
  }
  onChanged(changes) {
    console.log("onChange", changes);
  }

  ngOnDestroy() {
    this.toolsServiceLoaderEmitter.unsubscribe();
  }
}
