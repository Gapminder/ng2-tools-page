import {
  ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output,
  ViewEncapsulation
} from '@angular/core';

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

  isHowToVisible = false;

  getIconUrl(item): string {
    return `assets${item.icon_url}`;
  }

  hasIcon(item): boolean {
    return item && item.icon_url;
  }

  switchHowTo() {
    this.isHowToVisible = !this.isHowToVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isHowToVisible = false;
  }

  @HostListener('window:click', ['$event'])
  onClick(event) {
    if (event.target.id && (event.target.id !== 'how-to-button' || event.target.id === 'how-to-modal')) {
      this.isHowToVisible = false;
    }
  }
}
