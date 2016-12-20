import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ToolService } from './../tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.styl']
})
export class SeeAlsoComponent implements OnInit {

  toolActive: String;

  tools = {};
  toolKeys = [];

  private toolsServiceLoaderEmitter: EventEmitter<any>;
  private toolsServiceChangeEmitter: EventEmitter<any>;

  constructor( private toolService:ToolService ) {

    this.toolsServiceLoaderEmitter = this.toolService.getToolLoaderEmitter()
      .subscribe(data => {
        this.tools = data.items;
        this.toolKeys = data.keys;
        this.toolActive = data.active;
      });

    this.toolsServiceChangeEmitter = this.toolService.getToolChangeEmitter()
      .subscribe(data => {
        this.toolActive = data.active;
      });
  }

  getLink(toolKey) {
    return window.location.pathname + '#_chart-type=' + toolKey;
  }


  changeHandler(toolKey) {
    this.toolService.changeActiveTool(toolKey);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toolsServiceLoaderEmitter.unsubscribe();
    this.toolsServiceChangeEmitter.unsubscribe();
  }

}
