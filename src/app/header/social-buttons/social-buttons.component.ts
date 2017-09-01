import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent {

  @Output() shareLink: EventEmitter<void> = new EventEmitter();
  @Output() getEmbeddedUrl: EventEmitter<void> = new EventEmitter();
}
