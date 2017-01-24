import { Component, ViewEncapsulation } from '@angular/core';
import { ToolService } from './../tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.styl']
})
export class RelatedItemsComponent {

  private loaded: boolean = false;
  private toolItems: any = {};
  private relatedItems: Array<any> = [];

  constructor(private toolService: ToolService) {

    this.toolService.getToolLoaderEmitter().subscribe(data => {
      this.loaded = true;
      this.toolItems = data.items;
      this.relatedItems = this.toolItems[<string>data.active].relateditems;
    });

    this.toolService.getToolChangeEmitter().subscribe(data => {
      if (this.loaded) {
        this.relatedItems = this.toolItems[<string>data.active].relateditems;
      }
    });
  }
}
