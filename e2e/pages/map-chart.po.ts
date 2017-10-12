import { $, $$, ElementArrayFinder, ElementFinder, browser, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../helpers/ExtendedElementFinder';

export class MapChart extends CommonChartPage {
  url = '#_chart-type=map';
  chartLink: ExtendedElementFinder = _$('a[href*="map"]');

  selectedCountries: ExtendedArrayFinder = _$$('[class*="vzb-bmc-entity label"]');
  selectedBubbles: ExtendedArrayFinder = _$$('.vzb-bmc-bubble.vzb-selected');
  allBubbles: ExtendedArrayFinder = _$$('circle[class="vzb-bmc-bubble"]');
  bubbleLabelOnMouseHover: ExtendedElementFinder = _$('.vzb-bmc-tooltip');
  tooltipOnClick: ElementFinder = $('.vzb-label-glow');
  selectedCountriesLabels: ExtendedArrayFinder = _$$('text[class="vzb-bmc-label-content stroke"]');
  selectedCountryLabel: ElementFinder = $('[class*="vzb-bmc-entity label"]'); // TODO this could be elementArray
  xIconOnBubble: ExtendedElementFinder = _$('.vzb-bmc-label-x');
  yAxisTitle: ElementFinder = $('.vzb-bmc-axis-y-title');

  sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    axisSelector: $('.vzb-saxis-selector')
  };

  getSidebarElements() {
    return this.sidebar;
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountriesLabels;
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ExtendedElementFinder> {
    const colors = {
      'red': '#ff5872',
      'yellow': '#ffe700',
      'blue': '#00d5e9',
      'green': '#7feb00'
    };

    await browser.wait(EC.visibilityOf(this.allBubbles.first()), 5000);

    return await _$$(`circle[fill = '${colors[color.toLocaleLowerCase()]}']`).get(index);
  }

  async hoverMouseOverBubble(color: string, index = 0): Promise<ElementFinder> {
    const filteredElement = await this.filterBubblesByColor(color, index);

    await browser.actions().mouseMove(filteredElement)
      .perform();

    await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 4000);

    return filteredElement;
  }

  async clickOnBubble(color: string, index = 0): Promise<void> {
    const bubble: ExtendedElementFinder = await this.filterBubblesByColor(color, index);
    await bubble.safeClick();
    await browser.wait(EC.visibilityOf(this.tooltipOnClick), 4000);
  }

  async deselectBubble(color: string, index = 0): Promise<void> {
    const bubble: ExtendedElementFinder = await this.filterBubblesByColor(color, index);
    await bubble.safeClick();
    await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 2000);
  }

  getOpacityOfNonSelectedBubblesMapsChart() {
    return this.allBubbles.each(elem => {
      return elem.getAttribute('style').then(opacity => {
        return opacity;
      });
    });
  }

  // TODO make it work with specific country
  async clickXiconOnBubble(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.selectedCountryLabel).perform();
    await this.xIconOnBubble.safeClick();

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick), 5000);
  }

}
