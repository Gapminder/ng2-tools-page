import { browser, protractor } from 'protractor';

import { Helper } from './helpers/helper';
import { MountainChart } from './pages/MountainChart-page';

const mountainChart = new MountainChart();

beforeAll(() => {
  browser.waitForAngularEnabled(false);
});

beforeEach(async() => {
  await browser.get('/');
  await mountainChart.openChart();
  expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + mountainChart.url);
});

describe('Mountains chart - Acceptance', () => {
  it('text on vertical line at the end of the chart', async() => {
    /**
     * should check that in 2015, the percentage of people living in the extreme poverty should be 11.5 ± 0.3%,
     * and the world population should be 7.33B(TC19)
     */
    const extremePovertyPercentage = await mountainChart.extremePovertyPercentage.getText();

    await expect(Number(extremePovertyPercentage.replace('%', ''))).toBeGreaterThan(11.2);
    await expect(Number(extremePovertyPercentage.replace('%', ''))).toBeLessThan(11.8);

    await mountainChart.hoverMouseOver500AxisXOnMountainsChart();
    expect(await mountainChart.verticalLine.getText()).toEqual('7.33B');
  });

  it('text on vertical at the beginning of the chart', async() => {
    /**
     * should check that in 2015 there is roughly the same amount of people living in the extreme poverty
     * as there was in 1800 (830 and 812 Millions)(TC20)
     */
    await mountainChart.hoverMouserOverExtremePovertyTitle();

    expect(await mountainChart.verticalLine.getText()).toEqual('833M');

    await mountainChart.dragSliderToBeginning();
    await mountainChart.hoverMouserOverExtremePovertyTitle();

    expect(await mountainChart.verticalLine.getText()).toEqual('812M');
  });

  it('"show" section hide all countries except selected', async() => {
    /**
     * should check that only checked countries displayed after click "show", check a few countries(TC21)
     */
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);

    await Helper.safeClick(mountainChart.advancedControlsShowButtons);

    await mountainChart.searchAndSelectCountryInShowMenu('Ukraine');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await mountainChart.searchAndSelectCountryInShowMenu('Austria');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await mountainChart.searchAndSelectCountryInShowMenu('Brazil');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(3);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(3);
  });

  it('uncheck all countries from "show" return to the default view', async() => {
    /**
     * should check that uncheck the countries from "show", when the last one is unchecked,
     * the picture should return to a default view = stacked shapes of all countries(TC22)
     */
    await Helper.safeClick(mountainChart.advancedControlsShowButtons);

    await mountainChart.searchAndSelectCountryInShowMenu('Ukraine');
    await Helper.safeExpectIsDispayed(mountainChart.allCountriesOnChart.first(), 5000);

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await mountainChart.searchAndSelectCountryInShowMenu('Austria');
    await Helper.safeExpectIsDispayed(mountainChart.allCountriesOnChart.get(1), 5000);

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await mountainChart.deselectCountryInShowMenu('Ukraine');

    await mountainChart.deselectCountryInShowMenu('Austria');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
  });

  it('Population and name displayed on the top', async() => {
    /**
     * should select a few entities, they should get selected on the visualization and their names
     * should appear as a list on top left. Population should be displayed after the name(TC23)
     */
    const EC = protractor.ExpectedConditions;
    expect(await mountainChart.yearLabel.isPresent()).toBe(true, 'year label is displayed');

    await browser.wait(EC.presenceOf(mountainChart.allCountriesOnChart.first()));

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);
    await mountainChart.searchAndSelectCountry('China');
    await browser.wait(EC.presenceOf(mountainChart.selectedCountries.first()));

    expect(await mountainChart.selectedCountries.getText()).toMatch('China: 1.4B people');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(1);
    expect(await mountainChart.visualizationSelectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');

    await mountainChart.searchAndSelectCountry('India');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.selectedCountries.getText()).toMatch('India: 1.31B');
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(2);
    expect(await mountainChart.visualizationSelectedCountries.get(1).getAttribute('style')).toContain('opacity: 1;');

    await mountainChart.searchAndSelectCountry('Brazil');
    await browser.wait(EC.presenceOf(mountainChart.visualizationSelectedCountries.first()));
    expect(await mountainChart.selectedCountries.getText()).toMatch('Brazil: 206M');
    expect(await mountainChart.visualizationSelectedCountries.count()).toEqual(3);
    expect(await mountainChart.visualizationSelectedCountries.get(2).getAttribute('style')).toContain('opacity: 1;');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(162);
    expect(await browser.getCurrentUrl()).toContain('geo=ind');
    expect(await browser.getCurrentUrl()).toContain('geo=chn');
    expect(await browser.getCurrentUrl()).toContain('geo=bra');
  });
});
