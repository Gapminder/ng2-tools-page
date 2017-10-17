import {
  ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../core/store';
import { PromptForEmbeddedUrl, PromptForSharingLink } from '../../core/store/user-interaction/user-interaction.actions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @ViewChild('howToContent') howToContent;
  @ViewChild('howToMobileContent') howToMobileContent;
  @Input() menuItems: any[];
  @Input() selectedMenuItem: any;

  @Output() selectMenuItem: EventEmitter<any> = new EventEmitter();

  isHowToVisible = false;

  constructor(private store: Store<State>) {
  }

  getIconUrl(item): string {
    return `assets${item.icon_url}`;
  }

  hasIcon(item): boolean {
    return item && item.icon_url;
  }

  switchHowTo() {
    this.isHowToVisible = !this.isHowToVisible;

    const howToContentEmpty = this.howToContent.nativeElement.children.length <= 0;
    const howToMobileContentEmpty = this.howToMobileContent.nativeElement.children.length <= 0;

    if (this.isHowToVisible) {
      const content = document.createElement('div');
      const contentMobile = document.createElement('div');
      const vimeoContent = `<iframe src="https://player.vimeo.com/video/231885967"
                                   class="how-to-frame"
                                   webkitallowfullscreen
                                   mozallowfullscreen
                                   allowfullscreen></iframe>`;

      content.innerHTML = vimeoContent;
      contentMobile.innerHTML = vimeoContent;

      if (howToContentEmpty) {
        this.howToContent.nativeElement.appendChild(content);
      }

      if (howToMobileContentEmpty) {
        this.howToMobileContent.nativeElement.appendChild(contentMobile);
      }
    }
  }

  getEmbeddedUrl(): void {
    this.store.dispatch(new PromptForEmbeddedUrl());
  }

  shareLink(): void {
    this.store.dispatch(new PromptForSharingLink());
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
