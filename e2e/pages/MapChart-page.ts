import { $, element, by, $$, ElementArrayFinder, ElementFinder, protractor, browser } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartSidebar } from './CommonChartSidebar-page';
import { CommonChartPage } from './CommonChartPage-page';

const EC = protractor.ExpectedConditions;

const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();

export class MapChart {
  url = '#_chart-type=map';

  selectedCountries: ElementArrayFinder = $$('circle[class="vzb-bmc-bubble vzb-selected"]');
  allBubbles: ElementArrayFinder = $$('circle[class="vzb-bmc-bubble"]');
  bubbleLabelOnMouseHover: ElementFinder = $('.vzb-bmc-tooltip');
  tooltipOnClick: ElementFinder = $('.vzb-label-glow');
  selectedCountriesLabels = $$('text[class="vzb-bmc-label-content stroke"]');
  selectedCountryLabel = $('g[class="vzb-bmc-labels"] > g');
  xIconOnBubble = $('.vzb-bmc-label-x');
  yAxisTitle = $('g[class="vzb-bmc-axis-y-title"] > text');
  
  sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    axisSelector: $('.vzb-saxis-selector')
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

  async refreshPage(): Promise<{}> {
    return await commonChartPage.refreshPage();
  }

  async openChart(): Promise<{}> {
    return await commonChartPage.openChart(this.url);
  }

  async openByClick(): Promise<{}> {
    await Helper.safeClick(commonChartPage.mapsChart);

    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async searchAndSelectCountry(country: string): Promise<{}> {
    return commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ElementFinder> {
    const colors = {
      'red': '#ff5872',
      'yellow': '#ffe700',
      'blue': '#00d5e9',
      'green': '#7feb00'
    };

    // TODO
    return element.all(by.xpath(`//*[@fill = '${colors[color.toLocaleLowerCase()]}']`)).get(index);

    // return this.allBubbles.filter(elem => {
    //   return elem.getCssValue('fill').then(fill => {
    //     // find all bubbles with certain color
    //     return fill === colors[color.toLowerCase()];
    //   });
    // }).then(filteredElements => {
    //   return filteredElements[index];
    // });
  }

  async hoverMouseOverBubble(color: string, index = 0): Promise<ElementFinder> {
    const filteredElement = await this.filterBubblesByColor(color, index);

    await browser.actions().mouseMove(filteredElement)
      .perform();

    await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 4000);

    return filteredElement;
  }

  async clickOnBubble(color: string, index = 0): Promise<void> {
    const bubble = await this.filterBubblesByColor(color, index);
    await Helper.safeClick(bubble);
    await browser.wait(EC.visibilityOf(this.tooltipOnClick), 4000);
  }

  async diselectBubble(color: string, index = 0): Promise<void> {
    const bubble = await this.filterBubblesByColor(color, index);
    await Helper.safeClick(bubble);
    await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 2000);
  }

  getOpacityOfNonSelectedBubblesMapsChart() {
    return this.allBubbles.each(function (elem) {
      return elem.getAttribute('style').then(function (opacity) {
        return opacity;
      });
    })
  }

  // TODO make it work with specific country
  async clickXiconOnBubble(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.selectedCountryLabel).perform();
    await Helper.safeClick(this.xIconOnBubble);

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 5000);
  }

}
