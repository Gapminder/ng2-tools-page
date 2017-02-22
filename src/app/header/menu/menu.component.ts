import { Http } from '@angular/http';
import { Component, ViewEncapsulation } from '@angular/core';
import * as _ from "lodash";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent {
  private menuItems: Array<any> = [];
  private indexedMenuItems: Array<boolean> = [];

  constructor(private http: Http) {
    this.http
      .get('assets/menu-items.json')
      .subscribe(res => this.menuItems = res.json().children);
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
