import { MountainChart } from "../pageObjects/mountain-chart.po";
import { Sidebar } from "../pageObjects/components/sidebar.e2e-component";
import { Slider } from "../pageObjects/components/slider.e2e-component";
import { safeExpectIsDispayed } from "../helpers/helper";

const mountainChart: MountainChart = new MountainChart();
const sidebar: Sidebar = new Sidebar(mountainChart);
const slider: Slider = new Slider();

describe('Mountains chart: Sidebar', () => {
  beforeEach(async() => {
    await mountainChart.openChart();
  });

  it('"show" section hide all countries except selected', async() => {
    /**
     * should check that only checked countries displayed after click "show", check a few countries(TC21)
     */
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);

    await sidebar.showButton.safeClick();

    await sidebar.searchAndSelectCountryInShowMenu('Ukraine');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.searchAndSelectCountryInShowMenu('Austria');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.searchAndSelectCountryInShowMenu('Brazil');

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(3);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(3);
  });

  it('uncheck all countries from "show" return to the default view', async() => {
    /**
     * should check that uncheck the countries from "show", when the last one is unchecked,
     * the picture should return to a default view = stacked shapes of all countries(TC22)
     */
    await mountainChart.advancedControlsShowButtons.safeClick();

    await sidebar.searchAndSelectCountryInShowMenu('Ukraine');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.first(), 5000);
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(1);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(1);

    await sidebar.searchAndSelectCountryInShowMenu('Austria');
    await safeExpectIsDispayed(mountainChart.allCountriesOnChart.get(1), 5000);

    expect(await mountainChart.allCountriesOnChart.count()).toEqual(2);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toEqual(2);

    await sidebar.deselectCountryInShowMenu('Ukraine');
    await sidebar.deselectCountryInShowMenu('Austria');
    expect(await mountainChart.allCountriesOnChart.count()).toEqual(165);
    expect(await mountainChart.rightSidePanelCountriesList.count()).toBeGreaterThan(25);
  });  
});