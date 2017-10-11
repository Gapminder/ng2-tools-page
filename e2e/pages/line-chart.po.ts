import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartPage } from './common-chart.po';
import { Sidebar } from './sidebar.po';

const EC = protractor.ExpectedConditions;

const commonChartPage = new CommonChartPage();
const sidebar = new Sidebar();

export class LineChart {
  public url = '#_chart-type=linechart';
  opacity = {
    highlighted: 1,
    dimmed: 0.3
  };

  dataDoubtsLink: ElementFinder = $('.vzb-data-warning');
  dataDoubtsWindow: ElementFinder = $('.vzb-data-warning-box');

  /**
   * specific Line chart selectors
   */
  latestPointOnChart: ElementFinder = $('[class="vzb-axis-value"]');
  public selectedCountries: ElementArrayFinder = $$('.vzb-lc-labelname.vzb-lc-labelfill');
  yAsixDropdownOptions: ElementArrayFinder = $$('.vzb-treemenu-list-item-label');
  yAxisBtn: ElementFinder = $('.vzb-lc-axis-y-title');
  axisValues: ElementArrayFinder = $$('.vzb-lc-axis-x .tick text');
  countriesLines: ElementArrayFinder = $$('.vzb-lc-line');

  public linesChartShowAllButton: ElementFinder = $('.vzb-dialog-button.vzb-show-deselect');
  public linesChartRightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-show-item.vzb-dialog-checkbox');
  public linesChartDataDoubtsLabel: ElementArrayFinder = $$('g[class="vzb-data-warning vzb-noexport"]');
  public linesChartSelectedCountries: ElementArrayFinder = $$('.vzb-lc-label');
  public advancedControlsRightSidePanelFindButton: ElementFinder = $$('[data-btn="find"]').last();

  // TODO maybe it should be moved to sidebar po
  countryList: ElementFinder = $$('[class="vzb-show-item vzb-dialog-checkbox"]').first();
  resetBtn: ElementFinder = $('.vzb-show-deselect');

  /**
   * default sidebar elements
   * change it carefully
   */
  public sidebar = {
    searchSection: $('.vzb-show-filter'),
    countriesList: $('.vzb-show-list'),
    resetFilterButton: $('.vzb-show-deselect')
  };

  /**
   * specific sidebar elements, unique for Lines chart
   */
  public searchInputField: ElementFinder = $('.vzb-show-search');
  public searchResult: ElementFinder = $('div[class="vzb-show-item vzb-dialog-checkbox"] label'); // TODO maybe add test class to vizabi

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
    return sidebar.searchAndSelectCountry(country, this.searchInputField, this.searchResult);
  }

  clickOnCountryFromList(country: string): Promise<void> {
    return sidebar.clickOnCountryFromList(country, this.searchResult);
  }

  async refreshPage(): Promise<{}> {
    await commonChartPage.refreshPage();
    await commonChartPage.waitForToolsPageCompletelyLoaded();

    return await browser.wait(EC.visibilityOf(this.selectedCountries.first()), 6000);
  }

  async openByClick(): Promise<{}> {
    await Helper.safeClick(commonChartPage.linesChart);

    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async selectLine(country: string): Promise<void> {
    await Helper.safeClick(Helper.findElementByExactText(this.selectedCountries.first(), country));
    await browser.wait(commonChartPage.isCountryAddedInUrl(country));
  }

  async getLineOpacity(country: string): Promise<number> {
    return Number(await Helper.findElementByExactText(this.selectedCountries.first(), country).getCssValue('opacity'));
  }

  async countHighlightedLines(): Promise<number> {
    return this.countLinesByOpacity(this.opacity.highlighted);
  }

  async countDimmedLines(): Promise<number> {
    return this.countLinesByOpacity(this.opacity.dimmed);
  }

  async countLinesByOpacity(opacity: number): Promise<number> {
    return $$(`.vzb-lc-lines .vzb-lc-entity[style="opacity: ${opacity};"]`).count();
  }

  async hoverLine(country: string): Promise<void> {
    const element = await Helper.findElementByExactText(this.selectedCountries.first(), country);
    await browser.wait(EC.visibilityOf(element));
    await browser.actions().mouseMove(element).perform();
  }

  async changeYaxisValue(): Promise<string> {
    await Helper.safeClick(this.yAxisBtn);
    const newOption = this.yAsixDropdownOptions.first();

    await browser.wait(EC.visibilityOf(newOption));
    const newOptionValue = newOption.getText();
    await Helper.safeClick(newOption);

    await Helper.waitForSpinner();
    await commonChartPage.waitForSliderToBeReady();

    return newOptionValue;
  }

  async clickResetButton(): Promise<void> {
    await Helper.safeClick(this.resetBtn);
    await Helper.waitForSpinner();
    await commonChartPage.waitForSliderToBeReady();
  }

  async getLineLabelColor(country: string) {
    return await Helper.findElementByExactText(this.selectedCountries.first(), country).getCssValue('fill');
  }
}
