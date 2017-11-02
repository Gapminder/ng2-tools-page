import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { get, cloneDeep, includes, isEmpty, omitBy, map, difference } from 'lodash-es';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Store } from '@ngrx/store';
import {
  getCreatedVizabiInstance,
  getCurrentLocale,
  getCurrentVizabiModelHash,
  getInitialToolsSetup,
  getSelectedTool, isVizabiReady,
  State
} from '../core/store';
import { TrackGaPageEvent, TrackGaVizabiModelChangeEvent } from '../core/store/google/google.actions';
import { VizabiLocale } from '../core/store/language/language';
import { SelectTool, VizabiInstanceCreated, VizabiModelChanged } from '../core/store/tools/tools.actions';
import { Subscription } from 'rxjs/Subscription';
import { VizabiToolsService } from '../core/vizabi-tools-service';
import { getTransitionType, TransitionType } from '../core/charts-transition';

const {WsReader} = require('vizabi-ws-reader');
const MODEL_CHANGED_DEBOUNCE = 200;

const GA_TRACKER_NAME_AND_METHOD = 'toolsPageTracker.send';
const GA_TYPE = 'event';
const GA_EVENT_ACTION_REQUEST = 'request';
const GA_EVENT_ACTION_RESPONSE = 'response';
const INITIAL_VIZABI_MODEL_INDICATORS = Object.freeze({axis_x: {}, axis_y: {}, size: {}});
const EXCEPTIONAL_VIZABI_CHARTS = ['LineChart', 'PopByAge'];

declare const ga: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements AfterViewInit, OnDestroy {
  slugs: string[];
  currentChartType = '';
  currentHashModel;

  readerModuleObject = WsReader;
  readerPlugins = [{onReadHook: this.sendQueriesStatsToGA.bind(this)}];
  extResources = {
    host: `${environment.wsUrl}/`,
    dataPath: '/api/ddf/',
    preloadPath: 'api/vizabi/'
  };

  private defaultTool: string;
  private tools;
  private toolToSlug = {};
  private vizabiInstances = {};
  private vizabiModelChangesSubscription: Subscription;
  private vizabiChartTypeChangesSubscription: Subscription;
  private vizabiCreationSubscription: Subscription;
  private initialToolsSetupSubscription: Subscription;
  private localeChangesSubscription: Subscription;
  private toolChangesSubscription: Subscription;
  private routesModelChangesSubscription: Subscription;
  private vizabiModelIndicators = cloneDeep(INITIAL_VIZABI_MODEL_INDICATORS);
  private vizabiModelGeoEntities = [];

  constructor(private router: Router,
              private location: Location,
              private vizabiToolsService: VizabiToolsService,
              private store: Store<State>) {
    this.initialToolsSetupSubscription = this.store.select(getInitialToolsSetup).subscribe(initial => {
      this.tools = initial.tools;
      this.slugs = initial.slugs;
      this.defaultTool = initial.defaultTool;
      this.toolToSlug = initial.toolToSlug;
      this.vizabiInstances = initial.initialVizabiInstances;

      const model = this.vizabiToolsService.getModelFromUrl();
      this.store.dispatch(new VizabiModelChanged(model));
    });

    this.vizabiCreationSubscription = this.store.select(getCreatedVizabiInstance)
      .filter(({tool, instance}) => !!tool).subscribe(({tool, instance}) => {
        this.vizabiInstances[tool] = {...this.vizabiInstances[tool], ...instance};
      });

    this.vizabiModelChangesSubscription = this.store.select(getCurrentVizabiModelHash)
      .filter(hashModel => !this.vizabiToolsService.areModelsEqual(this.currentHashModel, hashModel))
      .filter(hashModel => !!Object.keys(hashModel).length)
      .map(hashModel => {
        if (!includes(this.slugs, hashModel['chart-type'])) {
          return {'chart-type': 'bubbles'};
        }

        return hashModel;
      })
      .debounceTime(MODEL_CHANGED_DEBOUNCE)
      .subscribe(hashModel => {
        const oldHashModel = this.currentHashModel;

        this.currentHashModel = hashModel;
        this.currentChartType = hashModel['chart-type'];

        const restoredStringModel = this.restoreState(hashModel, oldHashModel);
        const stringModel = restoredStringModel || this.vizabiToolsService.convertModelToString(this.currentHashModel);

        window.location.hash = `#${stringModel}`;

        this.vizabiInstances[this.currentChartType].modelHash = stringModel;

        const currentPathWithHash = this.location.path(true);

        this.store.dispatch(new TrackGaPageEvent(currentPathWithHash));
        this.store.dispatch(new TrackGaVizabiModelChangeEvent(currentPathWithHash));

        const vizabiInstance = this.vizabiInstances[this.currentChartType].instance;

        if (vizabiInstance.setModel && vizabiInstance._ready) {
          vizabiInstance.setModel(this.currentHashModel);
        }
      });

    this.vizabiChartTypeChangesSubscription = this.store.select(getCurrentVizabiModelHash)
      .filter(hashModel => {
        return hashModel && hashModel['chart-type'] && this.currentHashModel &&
          this.currentHashModel['chart-type'] !== hashModel['chart-type'];
      })
      .debounceTime(MODEL_CHANGED_DEBOUNCE)
      .subscribe(hashModel => {
        this.vizabiModelIndicators = cloneDeep(INITIAL_VIZABI_MODEL_INDICATORS);
        this.vizabiModelGeoEntities = [];
        this.currentChartType = hashModel['chart-type'];
      });
  }

  restoreState(hashModel, oldHashModel): string {
    let newUrlHash = null;
    let modelChanged = false;

    if (hashModel.state && oldHashModel && oldHashModel.state) {
      const chartTransitionType = getTransitionType(oldHashModel['chart-type'], this.currentHashModel['chart-type']);
      const dim = this.vizabiInstances[this.currentChartType].model.state.entities.dim;

      if (chartTransitionType === TransitionType.FromSelectToShow) {
        const dimToShow = oldHashModel.state.marker.select.map(item => item[dim]);

        this.currentHashModel.state = {entities: {show: {[dim]: {$in: dimToShow}}}};

        modelChanged = true;
      }

      if (chartTransitionType === TransitionType.FromShowToSelect) {
        let dimToSelect = [];

        if (oldHashModel.state.entities.show[dim] && !isEmpty(oldHashModel.state.entities.show[dim].$in)) {
          dimToSelect = oldHashModel.state.entities.show[dim].$in.map(item => ({[dim]: item}));
        }

        this.currentHashModel.state = {marker: {select: dimToSelect}};

        modelChanged = true;
      }

      if (chartTransitionType === TransitionType.FromNeither || chartTransitionType === TransitionType.ToNeither) {
        this.currentHashModel.state = {};

        modelChanged = true;
      }

      if (modelChanged) {
        newUrlHash = this.vizabiToolsService.convertModelToString(this.currentHashModel);
      }
    }

    return newUrlHash;
  }

  ngAfterViewInit(): void {
    this.routesModelChangesSubscription = this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        const model = this.vizabiToolsService.getModelFromUrl();
        this.store.dispatch(new VizabiModelChanged(model));
      });

    this.toolChangesSubscription = this.store.select(getSelectedTool).subscribe(selectedTool => {
      const urlModel = this.vizabiToolsService.getModelFromUrl();
      const toolInUrlIsSame = urlModel && urlModel['chart-type'] === selectedTool;
      const chartTransitionType = getTransitionType(this.currentChartType, selectedTool);

      this.store.dispatch(new VizabiModelChanged(
        toolInUrlIsSame
          ? urlModel
          : Object.assign(this.vizabiToolsService.simplifyModel(chartTransitionType), {'chart-type': selectedTool}))
      );
    });

    this.localeChangesSubscription = this.store.select(getCurrentLocale).subscribe((locale: VizabiLocale) => {
      const model = {...this.vizabiToolsService.getModelFromUrl(), ...locale};
      this.store.dispatch(new VizabiModelChanged(model));
    });
  }

  getVizabiInitialModel(slug: string) {
    const initialModel = this.vizabiInstances[slug].model;

    if (slug === 'mountain') {
      Object.assign(get(initialModel, 'state.marker.group'), {manualSorting: ['asia', 'africa', 'americas', 'europe']});
    }

    return initialModel;
  }

  onCreated(changes): void {
    const slug = this.toolToSlug[changes.type];
    const instance = {
      'chart-type': slug,
      model: cloneDeep(this.tools[slug].opts),
      instance: changes.component
    };

    this.store.dispatch(new VizabiInstanceCreated(instance, slug));
  }

  onChanged(changes): void {
    const modelDiff = get(changes, 'modelDiff');
    const type = get(changes, 'type');
    const state = get(changes, 'modelDiff.state');
    const model = {...modelDiff, ...{'chart-type': this.toolToSlug[type]}};

    if (state && (state.marker || state.entities)) {
      this.sendConceptsStateToGA(type, state);
      this.sendEntitiesStateToGA(type, state);
    }

    this.store.dispatch(new VizabiModelChanged(model));
    this.store.dispatch(new SelectTool(this.toolToSlug[changes.type]));
  }

  sendConceptsStateToGA(chartName, state) {
    const { marker } = state;
    const newConceptsIndicators = this.getUniqueConceptsIndicators(marker);
    const newConceptsIndicatorsKeys = Object.keys(newConceptsIndicators);

    if (!newConceptsIndicatorsKeys.length) {
      return;
    }

    this.vizabiModelIndicators = {...this.vizabiModelIndicators, ...newConceptsIndicators};

    newConceptsIndicatorsKeys.forEach(indicator => {
      this.sendEventToGA({
        'eventCategory': 'concept',
        'eventAction': `set which: ${chartName} marker ${indicator}`,
        'eventLabel': newConceptsIndicators[indicator].which
      });
    });
  }

  sendEntitiesStateToGA(chartName, state) {
    let newUniqueGeoEntities;

    if (!(get(state, 'marker.select') || get(state, 'entities.show.geo'))) {
      return;
    }

    newUniqueGeoEntities = EXCEPTIONAL_VIZABI_CHARTS.some(chart => chart === chartName) ?
      this.getNewUniqueEntities(get(state, 'entities.show.geo.$in')) :
      this.getNewUniqueEntities(get(state, 'marker.select'), 'geo');

    this.vizabiModelGeoEntities = this.vizabiModelGeoEntities.concat(newUniqueGeoEntities);

    newUniqueGeoEntities.forEach(geo => {
      this.sendEventToGA({
        'eventCategory': 'entity',
        'eventAction': `select entity: ${chartName} marker`,
        'eventLabel': geo
      });
    });
  }

  getUniqueConceptsIndicators(markerData) {
    return omitBy(markerData, (val, key) => {
      const keyInModelIndicators = get(this.vizabiModelIndicators, key, false);

      return !keyInModelIndicators || get(markerData, `${key}.which`) === get(keyInModelIndicators, 'which');
    });
  }

  getNewUniqueEntities(entities, property = null) {
    const parsedEntities = property ? map(entities, property) : entities;

    return difference(parsedEntities, this.vizabiModelGeoEntities);
  }

  sendQueriesStatsToGA(data, type) {
    const {from, select, responseLength} = data;
    const analyticsTypeOptions = {
      request:  {
        'eventCategory': `${from}: ${select.value.join(',')};${select.key.join(',')}`,
        'eventAction': GA_EVENT_ACTION_REQUEST
      },
      response: {
        'eventCategory': `${from}: ${select.value.join(',')};${select.key.join(',')}`,
        'eventAction': GA_EVENT_ACTION_RESPONSE,
        'eventLabel': `rows: ${responseLength}`
      }
    };

    this.sendEventToGA(analyticsTypeOptions[type]);
  }

  sendEventToGA(analyticsData) {
    if (!ga) {
      return;
    }

    ga(GA_TRACKER_NAME_AND_METHOD, GA_TYPE, analyticsData);
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.vizabiModelChangesSubscription,
      this.vizabiChartTypeChangesSubscription,
      this.vizabiCreationSubscription,
      this.initialToolsSetupSubscription,
      this.localeChangesSubscription,
      this.toolChangesSubscription,
      this.routesModelChangesSubscription
    ];

    subscriptions.forEach((subscription: Subscription) => subscription && subscription.unsubscribe());
  }
}
