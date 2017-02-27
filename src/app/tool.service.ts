import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as AgePyramidState from 'vizabi-config-systema_globalis/AgePyramid.json';
import * as BarRankChartState from 'vizabi-config-systema_globalis/BarRankChart.json';
import * as BubbleChartState from 'vizabi-config-systema_globalis/BubbleChart.json';
import * as BubbleMapState from 'vizabi-config-systema_globalis/BubbleMap.json';
import * as LineChartState from 'vizabi-config-systema_globalis/LineChart.json';
import * as MountainChartState from 'vizabi-config-systema_globalis/MountainChart.json';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import RelatedItems from './related-items';

@Injectable()
export class ToolService {
  private static TOOLS_STATE: any = {
    AgePyramid: AgePyramidState,
    BarRankChart: BarRankChartState,
    BubbleChart: BubbleChartState,
    BubbleMap: BubbleMapState,
    LineChart: LineChartState,
    MountainChart: MountainChartState
  };

  private toolActive: string;

  private tools: any = {};
  private toolKeys: string[] = [];

  private toolChangeEmitter: Subject<any>;
  private toolLoadEmitter: Subject<any>;

  public constructor() {
    const {tools, toolKeys} = this.setupItems(RelatedItems);
    this.tools = tools;
    this.toolKeys = toolKeys;

    this.toolChangeEmitter = new BehaviorSubject({
      active: this.getActive()
    });

    this.toolLoadEmitter = new BehaviorSubject({
      keys: toolKeys,
      items: tools
    });
  }

  public changeActiveTool(slug: string): void {
    this.toolActive = slug;
    this.toolChangeEmitter.next({
      active: this.toolActive
    });
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
    return this.toolChangeEmitter;
  }

  public getToolLoadEvents(): Observable<any> {
    return this.toolLoadEmitter;
  }

  private setupItems(items: any[]): any {
    return items.reduce((result: any, toolDescriptor: any) => {
      toolDescriptor.opts.data.path = `${environment.wsUrl}${toolDescriptor.opts.data.path}`;
      Object.assign(toolDescriptor.opts, ToolService.TOOLS_STATE[toolDescriptor.tool]);

      result.tools[toolDescriptor.slug] = toolDescriptor;
      result.toolKeys.push(toolDescriptor.slug);
      return result;
    }, {tools: {}, toolKeys: []});
  }

  public static getUrlHash(hash: string = window.location.hash): string {
    const hashPosition = hash.indexOf("#");
    if (hashPosition === -1) {
      return '';
    }
    return hash.slice(hashPosition + 1);
  }
}
