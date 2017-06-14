'use strict';

const ToolsPage = require('./pages/tools-page');
let page;

beforeEach(() => {
  page = new ToolsPage();
});

describe('check URL correctness', () => {

  /**
   * Tests which check URL's correctness when switching between charts. Browser has to be restarted before each test!
   */

  it('should open tools page', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=bubbles');
    done();
  });

  it('should open Mountains chart', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');
    done();
  });

  it('should open Maps chart', done => {
    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=map');
    done();
  });

  it('should open Rankings chart', done => {
    page.openRankingsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=barrank');
    done();
  });

  it('should open Lines chart', done => {
    page.openLinesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=linechart');
    done();
  });

});
describe('All charts - Acceptance', () => {

  describe('check Side panel presence(TC33)', () => {

    /**
     * On large screen there is a side panel with color controls and list of countries.
     */

    it('should  check side panel on Bubbles chart page', done => {
      page.openBubblesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=bubbles');

      expect(page.getRightSidePanelText(0)).toContain('World Regions');
      expect(page.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
      expect(page.getRightSidePanelText(1)).toContain('Select');
      expect(page.getRightSidePanelText(2)).toContain('Population');
      expect(page.getRightSidePanelText(3)).toContain('Zoom');
      expect(page.advancedControlsRightSidePanelOptionsButton.getText()).toContain('OPTIONS');
      expect(page.advancedControlsRightSidePanelExpandButton.getText()).toContain('EXPAND');
      expect(page.advancedControlsRightSidePanelPresentButton.getText()).toContain('PRESENT');
      done();
    });

    it('should  check side panel on Maps chart page', done => {
      page.openMapsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=map');

      browser.actions().mouseMove(page.sliderSelectedYear).perform();

      expect(page.getRightSidePanelText(0)).toContain('Color');
      expect(page.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
      expect(page.getRightSidePanelText(1)).toContain('Select');
      expect(page.getRightSidePanelText(2)).toContain('Size');
      expect(page.getRightSidePanelText(3)).not.toContain('Zoom');
      expect(page.advancedControlsRightSidePanelOptionsButton.getText()).toContain('OPTIONS');
      expect(page.advancedControlsRightSidePanelExpandButton.getText()).toContain('EXPAND');
      expect(page.advancedControlsRightSidePanelPresentButton.getText()).toContain('PRESENT');
      done();
    });

    it('should  check side panel on Mountains chart page', done => {
      page.openMountainsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

      browser.actions().mouseMove(page.sliderSelectedYear).perform();
      expect(page.getRightSidePanelText(0)).toContain('World Regions');
      expect(page.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
      expect(page.getRightSidePanelText(1)).toContain('Select');
      expect(page.getRightSidePanelText(2)).toContain('Stack');
      expect(page.getRightSidePanelText(3)).not.toContain('Zoom');
      expect(page.advancedControlsRightSidePanelShowButton.getText()).toContain('SHOW');
      expect(page.advancedControlsRightSidePanelOptionsButton.getText()).toContain('OPTIONS');
      expect(page.advancedControlsRightSidePanelExpandButton.getText()).toContain('EXPAND');
      expect(page.advancedControlsRightSidePanelPresentButton.getText()).toContain('PRESENT');
      done();
    });

    it('should  check side panel on Lines chart page', done => {
      page.openLinesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=linechart');

      expect(page.getRightSidePanelText(0)).toContain('World Regions');
      expect(page.linesChartRightSidePanelCountriesList.count()).toBeGreaterThan(25);
      expect(page.getRightSidePanelText(2)).toContain('Show');
      expect(page.linesChartShowAllButton.getText()).toContain('RESET');
      expect(page.advancedControlsRightSidePanelFindButton.getText()).toContain('FIND');
      expect(page.advancedControlsRightSidePanelOptionsButton.getText()).toContain('OPTIONS');
      expect(page.advancedControlsRightSidePanelExpandButton.getText()).toContain('EXPAND');
      expect(page.advancedControlsRightSidePanelPresentButton.getText()).toContain('PRESENT');
      done();
    });

    it('should  check side panel on Rankings chart page', done => {
      page.openRankingsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=barrank');

      expect(page.rankingsChartRightSidePanelYearLabel.getText()).toContain('2015');
      expect(page.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
      expect(page.getRightSidePanelText(0)).toContain('World Regions');
      expect(page.getRightSidePanelText(1)).toContain('Select');
      expect(page.advancedControlsRightSidePanelShowButton.getText()).toContain('SHOW');
      expect(page.advancedControlsRightSidePanelOptionsButton.getText()).toContain('OPTIONS');
      expect(page.advancedControlsRightSidePanelExpandButton.getText()).toContain('EXPAND');
      expect(page.advancedControlsRightSidePanelPresentButton.getText()).toContain('PRESENT');
      done();
    });

  });

  describe('check URL persistency(TC34)', () => {

    /**
     * URL persistency: set time slider to some point, refresh, timeslider should keep the point you gave it, and chart should load at the state of that point.
     * URL persistency: select a few entities, refresh, entities should be selected.
     */

    it('should set time slider to some point, refresh, timeslider should keep the point on Bubbles chart page', done => {
      page.openBubblesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=bubbles');

      let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      page.dragSlider();
      let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      expect(initialSelectedYear).not.toEqual(finalSelectedYear);

      page.refreshToolsPage();

      let selectedYearAfterPageRefresh = page.sliderSelectedYear.getAttribute('textContent');
      expect(selectedYearAfterPageRefresh).toEqual(finalSelectedYear);
      expect(browser.getCurrentUrl()).toContain(selectedYearAfterPageRefresh);
      done();
    });

    it('should set time slider to some point, refresh, timeslider should keep the point on Mountains chart page', done => {
      page.openMountainsChart();

      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

      let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      page.dragSlider();
      let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      expect(initialSelectedYear).not.toEqual(finalSelectedYear);

      page.refreshToolsPage();

      let selectedYearAfterPageRefresh = page.sliderSelectedYear.getAttribute('textContent');
      expect(selectedYearAfterPageRefresh).toEqual(finalSelectedYear);
      expect(browser.getCurrentUrl()).toContain(selectedYearAfterPageRefresh);
      done();
    });

    it('should set time slider to some point, refresh, timeslider should keep the point on Maps page', done => {
      page.openMapsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=map');
      let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      page.dragSlider();
      let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      expect(initialSelectedYear).not.toEqual(finalSelectedYear);

      page.refreshToolsPage();

      let selectedYearAfterPageRefresh = page.sliderSelectedYear.getAttribute('textContent');
      expect(selectedYearAfterPageRefresh).toEqual(finalSelectedYear);
      expect(browser.getCurrentUrl()).toContain(selectedYearAfterPageRefresh);
      done();
    });

    it('should set time slider to some point, refresh, timeslider should keep the point on Rankings chart page', done => {
      page.openRankingsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=barrank');
      let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      page.dragSlider();
      let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      expect(initialSelectedYear).not.toEqual(finalSelectedYear);

      page.refreshToolsPage();

      let selectedYearAfterPageRefresh = page.sliderSelectedYear.getAttribute('textContent');

      expect(selectedYearAfterPageRefresh).toEqual(finalSelectedYear);
      expect(browser.getCurrentUrl()).toContain(selectedYearAfterPageRefresh);
      done();
    });

    it('should set time slider to some point, refresh, timeslider should keep the point on Lines chart page', done => {
      page.openLinesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=linechart');
      let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      page.dragSlider();
      let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
      expect(initialSelectedYear).not.toEqual(finalSelectedYear);

      page.refreshToolsPage();

      let selectedYearAfterPageRefresh = page.sliderSelectedYear.getAttribute('textContent');

      expect(selectedYearAfterPageRefresh).toEqual(finalSelectedYear);
      expect(browser.getCurrentUrl()).toContain(selectedYearAfterPageRefresh);
      done();
    });

    it('should select a few entities, refresh, entities should be selected on Bubbles chart page', done => {
      page.openBubblesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=bubbles');

      page.selectCountryOnBubblesChart("Russia");
      page.selectCountryOnBubblesChart("Bangladesh");
      page.selectCountryOnBubblesChart("Nigeria");


      expect(page.bubblesChartSelectedCountries.getText()).toContain('Russia 2015');
      expect(page.bubblesChartSelectedCountries.getText()).toContain('Nigeria 2015');
      expect(page.bubblesChartSelectedCountries.getText()).toContain('Bangladesh 2015');

      page.refreshToolsPage();

      expect(page.bubblesChartSelectedCountries.getText()).toContain('Russia 2015');
      expect(page.bubblesChartSelectedCountries.getText()).toContain('Nigeria 2015');
      expect(page.bubblesChartSelectedCountries.getText()).toContain('Bangladesh 2015');
      expect(browser.getCurrentUrl()).toContain('geo=rus');
      expect(browser.getCurrentUrl()).toContain('geo=bgd');
      expect(browser.getCurrentUrl()).toContain('geo=nga');

      done();
    });

    it('should select a few entities, refresh, entities should be selected on Mountains chart', done => {
      page.openMountainsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

      page.searchAndSelectCountry("China");
      expect(page.getSelectedCountryTextOnMountainsChart(0)).toContain("China: 1.38B people");

      page.searchAndSelectCountry("India");
      expect(page.getSelectedCountryTextOnMountainsChart(1)).toContain("India: 1.31B");

      page.searchAndSelectCountry("Brazil");
      expect(page.getSelectedCountryTextOnMountainsChart(2)).toContain("Brazil: 208M");

      page.refreshToolsPage();

      expect(page.getSelectedCountryTextOnMountainsChart(1)).toContain("India: 1.31B");
      expect(page.getSelectedCountryTextOnMountainsChart(0)).toContain("China: 1.38B people");
      expect(page.getSelectedCountryTextOnMountainsChart(2)).toContain("Brazil: 208M");
      expect(browser.getCurrentUrl()).toContain('geo=ind');
      expect(browser.getCurrentUrl()).toContain('geo=chn');
      expect(browser.getCurrentUrl()).toContain('geo=bra');

      done();
    });

    it('should select a few entities, refresh, entities should be selected on Maps chart', done => {
      page.openMapsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=map');

      page.searchAndSelectCountry("China");
      expect(page.mapsChartSelectedCountries.count()).toEqual(1);

      page.searchAndSelectCountry("India");
      expect(page.mapsChartSelectedCountries.count()).toEqual(2);

      page.searchAndSelectCountry("Brazil");
      expect(page.mapsChartSelectedCountries.count()).toEqual(3);

      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("China");
      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("India");
      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("Brazil");
      expect(browser.getCurrentUrl()).toContain('geo=ind');
      expect(browser.getCurrentUrl()).toContain('geo=chn');
      expect(browser.getCurrentUrl()).toContain('geo=bra');

      page.refreshToolsPage();

      expect(page.mapsChartSelectedCountries.count()).toEqual(3);
      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("China");
      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("India");
      expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("Brazil");
      expect(browser.getCurrentUrl()).toContain('geo=ind');
      expect(browser.getCurrentUrl()).toContain('geo=chn');
      expect(browser.getCurrentUrl()).toContain('geo=bra');
      done();
    });

    it('should select a few entities, refresh, entities should be selected on Rankings chart', done => {
      page.openRankingsChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=barrank');

      page.searchAndSelectCountry("China");
      expect(page.rankingsChartSelectedCountries.count()).toEqual(1);

      page.searchAndSelectCountry("India");
      expect(page.rankingsChartSelectedCountries.count()).toEqual(2);

      page.searchAndSelectCountry("Brazil");
      expect(page.rankingsChartSelectedCountries.count()).toEqual(3);

      page.refreshToolsPage();

      expect(page.rankingsChartSelectedCountries.count()).toEqual(3);
      expect(browser.getCurrentUrl()).toContain('geo=ind');
      expect(browser.getCurrentUrl()).toContain('geo=chn');
      expect(browser.getCurrentUrl()).toContain('geo=bra');

      done();
    });

    it('should select a few entities, refresh, entities should be selected on Lines chart', done => {
      page.openLinesChart();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=linechart');

      expect(page.linesChartSelectedCountries.count()).toEqual(4);
      page.searchAndSelectCountryOnLinesChart("Australia");

      page.waitForLinesChartPageToBeReloadedAfterAction();
      expect(page.linesChartSelectedCountries.count()).toEqual(5);

      page.refreshToolsPage();

      expect(page.linesChartSelectedCountries.count()).toEqual(5);
      expect(browser.getCurrentUrl()).toContain('&=aus');

      done();
    });

  });

});
