import { $, $$, ElementArrayFinder, ElementFinder, browser, protractor } from 'protractor';

import { Helper } from '../helpers/helper';
import { Sidebar } from './sidebar.po';
import { CommonChartPage } from './common-chart.po';

const EC = protractor.ExpectedConditions;

const sidebar: Sidebar = new Sidebar();
const commonChartPage: CommonChartPage = new CommonChartPage();

export class MountainChart {
  public url = '#_chart-type=mountain';

  public selectedCountries: ElementArrayFinder = $$('text[class="vzb-mc-label-text"]');
  // public mountainsChartLeftSidePanelSelectedCountries: ElementArrayFinder = $$('text[class="vzb-mc-label-text"]');
  public extremePovertyPercentage: ElementFinder = $('text[class="vzb-shadow vzb-mc-probe-value-ul"]');
  public axisXLineNumbers: ElementArrayFinder = $$('g[class="tick"]');
  public verticalLine: ElementFinder = $$('.vzb-mc-probe-value-dl').first();
  public extremePovertyTitle: ElementFinder = $('text[class="vzb-mc-probe-extremepoverty"]');
  public allCountriesOnChart: ElementArrayFinder = $$('path[class="vzb-mc-mountain vzb-mc-aggrlevel0"]');
  public advancedControlsShowButtons: ElementFinder = $$('[data-btn="show"]').last();
  public showButtonSearchInputField: ElementFinder = $('input[class="vzb-show-search"]');
  public linesChartSearchResult: ElementFinder = $$('div[class*="vzb-show-item vzb-dialog-checkbox"] label').first(); // TODO
  public rightSidePanelCountriesList: ElementArrayFinder = $$('.vzb-find-list > div'); // TODO
  public showMenuSelectedCountry: ElementFinder = $$('.vzb-show-item').first();
  public yearLabel: ElementFinder = $('g[class="vzb-mc-year vzb-dynamic-background"]');
  public visualizationSelectedCountries: ElementArrayFinder = $$('.vzb-selected');

  public sidebar = {
    stackSection: $('.vzb-howtostack')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  async dragSliderToMiddle(): Promise<{}> {
    return await commonChartPage.dragSliderToMiddle();
  }

  dragSliderToBeginning() {
    return commonChartPage.dragSliderToStart();
  }

  getSliderPosition(): Promise<string> {
    return commonChartPage.getSliderPosition();
  }

  async openByClick(): Promise<{}> {
    await Helper.safeClick(commonChartPage.mountainsChart);

    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async openChart(): Promise<{}> {
    return await commonChartPage.openChart(this.url);
  }

  async refreshPage(): Promise<{}> {
    return await commonChartPage.refreshPage();
  }

  async searchAndSelectCountry(country: string): Promise<{}> {
    return sidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async hoverMouseOver500AxisXOnMountainsChart(): Promise<void> {
    await browser.actions().mouseMove(this.axisXLineNumbers.get(10)).perform();
    await browser.wait(EC.visibilityOf(this.verticalLine));
  }

  async hoverMouserOverExtremePovertyTitle(): Promise<void> {
    await browser.actions().mouseMove(this.extremePovertyTitle, ).mouseMove({x: 10, y: 90}).perform();
    await browser.wait(EC.visibilityOf(this.verticalLine));
  }

  async searchAndSelectCountryInShowMenu(country: string): Promise<void> {
    await Helper.safeSendKeys(this.showButtonSearchInputField, country);
    await Helper.safeClick(Helper.findElementByExactText(this.linesChartSearchResult, country));
    await Helper.waitForSpinner();
  }

  async deselectCountryInShowMenu(country: string): Promise<void> {
    await Helper.safeSendKeys(this.showButtonSearchInputField, country);
    await Helper.safeClick(Helper.findElementByExactText(this.linesChartSearchResult, country));
    await Helper.waitForSpinner();
  }
}
