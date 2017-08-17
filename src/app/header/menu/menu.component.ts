import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() menuItems: any[];
  @Input() selectedMenuItem: any;

  @Output() selectMenuItem: EventEmitter<any> = new EventEmitter();

  getIconUrl(item: any): string {
    return `assets${item.icon_url}`;
  }

  hasIcon(item: any): boolean {
    return item && item.icon_url;
  }
}
