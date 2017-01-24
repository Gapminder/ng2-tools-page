import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable()
export class ToolService {

  private toolActive: string;

  private tools: any = {};
  private toolKeys: Array<string> = [];

  private toolChangeEmitter: EventEmitter<any> = new EventEmitter();
  private toolLoadEmitter: EventEmitter<any> = new EventEmitter();

  constructor( private http:Http ) {
    this.http
      .get('assets/related-items.json')
      .subscribe(res => this.setupItems(res.json()) );
  }

  private setupItems(items: Array<any>): void {
    const WS_SERVER = environment.wsUrl;
    const that = this;

    items.forEach(function(tool, index, tools) {
      tool.opts.data.path = WS_SERVER + tool.opts.data.path;

      that.tools[tool.slug] = tool;
      that.toolKeys.push(tool.slug);
    });

    this.toolActive = 'bubbles';

    this.toolLoadEmitter.emit({
      keys: this.toolKeys,
      items: this.tools,
      active: this.toolActive
    });
  }

  public changeActiveTool(slug: string): void {
    this.toolActive = slug;
    this.toolChangeEmitter.emit({
      active: this.toolActive
    });
  }

  public getActive():string {
    return this.toolActive;
  }

  public getTools():Array<any> {
    return this.tools;
  }

  public getToolKeys():Array<string> {
    return this.toolKeys;
  }

  public getToolChangeEmitter():EventEmitter<any> {
    return this.toolChangeEmitter;
  }

  public getToolLoaderEmitter():EventEmitter<any> {
    return this.toolLoadEmitter;
  }
}
