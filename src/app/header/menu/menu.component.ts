import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnDestroy, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { State } from '../../core/store';
import { PromptForEmbeddedUrl, PromptForSharingLink } from '../../core/store/user-interaction/user-interaction.actions';
import * as VimeoPlayer from '@vimeo/player';
import { VizabiToolsService } from '../../core/vizabi-tools-service';

const VIMEO_VIDEO_ID = 231885967;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild('playerMobileContainer') playerMobileContainer;
  @ViewChild('playerContainer') playerContainer;
  @ViewChild('howToVideo') howToVideo;
  @ViewChild('howToMobileVideo') howToMobileVideo;

  @Input() mobile;
  @Input() menuItems: any[];
  @Input() selectedMenuItem: any;

  @Output() selectMenuItem: EventEmitter<any> = new EventEmitter();

  menuMutationObserver: MutationObserver;
  mobileMenuMutationObserver: MutationObserver;

  isHowToVisible = false;

  constructor(private store: Store<State>, private vtService: VizabiToolsService) {
  }

  ngAfterViewInit() {
    const howToContainer = document.getElementById('how-to-modal');
    const howToMobileContainer = document.getElementById('mobile-menu-cont');
    const observerOptions = {attributes: true, childList: false};

    this.menuMutationObserver = new MutationObserver(mutationRecords => {
      if (this.mobile || mutationRecords.length <= 0) {
        return;
      }

      const menuContainer: any = mutationRecords[0].target;

      if (!menuContainer.hidden) {
        this.initPlayer(this.howToVideo.nativeElement);
      } else {
        this.disposePlayer();
      }
    });

    this.menuMutationObserver.observe(howToContainer, observerOptions);

    this.mobileMenuMutationObserver = new MutationObserver(mutationRecords => {
      if (!this.mobile || mutationRecords.length <= 0) {
        return;
      }

      const menuMobileContainer: any = mutationRecords[0].target;

      if (!menuMobileContainer.hidden) {
        this.initPlayer(this.howToMobileVideo.nativeElement);
      } else {
        this.disposePlayer();
      }
    });

    this.mobileMenuMutationObserver.observe(howToMobileContainer, observerOptions);
  }

  ngOnDestroy() {
    this.menuMutationObserver.disconnect();
    this.mobileMenuMutationObserver.disconnect();
  }

  getIconUrl(item): string {
    return `assets${item.icon_url}`;
  }

  hasIcon(item): boolean {
    return item && item.icon_url;
  }

  switchHowTo() {
    this.isHowToVisible = !this.isHowToVisible;
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

  initPlayer(placeholder) {
    const options = {id: VIMEO_VIDEO_ID, loop: false};

    this.vtService.currentVideoContainer = new VimeoPlayer(placeholder, options);

    if (this.vtService.currentVideoTime) {
      this.vtService.currentVideoContainer.setCurrentTime(this.vtService.currentVideoTime).then(() => {
        this.vtService.currentVideoContainer.pause();
      });
    }
  }

  private disposePlayer(): void {
    if (!this.vtService.currentVideoContainer) {
      return;
    }

    this.vtService.currentVideoContainer.pause().then(() => {
      this.vtService.currentVideoContainer.getCurrentTime().then(seconds => {
        this.vtService.currentVideoTime = seconds;
      });
    });
  }
}
