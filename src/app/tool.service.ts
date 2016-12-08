import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable()
export class ToolService {

  toolActive: String;

  tools = {};
  toolKeys = [];

  toolChangeEmitter: EventEmitter<any> = new EventEmitter();
  toolLoadEmitter: EventEmitter<any> = new EventEmitter();

  constructor( private http:Http ) {
    this.http
      .get('assets/related-items.json')
      .subscribe(res => this.setupItems(res.json()) );
  }

  private setupItems(items) {
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

  public changeActiveTool(slug) {
    this.toolActive = slug;
    this.toolChangeEmitter.emit({
      active: this.toolActive
    });
  }

  public getActive() {
    return this.toolActive;
  }

  public getTools() {
    return this.tools;
  }

  public getToolKeys() {
    return this.toolKeys;
  }

  public getToolChangeEmitter() {
    return this.toolChangeEmitter;
  }

  public getToolLoaderEmitter() {
    return this.toolLoadEmitter;
  }


}
