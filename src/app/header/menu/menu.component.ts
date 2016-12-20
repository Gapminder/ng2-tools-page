import { Http } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  MenuItems = [];
  IndexedMenuItems = [];

  constructor(private http:Http) {
    this.http
      .get('assets/menu-items.json')
      .subscribe(res => this.MenuItems = res.json().children);
  }

  ngOnInit() {}

  public createIconUrl(item) {
    return 'assets' + item.icon_url;
  }

  public hasIcon(item) {
    return item && item.icon_url ? true : false;
  }

  public switchSubMenu(index) {
    for(let i = 0; i < this.IndexedMenuItems.length; i += 1) {
      this.IndexedMenuItems[i] = i === index ? true : false;
    }
    this.IndexedMenuItems[index] = true;
  }

}
