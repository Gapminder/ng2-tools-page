import { LineChart } from "../pageObjects/line-chart.po";
import { Sidebar } from "../pageObjects/components/sidebar.e2e-component";
import { Slider } from "../pageObjects/components/slider.e2e-component";
import { waitUntil } from "../helpers/waitHelper";

const lineChart: LineChart = new LineChart();
const sidebar: Sidebar = new Sidebar(lineChart);
const slider: Slider = new Slider();

describe('Line chart: Sidebar', () => {
  const DEFAULT_COUNTRIES_NUMBER = 4;
  beforeEach(async () => {
    await lineChart.openChart();
  });
  it('Add country from country list in sidebar', async () => {
    await sidebar.clickOnCountryFromList('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Add country from search in sidebar', async () => {
    await sidebar.searchAndSelectCountry('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Reset button drop settings to default', async () => {
    await sidebar.clickOnCountryFromList('Argentina');
    await lineChart.clickResetButton();

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER, 'number of selected countries');
  });

  it('"Find" button in sidebar show only selected countries', async () => {
    const chartCountries = lineChart.selectedCountries;
    await sidebar.clickOnFindButton();
    const modalCountries = sidebar.countriesInFindModal;

    expect(await chartCountries.count()).toEqual(await modalCountries.count());

    /**
     * 'United states' displayed on chart as 'United Sta...'
     * this removes dots from name
     * and iterate through the names to find matches
     */
    const chartCountriesText = await chartCountries.getText();
    const modalCountriesText = await modalCountries.getText();
    const filteredChartCountries = chartCountriesText.toString()
      .replace(/\./g, '')
      .split(',');

    const filteredModelCountries = modalCountriesText.toString();

    await filteredChartCountries.forEach(item => {
      expect(filteredModelCountries.includes(item)).toBe(true, `${item} not match ${filteredModelCountries}`);
    });
  });

  it('Change lines colors at the top of sidebar', async () => {
    await sidebar.selectInColorDropdown(sidebar.color.mainReligion);
    await waitUntil(lineChart.countriesLines.first());

    const colorFromColorSection = await sidebar.getColorFromColorSection();
    expect(await lineChart.getLineColor('China')).toEqual(colorFromColorSection, 'line color');
  });

  
});
