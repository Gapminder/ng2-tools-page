const using = require('jasmine-data-provider');
const helper = require('./helpers/helper');

const CommonChartSidebar = require('./pages/CommonChartSidebar-page');

const BubbleChartPage = require('./pages/BubbleChart-page');
const MapChartPage = require('./pages/MapChart-page');
const LineChartPage = require('./pages/LineChart-page');
const MountainChartPage = require('./pages/MountainChart-page');
const RankingsChartPage = require('./pages/RankingsChart-page');

let commonChartSidebar = new CommonChartSidebar();

let DATA_PROVIDER = {
  'Bubbles Chart': {chart: new BubbleChartPage()},
  'Map Chart': {chart: new MapChartPage()},
  'Mountains Chart': {chart: new MountainChartPage()},
  'Line Chart': {chart: new LineChartPage()},
  'Rankings Chart': {chart: new RankingsChartPage()}
};

beforeAll(()=>{
  browser.waitForAngularEnabled(false);
});

describe('No additional data in URL when chart opens', () => {
  /**
   * Tests which check URL's correctness when switching between charts. Browser has to be restarted before each test!
   */

  using(DATA_PROVIDER, (data, description) => {
    it(`URL on ${description} page`, async () => {
      await helper.safeOpen('/');
      let chart = data.chart;
      await chart.openByClick();

      await expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + chart.url);
    });
  });
});

describe('All charts - Acceptance', () => {

  describe('Side panel presence(TC33)', () => {
    /**
     * On large screen there is a side panel with color controls and list of countries.
     */

    using(DATA_PROVIDER, (data, description) => {
      it(`Side panel on ${description} page`, async () => {
        let chart = data.chart;
        await chart.openChart();

        let commonSidebar = await commonChartSidebar.sidebar;
        Object.keys(commonSidebar).forEach(element=>{
          expect(commonSidebar[element].isPresent()).toBe(true, `${element} not found`);
        });

        let chartSideBar = await chart.getSidebarElements();
        Object.keys(chartSideBar).forEach(element=>{
          expect(chartSideBar[element].isPresent()).toBe(true, `${element} not found`);
        });
      });
    });
  });

  describe('URL persistency(TC34)', () => {
    /**
     * URL persistency: set time slider to some point, refresh, timeslider should keep the point you gave it, and chart should load at the state of that point.
     * URL persistency: select a few entities, refresh, entities should be selected.
     */

    using(DATA_PROVIDER, (data, description) => {
      it(`Timeslider hold the value after reload ${description} page`, async () => {
        const EC = protractor.ExpectedConditions;
        let chart = data.chart;

        await chart.openChart();
        const initialSelectedYear = await chart.getSliderPosition();
        await chart.dragSlider();
        const finalSelectedYear = await chart.getSliderPosition();

        await expect(initialSelectedYear).not.toEqual(finalSelectedYear);
        await browser.wait(EC.urlContains(finalSelectedYear), 5000);

        await chart.refreshPage();

        const sliderAfterPageReload = await chart.getSliderPosition();

        await expect(sliderAfterPageReload).not.toEqual(initialSelectedYear);
        await expect(sliderAfterPageReload).toEqual(finalSelectedYear);
        await expect(browser.getCurrentUrl()).toContain(sliderAfterPageReload);
      })
    });
  });

  using(DATA_PROVIDER, (data, description) => {
    it(`Entities should be selected after page reload on ${description} page`, async() => {
      let chart = data.chart;

      await chart.openChart();
      await expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + chart.url);

      await chart.searchAndSelectCountry("Australia");
      await chart.searchAndSelectCountry("Bangladesh");
      await chart.searchAndSelectCountry("India");

      await expect(chart.getSelectedCountries().getText()).toMatch('Australia');
      await expect(chart.getSelectedCountries().getText()).toMatch('India');
      await expect(chart.getSelectedCountries().getText()).toMatch('Bangladesh');

      await chart.refreshPage();

      await expect(chart.getSelectedCountries().getText()).toMatch('Australia');
      await expect(chart.getSelectedCountries().getText()).toMatch('India');
      await expect(chart.getSelectedCountries().getText()).toMatch('Bangladesh');
      await expect(browser.getCurrentUrl()).toContain('=aus');
      await expect(browser.getCurrentUrl()).toContain('=bgd');
      await expect(browser.getCurrentUrl()).toContain('=ind');
    })
  })

});
