import { Component, OnInit } from '@angular/core';
import { ToolService } from './../tool.service';

@Component({
  selector: 'app-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.styl']
})
export class SeeAlsoComponent implements OnInit {

  toolActive: String;

  tools = {};
  toolKeys = [];

  toolsServiceLoaderEmitter: any;
  toolsServiceChangeEmitter: any;

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
