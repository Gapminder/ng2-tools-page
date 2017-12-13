import { waitForSpinner } from "./helpers/helper";
import { RankingsChart } from "./pages/rankings-chart.po";
import { Sidebar } from "./pages/components/sidebar.e2e-component";
import { Slider } from "./pages/components/slider.e2e-component";

const ranksChart: RankingsChart = new RankingsChart();
const sidebar: Sidebar = new Sidebar(ranksChart);
const slider: Slider = new Slider();

describe('Ranks chart: Sidebar', () => {
  beforeEach(async() => {
    await ranksChart.openChart();
  });

  it('Add country from country list in sidebar', async() => {
    await sidebar.clickOnCountryFromList('Argentina');
    await expect(ranksChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await ranksChart.selectedCountries.count()).toEqual(1);
  });

  it('Add country from search in sidebar', async() => {
    await sidebar.searchAndSelectCountry('Argentina');
    await expect(ranksChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await ranksChart.selectedCountries.count()).toEqual(1);
  });

  it('Change color at the top of sidebar', async() => {
    await sidebar.searchAndSelectInColorDropdown('Main religion');
    await waitForSpinner();

    const colorFromColorSection = await sidebar.color.firstColor.getAttribute('style');
    expect(colorFromColorSection).toContain(await ranksChart.getBarForCountry('China').safeGetCssValue('fill'));
  });

  it(`"SHOW" button hide all except selected`, async() => {
    await sidebar.showButton.safeClick();

    await sidebar.searchAndSelectCountryInShowMenu('China');

    expect(await ranksChart.allBars.count()).toEqual(1);
    expect(await sidebar.countriesList.count()).toEqual(1);

    await sidebar.searchAndSelectCountryInShowMenu('Ukraine');

    expect(await ranksChart.allBars.count()).toEqual(2);
    expect(await sidebar.countriesList.count()).toEqual(2);
  });

  it(`"DESELECT" button reset selected countries`, async() => {
    await sidebar.clickOnCountryFromList('India');
    await sidebar.deselectButton.safeClick();

    expect(await ranksChart.countDimmedBars()).toEqual(0);
  });

  it(`Active year at the top`, async() => {
    await slider.dragToMiddle();
    const selectedYear = await slider.getPosition();

    expect(await sidebar.yearAtTop.safeGetText()).toEqual(selectedYear);
  });
});
