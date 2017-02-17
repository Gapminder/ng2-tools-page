import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from './../environments/environment';

import * as AgePyramidState from 'vizabi-config-systema_globalis/AgePyramid.json';
import * as BarRankChartState from 'vizabi-config-systema_globalis/BarRankChart.json';
import * as BubbleChartState from 'vizabi-config-systema_globalis/BubbleChart.json';
import * as BubbleMapState from 'vizabi-config-systema_globalis/BubbleMap.json';
import * as LineChartState from 'vizabi-config-systema_globalis/LineChart.json';
import * as MountainChartState from 'vizabi-config-systema_globalis/MountainChart.json';

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

  private toolChangeEmitter: EventEmitter<any> = new EventEmitter();
  private toolLoadEmitter: EventEmitter<any> = new EventEmitter();

  public constructor(http: Http) {
    http
      .get('assets/related-items.json')
      .subscribe((res: Response) => this.setupItems(res.json()) );
  }

  public changeActiveTool(slug: string): void {
    this.toolActive = slug;
    this.toolChangeEmitter.emit({
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

  public getToolChangeEmitter(): EventEmitter<any> {
    return this.toolChangeEmitter;
  }

  public getToolLoaderEmitter(): EventEmitter<any> {
    return this.toolLoadEmitter;
  }

  private setupItems(items: any[]): void {
    const WS_SERVER = environment.wsUrl;

    items.forEach((toolDescriptor: any) => {
      toolDescriptor.opts.data.path = WS_SERVER + toolDescriptor.opts.data.path;
      Object.assign(toolDescriptor.opts, ToolService.TOOLS_STATE[toolDescriptor.tool]);

      this.tools[toolDescriptor.slug] = toolDescriptor;
      this.toolKeys.push(toolDescriptor.slug);
    });

    this.toolLoadEmitter.emit({
      keys: this.toolKeys,
      items: this.tools
    });
  }
}
