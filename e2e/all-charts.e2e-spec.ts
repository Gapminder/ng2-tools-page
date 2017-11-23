import { browser, protractor } from 'protractor';

import using = require('jasmine-data-provider');

import { BubbleChart } from './pages/bubble-chart.po';
import { RankingsChart } from './pages/rankings-chart.po';
import { LineChart } from './pages/line-chart.po';
import { MapChart } from './pages/map-chart.po';
import { MountainChart } from './pages/mountain-chart.po';
import { Sidebar } from './pages/components/sidebar.e2e-component';
import { Slider } from './pages/components/slider.e2e-component';

import { safeOpen } from './helpers/helper';

const DATA_PROVIDER = {
  'Bubbles Chart': {chart: new BubbleChart()},
  'Map Chart': {chart: new MapChart()},
  'Mountains Chart': {chart: new MountainChart()},
  'Line Chart': {chart: new LineChart()},
  'Rankings Chart': {chart: new RankingsChart()}
};
describe('No additional data in URL when chart opens', () => {
  /**
   * Tests which check URL's correctness when switching between charts. Browser has to be restarted before each test!
   */

  using(DATA_PROVIDER, (data, description) => {
    it(`URL on ${description} page`, async() => {
      await safeOpen(protractor.browser.baseUrl);
      const chart = data.chart;
      await chart.openByClick();

      expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#_${chart.url}`);
    });
  });
});

describe('All charts - Acceptance', () => {

  describe('Side panel presence(TC33)', () => {
    /**
     * On large screen there is a side panel with color controls and list of countries.
     */

    using(DATA_PROVIDER, (data, description) => {
      it(`Side panel on ${description} page`, async() => {
        const chart = data.chart;
        await chart.openChart();

        const sidebar: Sidebar = await new Sidebar(chart);
        await sidebar.waitForVisible();

        const commonSidebar = await sidebar.sidebar;
        Object.keys(commonSidebar).forEach(element => {
          expect(commonSidebar[element].isPresent()).toBe(true, `${element} not found`);
        });

        const chartSideBar = await chart.getSidebarElements();
        Object.keys(chartSideBar).forEach(element => {
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
      it(`Timeslider hold the value after reload ${description} page`, async() => {
        const EC = protractor.ExpectedConditions;
        const chart = data.chart;
        const slider: Slider = new Slider();

        await chart.openChart();
        const initialSelectedYear = await slider.getPosition();
        await slider.dragToMiddle();
        const finalSelectedYear = await slider.getPosition();

        await expect(initialSelectedYear).not.toEqual(finalSelectedYear);
        await browser.wait(EC.urlContains(finalSelectedYear), 5000);

        await chart.refreshPage();

        const sliderAfterPageReload = await slider.getPosition();

        await expect(sliderAfterPageReload).not.toEqual(initialSelectedYear);
        await expect(sliderAfterPageReload).toEqual(finalSelectedYear);
        await expect(browser.getCurrentUrl()).toContain(sliderAfterPageReload);
      });
    });
  });

  using(DATA_PROVIDER, (data, description) => {
    it(`Entities are selected after page reload on ${description} page`, async() => {
      const chart = data.chart;
      const sidebar: Sidebar = new Sidebar(chart);

      await chart.openChart();

      await sidebar.searchAndSelectCountry('Australia');
      await sidebar.searchAndSelectCountry('Bangladesh');

      expect(await chart.getSelectedCountriesNames()).toMatch('Australia');
      expect(await chart.getSelectedCountriesNames()).toMatch('Bangladesh');

      await chart.refreshPage();

      expect(await chart.getSelectedCountriesNames()).toMatch('Australia');
      expect(await chart.getSelectedCountriesNames()).toMatch('Bangladesh');
      await expect(browser.getCurrentUrl()).toContain('=aus');
      await expect(browser.getCurrentUrl()).toContain('=bgd');
    });
  });
});
