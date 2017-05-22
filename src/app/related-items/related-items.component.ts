import { Component, ViewEncapsulation } from '@angular/core';
import { ToolService } from '../tool.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.styl']
})
export class RelatedItemsComponent {

  public relatedItems = [];
  private toolItems: any = {};
  private toolActive: string;

  constructor(private toolService: ToolService) {
    this.toolItems = this.toolService.getTools();
    this.toolActive = this.toolService.getActive();
    this.relatedItems = this.getRelatedItemsOfActiveTool();

    this.toolService.getToolChangeEvents().subscribe(data => {
      this.toolActive = data.active as string;
      this.relatedItems = this.getRelatedItemsOfActiveTool();
    });
  }

  private getRelatedItemsOfActiveTool(): any[] {
    if (!this.toolItems[this.toolActive]) {
      return this.relatedItems;
    }
    return this.toolItems[this.toolActive].relateditems;
  }
}
