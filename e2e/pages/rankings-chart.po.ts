import { $, $$, ElementArrayFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../helpers/ExtendedElementFinder';

export class RankingsChart extends CommonChartPage {
  url = '#_chart-type=barrank';
  chartLink: ExtendedElementFinder = _$('.about a[href*="barrank"]');

  public selectedCountries: ExtendedArrayFinder = _$$('.vzb-br-bar.vzb-selected .vzb-br-label'); // TODO

  public sidebar = {
    timeDisplay: $('.vzb-timedisplay')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }
}
