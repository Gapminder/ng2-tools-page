import { Component, OnInit } from '@angular/core';
import { ToolService } from './../tool.service';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.styl']
})
export class RelatedItemsComponent implements OnInit {

  toolItems = {};
  relatedItems = [];

  toolsServiceLoaderEmitter: any;
  toolsServiceChangeEmitter: any;

  constructor(private toolService:ToolService) {

    this.toolsServiceLoaderEmitter = this.toolService.getToolLoaderEmitter()
      .subscribe(data => {
        this.toolItems = data.items;
        this.relatedItems = this.toolItems[<string>data.active].relateditems;
      });

    this.toolsServiceChangeEmitter = this.toolService.getToolChangeEmitter()
      .subscribe(data => {
        this.relatedItems = this.toolItems[<string>data.active].relateditems;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toolsServiceLoaderEmitter.unsubscribe();
    this.toolsServiceChangeEmitter.unsubscribe();
  }

}
