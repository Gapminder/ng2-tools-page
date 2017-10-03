import { $, $$, ElementArrayFinder } from 'protractor';

import { Helper } from '../helpers/helper';
import { Sidebar } from './sidebar.po';
import { CommonChartPage } from './common-chart.po';

const sidebar: Sidebar = new Sidebar();
const commonChartPage: CommonChartPage = new CommonChartPage();


export class RankingsChart {
  public url = '#_chart-type=barrank';

  public selectedCountries: ElementArrayFinder = $$('.vzb-br-bar.vzb-selected .vzb-br-label'); // TODO

  public sidebar = {
    timeDisplay: $('.vzb-timedisplay')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  async dragSliderToMiddle(): Promise<{}> {
    return await commonChartPage.dragSliderToMiddle();
  }

  getSliderPosition(): Promise<string> {
    return commonChartPage.getSliderPosition();

  }

  async openByClick(): Promise<{}> {
    await Helper.safeClick(commonChartPage.rankingsChart);

    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async openChart(): Promise<{}> {
    return await commonChartPage.openChart(this.url);
  }

  async refreshPage(): Promise<{}> {
    return await commonChartPage.refreshPage();
  }

  async searchAndSelectCountry(country: string): Promise<{}> {
    return await sidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }
}
