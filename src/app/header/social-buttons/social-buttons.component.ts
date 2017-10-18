import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { getCurrentVizabiModelHash, State } from '../../core/store';
import { BitlyService } from '../../core/bitly.service';

const MODEL_CHANGED_DEBOUNCE = 200;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent {
  @Output() shareLink: EventEmitter<any> = new EventEmitter();
  @Output() getEmbeddedUrl: EventEmitter<any> = new EventEmitter();

  currentUrl: string;

  private vizabiModelChangesSubscription: Subscription;

  constructor(store: Store<State>, bitlyService: BitlyService, cd: ChangeDetectorRef) {
    this.vizabiModelChangesSubscription = store.select(getCurrentVizabiModelHash)
      .debounceTime(MODEL_CHANGED_DEBOUNCE)
      .subscribe(() => {
        bitlyService.shortenUrl().subscribe(currentUrl => {
          this.currentUrl = currentUrl;

          cd.markForCheck();
        });
      });
  }
}
