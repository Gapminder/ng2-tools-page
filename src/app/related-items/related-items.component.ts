import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedItemsComponent {
  @Input() relatedItems: any[];
}
