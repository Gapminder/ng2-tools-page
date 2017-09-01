'use strict';

const ToolsPage = require('./pages/tools-page');

let page;
const EC = protractor.ExpectedConditions;

beforeEach(() => {
  page = new ToolsPage();

});

describe('Mountains chart - Acceptance', () => {
  it('should check that in 2015, the percentage of people living in the extreme poverty should be 11.5 ± 0.3%,' +
    ' and the world population should be 7.33B(TC19)', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

    expect(page.mountainsChartExtremePovertyPercentage.getText()).toBeGreaterThan(11.2 + '%');
    expect(page.mountainsChartExtremePovertyPercentage.getText()).toBeLessThan(11.8 + '%');

    page.hoverMouseOver500AxisXOnMountainsChart();
    expect(page.mountainsChartVisualizationWorldPopulation.getText()).toEqual('7.33B');

    done();
  });

  it('should check that in 2015 there is roughly the same amount of people living in the extreme poverty' +
    ' as there was in 1800 (830 and 812 Millions)(TC20)', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

    page.hoverMouserOverExtremePovertyTitleMapsChart();

    expect(page.mountainsChartVisualizationWorldPopulation.getText()).toEqual('833M');

    page.dragSliderToBeginning();
    page.hoverMouserOverExtremePovertyTitleMapsChart();

    expect(page.mountainsChartVisualizationWorldPopulation.getText()).toEqual('812M');
    done();
  });

  it('should check that only checked countries displayed after click "show", check a few countries(TC21)', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(165);

    page.mountainsChartAdvancedControlsShowButtons.get(0).click();

    page.searchAndSelectCountryInShowMenu("Ukraine");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(1);
    expect(page.rightSidePanelCountriesList.count()).toEqual(1);

    page.searchAndSelectCountryInShowMenu("Austria");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(2);
    expect(page.rightSidePanelCountriesList.count()).toEqual(2);

    page.searchAndSelectCountryInShowMenu("Brazil");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(3);
    expect(page.rightSidePanelCountriesList.count()).toEqual(3);

    done();
  });

  it('should check that uncheck the countries from "show", when the last one is unchecked, the picture should' +
    ' return to a default view = stacked shapes of all countries(TC22)', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(165);
    page.mountainsChartAdvancedControlsShowButtons.get(0).click();

    page.searchAndSelectCountryInShowMenu("Ukraine");
    page.waitForPageToBeReloadedAfterAction();

    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(1);
    expect(page.rightSidePanelCountriesList.count()).toEqual(1);

    page.searchAndSelectCountryInShowMenu("Austria");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(2);
    expect(page.rightSidePanelCountriesList.count()).toEqual(2);

    page.deselectCountryInShowMenu("Ukraine");
    page.waitForPageToBeReloadedAfterAction();

    page.deselectCountryInShowMenu("Austria");
    page.waitForPageToBeReloadedAfterAction();

    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(165);
    expect(page.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
    done();
  });

  it('should select a few entities, they should get selected on the visualization and their names ' +
    'should appear as a list on top left. Population should be displayed after the name(TC23)', done => {
    page.openMountainsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_locale_id=en;&chart-type=mountain');

    browser.wait(EC.presenceOf(page.mountainsChartYearLabel));

    expect(page.mountainsChartYearLabel).toBeTruthy();

    browser.wait(EC.presenceOf(page.mountainsChartVisualizationAllCountries));

    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(165);
    page.searchAndSelectCountry("China");
    browser.wait(EC.presenceOf(page.mountainsChartLeftSidePanelSelectedCountries.first()));
    expect(page.getSelectedCountryTextOnMountainsChart(0)).toContain("China: 1.4B people");

    browser.wait(EC.presenceOf(page.mountainsChartVisualizationSelectedCountries));

    expect(page.mountainsChartVisualizationSelectedCountries.count()).toEqual(1);
    expect(page.mountainsChartVisualizationSelectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');

    page.searchAndSelectCountry("India");
    browser.wait(EC.presenceOf(page.mountainsChartLeftSidePanelSelectedCountries.get(1)));
    expect(page.getSelectedCountryTextOnMountainsChart(1)).toContain("India: 1.31B");
    expect(page.mountainsChartVisualizationSelectedCountries.count()).toEqual(2);
    expect(page.mountainsChartVisualizationSelectedCountries.get(1).getAttribute('style')).toContain('opacity: 1;');

    page.searchAndSelectCountry("Brazil");
    browser.wait(EC.presenceOf(page.mountainsChartLeftSidePanelSelectedCountries.get(2)));
    expect(page.getSelectedCountryTextOnMountainsChart(2)).toContain("Brazil: 206M");
    expect(page.mountainsChartVisualizationSelectedCountries.count()).toEqual(3);
    expect(page.mountainsChartVisualizationSelectedCountries.get(2).getAttribute('style')).toContain('opacity: 1;');
    expect(page.mountainsChartVisualizationAllCountries.count()).toEqual(162);
    expect(browser.getCurrentUrl()).toContain('geo=ind');
    expect(browser.getCurrentUrl()).toContain('geo=chn');
    expect(browser.getCurrentUrl()).toContain('geo=bra');

    done();
  });
});
