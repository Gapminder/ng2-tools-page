import { $, $$, browser, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedElementFinder } from '../helpers/ExtendedElementFinder';

export class BubbleChart extends CommonChartPage {
  url = '#_chart-type=bubbles';
  chartLink: ExtendedElementFinder = _$('a[href*="bubbles"]');

  public dataDoubtsLink: ExtendedElementFinder = _$('.vzb-data-warning');
  public dataDoubtsWindow: ElementFinder = $('.vzb-data-warning-body');
  public allBubbles: ElementArrayFinder = $$('circle[class*="vzb-bc-entity"]');
  public bubbleLabelOnMouseHover: ElementFinder = $('g[class="vzb-bc-tooltip"]');
  public axisXValue: ElementFinder = $$('g[class="vzb-axis-value"]').first();
  public tooltipOnClick: ElementArrayFinder = $$('.vzb-bc-label-content');
  public selectedCountryLabel: ElementFinder = $$('.vzb-label-fill.vzb-tooltip-border').first();
  public countrySelectedBiggerLabel: ElementFinder = $('.vzb-bc-labels .vzb-bc-entity');
  public selectedBubbleLabel: ElementFinder = $('.vzb-label-fill.vzb-tooltip-border');
  public xIconOnBubble: ExtendedElementFinder = _$('.vzb-bc-label-x');
  public trials: ElementArrayFinder = $$('.vzb-bc-entity.entity-trail');
  public chinaTrails: ElementArrayFinder = $$('.trail-chn [class="vzb-bc-trailsegment"]');
  public usaTrails: ElementArrayFinder = $$('.trail-usa [class="vzb-bc-trailsegment"]');
  // public selectedCountries: ElementArrayFinder = $$('text[class="vzb-bc-label-content stroke"]');
  public selectedCountries: ElementArrayFinder = $$('[class*="vzb-bc-entity label"]');

  public lockButton: ExtendedElementFinder = _$$('[data-btn="lock"]').last();
  public trailsButton: ExtendedElementFinder = _$$('button[data-btn="trails"]').last();
  public sidebar = {
    bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
    resetFiltersBtn: $('.vzb-find-deselect'),
    zoomSection: $('.vzb-dialog-zoom-buttonlist')
  };

  countryTooltip = country => $(`[class*="vzb-bc-entity label-${CommonChartPage.countries[country]}"]`);

  getSidebarElements() {
    return this.sidebar;
  }

  getCountryBubble(country: string): ExtendedElementFinder {
    return _$(`circle[class*="vzb-bc-entity bubble-${CommonChartPage.countries[country]}"]`);
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async hoverMouseOverCountry(country: string): Promise<{}> {
    await browser.actions().mouseMove(this.getCountryBubble(country)).perform();

    return await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 2000);
  }

  async clickOnCountryBubble(country: string): Promise<{}> {
    await this.getCountryBubble(country).safeClick();

    return await browser.wait(EC.visibilityOf(this.countryTooltip(country)), 2000);
  }

  async filterBubblesByColor(color: string, index = 0): Promise<ElementFinder> {
    const colors = {
      'red': 'rgb(255, 88, 114)',
      'yellow': 'rgb(255, 231, 0)',
      'blue': 'rgb(0, 213, 233)',
      'green': 'rgb(127, 235, 0)'
    };

    await browser.wait(EC.visibilityOf($$(`circle[style*='fill: ']`).first()));

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

  async deselectBubble(country: string): Promise<{}> {
    await this.getCountryBubble(country).safeClick();

    return await browser.wait(EC.invisibilityOf(this.countryTooltip(country)), 2000);
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
    await this.xIconOnBubble.safeClick();

    return await browser.wait(EC.invisibilityOf(this.tooltipOnClick.last()), 5000);
  }

  getBubblesRadius() {
    return this.allBubbles.map(elem => {
      return elem.getAttribute('r').then(radius => {
        return radius;
      });
    });
  }

  getCoordinatesOfLowerOpacityBubblesOnBubblesChart() {
    // return sorted array with bubbles coordinates
    return $$(`circle[style*='opacity: 0.3']`)
      .map(elm => {
        return {
          cx: elm.getAttribute('cx'),
          cy: elm.getAttribute('cy')
        };
      }).then(obj => {
        return obj.sort((obj1: any, obj2: any) => obj1.cx - obj2.cx);
      });
  }
}
