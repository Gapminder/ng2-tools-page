import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.styl']
})
export class SeeAlsoComponent implements OnInit {
  private tools: any = {};
  private toolKeys: Array<string> = [];
  private toolActive: string;

  constructor(private toolService: ToolService,
              private ga: GoogleAnalyticsService) {
    this.toolActive = toolService.getActive();
    this.tools = toolService.getTools();
    this.toolKeys = toolService.getToolKeys();
  }

  public ngOnInit(): void {
    this.toolService.getToolChangeEvents().subscribe((event: any) => {
      this.toolActive = event.active;
    });
  }

  public getLink(toolKey: string): string {
    return `${window.location.pathname}#_chart-type=${toolKey}`;
  }

  public changeHandler($event: MouseEvent, selectedTool: string): void {
    if ($event.ctrlKey) {
      return;
    }

    this.ga.trackToolChangedEvent({from: this.toolActive, to: selectedTool});

    this.toolService.changeActiveTool(selectedTool);
    $event.preventDefault();
  }
}
