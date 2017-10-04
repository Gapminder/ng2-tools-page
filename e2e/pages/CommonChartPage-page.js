const EC = protractor.ExpectedConditions;
const helper = require('../helpers/helper');

class CommonChartPage {
  constructor() {
    this.sideBar = $('.vzb-tool-dialogs');
    this.buttonPlay = $('.vzb-ts-btn-play');
    this.movingSliderProgress = $$('.domain.rounded');
    this.mapsChart = $('a[href*="map"]');
    this.bubblesChart = $('a[href*="bubbles"]');
    this.linesChart = $('a[href*="linechart"]');
    this.mountainsChart = $('a[href*="mountain"]');
    this.rankingsChart = $('a[href*="barrank"]');
    this.pageHeader = $('.header');

    this.sliderSelectedYear = $('.vzb-ts-slider-value');
    this.sliderButton = $('.vzb-ts-slider-handle');
    this.sliderReady = $('.domain.rounded');
    this.sliderAxis = $('.vzb-ts-slider');

    this.countries = {
      'Russia': 'rus',
      'Nigeria': 'nga',
      'Bangladesh': 'bgd',
      'Australia': 'aus',
      'India': 'ind',
      'China': 'chn',
      'USA': 'usa'
    };
  }


  async waitForToolsPageCompletelyLoaded() {
    await browser.wait(EC.visibilityOf(this.sideBar));
    await browser.wait(EC.visibilityOf(this.buttonPlay));
    await browser.wait(EC.invisibilityOf(this.movingSliderProgress.get(1)), 30000);
    await browser.wait(EC.visibilityOf(this.sliderReady), 30000);

    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000);
  };

  async openChart(url) {
    await helper.safeOpen(url);

    return await this.waitForToolsPageCompletelyLoaded();
  }

  async waitForSliderToBeReady() {
    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000);
  }

  async getSliderPosition() {
    return this.sliderSelectedYear.getAttribute('textContent');
  };

  async refreshPage() {
    await browser.refresh();

    return await this.waitForToolsPageCompletelyLoaded();
  };

  async dragSlider() {
    await browser.actions().dragAndDrop(this.sliderButton, {x: -900, y: 0}).perform();
    await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  isCountryAddedInUrl(country) {
    const regex = new RegExp(`=${this.countries[country]}`, 'g');

    return function () {
      return browser.getCurrentUrl().then(url=> {
        return url.match(regex);
      });
    };
  };


}

module.exports = CommonChartPage;
