import { $, $$, browser, ElementArrayFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from './common-chart.po';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../helpers/ExtendedElementFinder';
import { promise } from 'selenium-webdriver';
import { isCountryAddedInUrl } from '../helpers/helper';

export class RankingsChart extends CommonChartPage {
  url = '#_chart-type=barrank';
  chartLink: ExtendedElementFinder = _$('.about a[href*="barrank"]');

  dataDoubtsLink: ExtendedElementFinder = _$('.vzb-data-warning');
  dataDoubtsWindow: ExtendedElementFinder = _$('.vzb-data-warning-box');
  public selectedCountries: ExtendedArrayFinder = _$$('.vzb-br-bar.vzb-selected .vzb-br-label'); // TODO
  public bars: ExtendedArrayFinder = _$$('.vzb-br-bar');

  public sidebar = {
    timeDisplay: $('.vzb-timedisplay')
  };

  public getBarForCountry(country: string): ExtendedElementFinder {
    return _$(`[id*=vzb-br-bar-${CommonChartPage.countries[country]}] rect`);
  }

  getSidebarElements() {
    return this.sidebar;
  }

  getSelectedCountries(): ElementArrayFinder {
    return this.selectedCountries;
  }

  async selectBar(country: string): Promise<{}> {
    await this.getBarForCountry(country).safeClick();

    return await browser.wait(isCountryAddedInUrl(country));
  }

  countHighlightedBars(): promise.Promise<number> {
    return this.countBarsByOpacity(CommonChartPage.opacity.highlighted);
  }

  countDimmedBars(): promise.Promise<number> {
    return this.countBarsByOpacity(CommonChartPage.opacity.dimmed);
  }

  countBarsByOpacity(opacity: number): promise.Promise<number> {
    return $$(`.vzb-br-bar[style="opacity: ${opacity};"]`).count();
  }

  getBarOpacity(country: string): promise.Promise<number> {
    return this.getBarForCountry(country).safeGetCssValue('opacity').then(Number);
  }

  hoverBar(country: string): promise.Promise<void> {
    return this.getBarForCountry(country).hover();
  }

  getAllBarsWithColor(color: string): ExtendedArrayFinder {
    // TODO move colors to common
    const colors = {
      'red': 'rgb(255, 88, 114)',
      'yellow': 'rgb(255, 231, 0)',
      'blue': 'rgb(0, 213, 233)',
      'green': 'rgb(127, 235, 0)'
    };

    return _$$(`.vzb-br-bar [style*="fill: ${colors[color]};"]`);
  }

  getBarsPosition(barsCount = 10): promise.Promise<string[]> {
    /**
     * result supposed to be something like that:
     * [ 'vzb-br-bar-ind-c500',
     *   'vzb-br-bar-usa-c500',
     *   'vzb-br-bar-idn-c500',
     *   'vzb-br-bar-bra-c500',
     *   'vzb-br-bar-pak-c500' ]
     */
    const pattern = /(translate\(0, )|(\))/g;

    return this.bars
      .map(el => [el.getAttribute('transform'), el.getAttribute('id')])
      .then(allBarsPosition => {
        return allBarsPosition.sort((a, b) => {
          return Number(a[0].replace(pattern, '')) - Number(b[0].replace(pattern, ''));
        });
      })
      .then(sortedArray => sortedArray.slice(0, barsCount))
      .then(filteredByCount => filteredByCount.map(el => el[1])); // return only country names
  }
}
