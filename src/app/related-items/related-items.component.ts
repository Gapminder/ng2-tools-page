import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ToolService } from './../tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.styl']
})
export class RelatedItemsComponent implements OnInit {

  loaded = false;
  toolItems = {};
  relatedItems = [];

  private toolsServiceLoaderEmitter: EventEmitter<any>;
  private toolsServiceChangeEmitter: EventEmitter<any>;

  constructor(private toolService:ToolService) {

    this.toolsServiceLoaderEmitter = this.toolService.getToolLoaderEmitter()
      .subscribe(data => {
        this.loaded = true;
        this.toolItems = data.items;
        this.relatedItems = this.toolItems[<string>data.active].relateditems;
      });

    this.toolsServiceChangeEmitter = this.toolService.getToolChangeEmitter()
      .subscribe(data => {
        if(this.loaded) {
          this.relatedItems = this.toolItems[<string>data.active].relateditems;
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.toolsServiceLoaderEmitter.unsubscribe();
    this.toolsServiceChangeEmitter.unsubscribe();
  }

}
