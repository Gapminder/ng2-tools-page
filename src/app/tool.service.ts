import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../environments/environment';
import * as PopByAgeState from 'vizabi-config-systema_globalis/dist/PopByAge.json';
import * as BarRankChartState from 'vizabi-config-systema_globalis/dist/BarRankChart.json';
import * as BubbleChartState from 'vizabi-config-systema_globalis/dist/BubbleChart.json';
import * as BubbleMapState from 'vizabi-config-systema_globalis/dist/BubbleMap.json';
import * as LineChartState from 'vizabi-config-systema_globalis/dist/LineChart.json';
import * as MountainChartState from 'vizabi-config-systema_globalis/dist/MountainChart.json';
import { Observable } from 'rxjs';
import RelatedItems from './related-items';
import { has as _has, cloneDeep as _cloneDeep } from 'lodash';

@Injectable()
export class ToolService {
  private static TOOLS_STATE: any = {
    PopByAge: PopByAgeState,
    BarRankChart: BarRankChartState,
    BubbleChart: BubbleChartState,
    BubbleMap: BubbleMapState,
    LineChart: LineChartState,
    MountainChart: MountainChartState
  };

  private toolActive: string;

  private tools: any = {};
  private toolKeys: string[] = [];

  private toolChangeEvents: EventEmitter<any> = new EventEmitter<any>();

  public static getUrlHash(hash: string = window.location.hash): string {
    const hashPosition = hash.indexOf('#');
    if (hashPosition === -1) {
      return '';
    }
    return hash.slice(hashPosition + 1);
  }

  public constructor() {
    const {tools, toolKeys} = this.setupItems(RelatedItems);
    this.tools = tools;
    this.toolKeys = toolKeys;
  }

  public changeActiveTool(slug: string): void {
    this.toolActive = slug;
    this.toolChangeEvents.emit({ active: this.toolActive });
  }

  public getActive(): string {
    return this.toolActive || 'bubbles';
  }

  public getTools(): any[] {
    return this.tools;
  }

  public getToolKeys(): string[] {
    return this.toolKeys;
  }

  public getToolChangeEvents(): Observable<any> {
    return this.toolChangeEvents;
  }

  private setupItems(items: any[]): any {
    const itemsCloned = _cloneDeep(items);
    return itemsCloned.reduce((result: any, toolDescriptor: any) => {
      if (_has(environment, 'datasetBranch')) {
        toolDescriptor.opts.data.dataset += (environment as any).datasetBranch;
      }

      Object.assign(toolDescriptor.opts, ToolService.TOOLS_STATE[toolDescriptor.tool]);
      toolDescriptor.opts.data.path = `${environment.wsUrl}${toolDescriptor.opts.data.path}`;
      toolDescriptor.opts.data.assetsPath = `${environment.wsUrl}${toolDescriptor.opts.data.assetsPath}`;

      result.tools[toolDescriptor.slug] = toolDescriptor;
      result.toolKeys.push(toolDescriptor.slug);
      return result;
    }, {tools: {}, toolKeys: []});
  }
}
