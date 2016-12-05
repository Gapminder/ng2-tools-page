import { Component, OnInit } from '@angular/core';
import { FlashDetectService } from './flash-detect.service';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.styl']
})
export class ReportProblemComponent implements OnInit {

  flashDetectService;

  constructor() {
    this.flashDetectService = new FlashDetectService();
  }

  ngOnInit() {
  }

  public isFlashAvailable () {
    return this.flashDetectService.installed;
  }

}
