import { $, ElementFinder } from 'protractor';

export class Header {
  rootSelector: ElementFinder = $('.header');
  chartType;

  constructor(chart: any) {
    this.chartType = chart;
  }
}
