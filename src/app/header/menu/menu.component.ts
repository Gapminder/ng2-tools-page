import { Component, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import VizabiMenuItems from './menu-items';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent {
  public menuItems: any[] = [];
  private indexedMenuItems: boolean[] = [];

  public constructor() {
    this.menuItems = VizabiMenuItems.children;
  }

  public createIconUrl(item: any): string {
    return `assets${item.icon_url}`;
  }

  public hasIcon(item: any): boolean {
    return item && item.icon_url;
  }

  public switchSubMenu(index: number): void {
    const wasItemAlreadySelected = this.indexedMenuItems[index];
    _.fill(this.indexedMenuItems, false);

    if (!wasItemAlreadySelected) {
      this.indexedMenuItems[index] = true;
    }
  }
}
