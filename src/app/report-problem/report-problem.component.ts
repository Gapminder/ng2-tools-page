import { Component, ViewEncapsulation } from '@angular/core';
import { FlashDetectService } from './flash-detect.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.styl']
})
export class ReportProblemComponent {

  private flashDetectService: any;

  constructor() {
    this.flashDetectService = new FlashDetectService();
  }

  public isFlashAvailable (): boolean {
    return this.flashDetectService.installed;
  }

}
