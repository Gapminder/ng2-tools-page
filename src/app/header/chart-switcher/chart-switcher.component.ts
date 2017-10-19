import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output,
  ViewEncapsulation,
  AfterContentInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const options = [
  {title: 'bubbles', slug: 'bubbles'},
  {title: 'income', slug: 'mountain'},
  {title: 'maps', slug: 'map'},
  {title: 'ranks', slug: 'barrank'},
  {title: 'trends', slug: 'linechart'},
  {title: 'ages', slug: 'popbyage'}];
const getOptionBySlug = (slug: string) => {
  for (const option of options) {
    if (option.slug === slug) {
      return option;
    }
  }
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-chart-switcher',
  templateUrl: './chart-switcher.component.html',
  styleUrls: ['./chart-switcher.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSwitcherComponent implements AfterContentInit {
  @Input() selectedTool: string;
  @Output() selectTool: EventEmitter<string> = new EventEmitter();

  options: { title: string; slug: string }[] = options;
  currentChart: { title: string; slug: string };
  areOptionsVisible = false;

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    this.route.fragment.subscribe(params => {
      const match = /chart-type=([a-z]+)/.exec(params);

      if (match && match.length > 0) {
        const expectedOption = getOptionBySlug(match[1]);

        if (expectedOption) {
          this.currentChart = expectedOption;
          this.cd.markForCheck();
        }
      }
    });
  }

  ngAfterContentInit() {
    this.currentChart = getOptionBySlug(this.selectedTool);
  }

  public switchChartsOptions() {
    this.areOptionsVisible = !this.areOptionsVisible;
  }

  public getLink(toolKey: string): string {
    return `${window.location.pathname}#_chart-type=${toolKey}`;
  }

  public onToolChanged($event, selectedTool: string) {
    if ($event.ctrlKey) {
      return;
    }

    this.selectTool.emit(selectedTool);

    $event.preventDefault();
  }

  @HostListener('window:click', ['$event'])
  onClick(event) {
    const isOwnClicked = event.target.parentElement && event.target.parentElement.id === 'chart-switcher-options';

    if (!isOwnClicked && event.target.id !== 'chart-switcher-button') {
      this.areOptionsVisible = false;
    }
  }
}
