import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Helper } from '../helpers/helper';

const EC = protractor.ExpectedConditions;

export class CommonChartPage {
  public static sideBar: ElementFinder = $('.vzb-tool-dialogs');
  public static buttonPlay: ElementFinder = $('.vzb-ts-btn-play');
  public static buttonPause: ElementFinder = $('.vzb-ts-btn-pause.vzb-ts-btn');
  public static mainChart: ElementFinder = $('.vzb-tool');
  public static spinner: ElementFinder = $('.vzb-loading-data');
  public movingSliderProgress: ElementArrayFinder = $$('.domain.rounded');
  public mapsChart: ElementFinder = $('a[href*="map"]');
  public bubblesChart: ElementFinder = $('a[href*="bubbles"]');
  public linesChart: ElementFinder = $('a[href*="linechart"]');
  public mountainsChart: ElementFinder = $('a[href*="mountain"]');
  public rankingsChart: ElementFinder = $('a[href*="barrank"]');
  public pageHeader: ElementFinder = $('.header');

  public sliderSelectedYear: ElementFinder = $('.vzb-ts-slider-value');
  public sliderButton: ElementFinder = $('.vzb-ts-slider-handle');
  public sliderReady: ElementFinder = $('.domain.rounded');
  public sliderAxis: ElementFinder = $('.vzb-ts-slider');
  public speedStepper: ElementFinder = $('.vzb-tool-stepped-speed-slider');

  public axisYMaxValue: ElementFinder = $$('.vzb-bc-axis-y g[class="tick"] text').last();
  public axisXMaxValue: ElementFinder = $$('.vzb-bc-axis-x g[class="tick"] text').last();

  public countries = {
    'Russia': 'rus',
    'Nigeria': 'nga',
    'Bangladesh': 'bgd',
    'Australia': 'aus',
    'India': 'ind',
    'China': 'chn',
    'USA': 'usa',
    'United States': 'usa',
    'Brazil': 'bra'
  };

  async waitForToolsPageCompletelyLoaded(): Promise<{}> {
    await browser.wait(EC.visibilityOf(CommonChartPage.sideBar));
    await browser.wait(EC.visibilityOf(CommonChartPage.buttonPlay));
    await browser.wait(EC.invisibilityOf(this.movingSliderProgress.get(1)), 30000);
    await browser.wait(EC.invisibilityOf(CommonChartPage.spinner), 30000);
    await browser.wait(EC.visibilityOf(this.sliderReady), 30000);

    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000);
  }

  async openChart(url: string): Promise<{}> {
    await Helper.safeOpen(url);

    return await this.waitForToolsPageCompletelyLoaded();
  }

  async waitForSliderToBeReady(): Promise<{}> {
    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000);
  }

  async getSliderPosition(): Promise<string> {
    return this.sliderSelectedYear.getAttribute('textContent');
  }

  async refreshPage(): Promise<{}> {
    await browser.refresh();

    return await this.waitForToolsPageCompletelyLoaded();
  }

  async dragSliderToMiddle(): Promise<{}> {
    await browser.actions().dragAndDrop(this.sliderButton, {x: -900, y: 0}).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async dragSliderToStart() {
    await browser.actions().dragAndDrop(this.sliderButton, CommonChartPage.buttonPlay).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async dragSliderToRightEdge(): Promise<{}> {
    await browser.actions().dragAndDrop(this.sliderButton, this.speedStepper).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async playTimesliderSeconds(seconds: number) {
    await Helper.safeClick(CommonChartPage.buttonPlay);
    await browser.sleep(seconds * 1000);
    await Helper.safeClick(CommonChartPage.buttonPause);
  }

  isCountryAddedInUrl(country: string, state = true): Function {
    // if state = true use it to wait for presence string in url
    if (state) {
      return () => {
        return browser.getCurrentUrl().then(url => {
          return url.indexOf(`=${this.countries[country]}`) > -1;
        });
      };
    } else {
      // otherwise use to wait for string to be removed from URL
      return () => {
        return browser.getCurrentUrl().then(url => {
          return url.indexOf(`=${this.countries[country]}`) < 0;
        });
      };
    }
  }
}
