import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { scrollTo } from '../core/utils';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeeAlsoComponent {
  @Input() tools: any[];
  @Input() selectedTool: string;

  @Output() trackGaToolChangeEvent: EventEmitter<{ fromTool: string, toTool: string }> = new EventEmitter();
  @Output() selectTool: EventEmitter<string> = new EventEmitter();

  private switchingReady: boolean = true;

  getLink(toolKey: string): string {
    return `${window.location.pathname}#_chart-type=${toolKey}`;
  }

  onToolChanged($event: MouseEvent, newSelectedTool: string): void {
    if ($event.ctrlKey) {
      return;
    }

    this.switchingReady = false;
    scrollTo({
      element: document.querySelector('.wrapper'),
      complete: () => {
        this.selectTool.emit(newSelectedTool);
        this.trackGaToolChangeEvent.emit({fromTool: this.selectedTool, toTool: newSelectedTool});
        setTimeout(() => {
          this.switchingReady = true;
        }, 10);
      }
    });

    $event.preventDefault();
  }
}
