import { $, $$, browser, element, ElementArrayFinder, ElementFinder, protractor, by } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartSidebar } from './CommonChartSidebar-page';
import { CommonChartPage } from './CommonChartPage-page';

const EC = protractor.ExpectedConditions;
const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();

const clientSideScripts = require('../helpers/scripts');


export class BubbleChart {
  public url = '#_chart-type=bubbles';

  public dataDoubtsLink: ElementFinder = $('.vzb-data-warning');
  public dataDoubtsWindow: ElementFinder = $('.vzb-data-warning-body');
  public allBubbles: ElementArrayFinder = $$('circle[class*="vzb-bc-entity"]');
  // this.bubbleLabelOnMouseHover = element(by.css('g[class="vzb-bc-tooltip"] > text'));
  public bubbleLabelOnMouseHover: ElementFinder = $('g[class="vzb-bc-tooltip"]');
  public axisXValue: ElementFinder = $$('g[class="vzb-axis-value"]').first();
  public tooltipOnClick: ElementArrayFinder = $$('.vzb-bc-label-content');
  public selectedCountryLabel: ElementFinder = $$('.vzb-label-fill.vzb-tooltip-border').first();
  public countrySelectedBiggerLabel: ElementFinder = $('.vzb-bc-labels .vzb-bc-entity');
  public selectedBubbleLabel: ElementFinder = $('.vzb-label-fill.vzb-tooltip-border');
  public xIconOnBubble: ElementFinder = $('.vzb-bc-label-x');
  public trials: ElementArrayFinder = $$('.vzb-bc-entity.entity-trail');
  public chinaTrails = $$('.trail-chn [class="vzb-bc-trailsegment"]');
  public usaTrails = $$('.trail-usa [class="vzb-bc-trailsegment"]');

  public selectedCountries: ElementArrayFinder = $$('text[class="vzb-bc-label-content stroke"]');
  public lockButton = $$('[data-btn="lock"]').last();
  public trailsButton = $$('button[data-btn="trails"]').last();

  public sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    zoomSection: $('.vzb-dialog-zoom-buttonlist')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  getCountryBubble(country: string): ElementFinder {
    return $(`circle[class*="vzb-bc-entity bubble-${commonChartPage.countries[country]}"]`);
  }

  async openChart(): Promise<{}> {
    return await commonChartPage.openChart(this.url);
  }

  async dragSliderToMiddle(): Promise<{}> {
    return await commonChartPage.dragSliderToMiddle();
  }

  async dragSliderToStart(): Promise<{}> {
    return await commonChartPage.dragSliderToStart();
  }

  async dragSliderToRightEdge(): Promise<{}> {
    await commonChartPage.dragSliderToRightEdge();

    return await browser.wait(EC.visibilityOf(this.trials.first()));
  }

  async openByClick(): Promise<{}> {
    const currentUrl = await browser.getCurrentUrl();
    // if we are already on this page no need to safeClick on the link
    if (!currentUrl.match(this.url)) {
      await Helper.safeClick(commonChartPage.bubblesChart);

      return await commonChartPage.waitForToolsPageCompletelyLoaded();
    }
  }

  async refreshPage(): Promise<{}> {
    return await commonChartPage.refreshPage();
  }

  async searchAndSelectCountry(country: string): Promise<{}> {
    return commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async hoverMouseOverCountry(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.getCountryBubble(country)).perform();

    return await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 2000);
  }

  async clickOnCountryBubble(country: string): Promise<{}> {
    await Helper.safeClick(this.getCountryBubble(country));

    return await browser.wait(EC.visibilityOf(this.tooltipOnClick.last()), 2000);
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ElementFinder> {
    const colors = {
      'red': 'rgb(255, 88, 114)',
      'yellow': 'rgb(255, 231, 0)',
      'blue': 'rgb(0, 213, 233)',
      'green': 'rgb(127, 235, 0)'
    };

    return $$(`circle[style*='fill: ${colors[color.toLocaleLowerCase()]}']`).get(index);
  }

  async hoverMouseOverBubble(color: string, index = 0, x = 0, y = 0): Promise<ElementFinder> {
    // x and y needs because some bubbles could overlay another
    const filteredElement = await this.filterBubblesByColor(color, index);

    await browser.actions().mouseMove(filteredElement)
    // if 'x' and 'y' were set - use the coordinates, otherwise just move to the element
      .mouseMove(x && y ? {x: x, y: y} : filteredElement)
      .perform();

    await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 4000);

    return filteredElement;
  }

  clickOnBubble(color: string, index = 0, x = 0, y = 0): Promise<{}> {
    // x and y needs because some bubbles could overlay another

    return this.filterBubblesByColor(color, index).then(filteredElement => {
      browser.actions()
        .mouseMove(filteredElement)
        // if 'x' and 'y' were set - use the coordinates, otherwise just move to the element
        .mouseMove(x && y ? {x: x, y: y} : filteredElement)
        .click()
        .perform();
    }).then(() => {
      return browser.wait(EC.visibilityOf(this.tooltipOnClick.last()), 4000);
    });
  }

  async diselectBubble(country: string): Promise<{}> {
    await Helper.safeClick(this.getCountryBubble(country));

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick.last()), 2000);
  }

  async hoverUnitedStates(): Promise<{}> {
    return this.hoverMouseOverBubble('green', 0, 10, 10);
  }

  async clickOnUnitedStates(): Promise<{}> {
    await this.clickOnBubble('green', 0, 10, 10);

    return await browser.wait(EC.visibilityOf(this.getCountryBubble('USA')), 4000, `USA bubble to appear`);
  }

  async clickOnChina(): Promise<{}> {
    await this.clickOnBubble('red', 0, 10, 10);

    return await browser.wait(EC.visibilityOf(this.getCountryBubble('China')), 4000, `China bubble to appear`);
  }

  getSliderPosition(): Promise<string> {
    return commonChartPage.getSliderPosition();
  }

  countBubblesByOpacity(opacity?: number) {
    const element = this.allBubbles;

    if (!opacity) {
      return element.count();
    }

    return $$(`circle[style*='opacity: ${opacity}']`).count();
  }

  dragAndDropSelectedCountryLabelBubblesChart(x: number, y: number) {
    return browser.actions().dragAndDrop(this.selectedCountryLabel, {x: x, y: y}).perform();
  }

  async clickXiconOnBubble(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.selectedBubbleLabel).perform();
    await Helper.safeClick(this.xIconOnBubble);

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick.last()), 5000);
  }


  diselectCountryInSearch(country: string) {
    return commonChartSidebar.diselectCountryInSearch(country);
  }

  getBubblesRadius() {
    return this.allBubbles.map(elem => {
      return elem.getAttribute('r').then(radius => {
        return radius;
      });
    });
  }

  getCoordinatesOfLowerOpacityBubblesOnBubblesChart() {
    // TODO maybe this should be replaced with loop through elements array
    return browser.executeScript(clientSideScripts.getCoordinatesOfLowerOpacityBubblesOnBubblesChart);
  }
}
