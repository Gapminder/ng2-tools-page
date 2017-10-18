import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { get, cloneDeep, includes, isEmpty } from 'lodash-es';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { Store } from '@ngrx/store';
import {
  getCreatedVizabiInstance,
  getCurrentLocale,
  getCurrentVizabiModelHash,
  getInitialToolsSetup,
  getSelectedTool,
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
  readerParams = [];
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
  private vizabiCreationSubscription: Subscription;
  private initialToolsSetupSubscription: Subscription;
  private localeChangesSubscription: Subscription;
  private toolChangesSubscription: Subscription;
  private routesModelChangesSubscription: Subscription;

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

        if (this.isLocaleNotSame(oldHashModel)) {
          const vizabiInstance = this.vizabiInstances[this.currentChartType].instance;

          if (vizabiInstance.setModel && vizabiInstance._ready) {
            vizabiInstance.setModel(this.currentHashModel);
          }
        }
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
    const model = {...changes.modelDiff, ...{'chart-type': this.toolToSlug[changes.type]}};

    this.store.dispatch(new VizabiModelChanged(model));
    this.store.dispatch(new SelectTool(this.toolToSlug[changes.type]));
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.vizabiModelChangesSubscription,
      this.vizabiCreationSubscription,
      this.initialToolsSetupSubscription,
      this.localeChangesSubscription,
      this.toolChangesSubscription,
      this.routesModelChangesSubscription
    ];

    subscriptions.forEach((subscription: Subscription) => subscription && subscription.unsubscribe());
  }

  private isLocaleNotSame(model): boolean {
    const isCurrentLocale = this.currentHashModel && this.currentHashModel.locale;

    return isCurrentLocale && (!(model && model.locale) || this.currentHashModel.locale.id !== model.locale.id);
  }
}
