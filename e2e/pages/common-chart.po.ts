import { $, $$, browser, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { safeOpen, waitForPageLoaded, waitForSpinner, waitForUrlToChange } from '../helpers/helper';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../helpers/ExtendedElementFinder';

export class CommonChartPage {
  static countries = {
    'Russia': 'rus',
    'Nigeria': 'nga',
    'Bangladesh': 'bgd',
    'Australia': 'aus',
    'India': 'ind',
    'China': 'chn',
    'USA': 'usa',
    'United States': 'usa',
    'Brazil': 'bra',
    'Argentina': 'arg'
  };

  public static sideBar: ElementFinder = $('.vzb-tool-dialogs');
  public static buttonPlay: ExtendedElementFinder = _$('.vzb-ts-btn-play');
  public static buttonPause: ExtendedElementFinder = _$('.vzb-ts-btn-pause.vzb-ts-btn');
  public static mainChart: ElementFinder = $('.vzb-tool');
  public static spinner: ElementFinder = $('.vzb-loading-data');
  public static sliderReady: ElementFinder = $('.domain.rounded');
  public movingSliderProgress: ElementArrayFinder = $$('.domain.rounded');
  public mapsChart: ElementFinder = $('a[href*="map"]');
  public bubblesChart: ElementFinder = $('a[href*="bubbles"]');
  public linesChart: ElementFinder = $('a[href*="linechart"]');
  public mountainsChart: ElementFinder = $('a[href*="mountain"]');
  public rankingsChart: ElementFinder = $('a[href*="barrank"]');
  public pageHeader: ElementFinder = $('.header');

  url: string;
  chartLink: ExtendedElementFinder;
  selectedCountries: ExtendedArrayFinder;

  public axisYMaxValue: ExtendedElementFinder = _$$('.vzb-bc-axis-y g[class="tick"] text').last();
  public axisXMaxValue: ExtendedElementFinder = _$$('.vzb-bc-axis-x g[class="tick"] text').last();

  async waitForToolsPageCompletelyLoaded(): Promise<{}> {
    await browser.wait(EC.visibilityOf(CommonChartPage.sideBar));
    await browser.wait(EC.visibilityOf(CommonChartPage.buttonPlay));
    await browser.wait(EC.invisibilityOf(this.movingSliderProgress.get(1)), 30000);

    return await waitForSpinner();
  }

  async openChart(): Promise<void> {
    await browser.get('/');
    await safeOpen(this.url);
  }

  async openByClick(): Promise<{}> {
    const currentUrl = await browser.getCurrentUrl();
    /**
     * if we are already on this page no need to click on the link
     */
    if (!currentUrl.match(this.url)) {
      await this.chartLink.safeClick();

      return await waitForUrlToChange();
    }
  }

  async refreshPage(): Promise<void> {
    await browser.refresh();
    await waitForPageLoaded();
  }

  getSelectedCountriesNames(): PromiseLike<string> {
    return browser.wait(EC.visibilityOf(this.selectedCountries.first()))
      .then(() => {
        return this.selectedCountries.getText(); // TODO css animation can fail the test
      });
  }

}
