import { $, $$, browser, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartPage } from './common-chart.po';
import { Sidebar } from './sidebar.po';

const EC = protractor.ExpectedConditions;

const commonChartPage = new CommonChartPage();
const commonChartSidebar = new Sidebar();

export class LineChart {
  public url = '#_chart-type=linechart';

  public linesChartShowAllButton: ElementFinder = $('.vzb-dialog-button.vzb-show-deselect');
  public linesChartRightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-show-item.vzb-dialog-checkbox');
  public linesChartDataDoubtsLabel: ElementArrayFinder = $$('g[class="vzb-data-warning vzb-noexport"]');
  public linesChartSelectedCountries: ElementArrayFinder = $$('.vzb-lc-label');
  public advancedControlsRightSidePanelFindButton: ElementFinder = $$('[data-btn="find"]').last();

  public searchInputField: ElementFinder = $('.vzb-show-search');
  public searchResult: ElementFinder = $('div[class="vzb-show-item vzb-dialog-checkbox"] label'); // TODO maybe add test class to vizabi
  public selectedCountries: ElementArrayFinder = $$('.vzb-lc-labelname.vzb-lc-labelstroke');

  public sidebar = {
    searchSection: $('.vzb-show-filter'),
    countriesList: $('.vzb-show-list'),
    resetFilterButton: $('.vzb-show-deselect')
  };


  getSidebarElements() {
    return this.sidebar;
  }

  async dragSliderToMiddle(): Promise<{}> {
    return await commonChartPage.dragSliderToMiddle();
  }

  getSliderPosition(): Promise<{}> {
    return commonChartPage.getSliderPosition();
  }

  searchAndSelectCountry(country: string): Promise<{}> {
    return commonChartSidebar.searchAndSelectCountry(country, this.searchInputField, this.searchResult);
  }

  async refreshPage(): Promise<{}> {
    await commonChartPage.refreshPage();
    await commonChartPage.waitForToolsPageCompletelyLoaded();

    return await browser.wait(EC.visibilityOf($('.vzb-lc-labelname.vzb-lc-labelfill')), 6000);
  }

  async openChart(): Promise<{}> {
    return commonChartPage.openChart(this.url);
  }

  async openByClick(): Promise<{}> {
    await Helper.safeClick(commonChartPage.linesChart);

    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }
}
