import { browser } from 'protractor';

import { safeExpectIsDispayed, waitForSpinner } from './helpers/helper';
import { Sidebar } from './pages/components/sidebar.e2e-component';
import { CommonChartPage } from './pages/common-chart.po';
import { Slider } from './pages/components/slider.e2e-component';
import { RankingsChart } from './pages/rankings-chart.po';

const ranksChart: RankingsChart = new RankingsChart();
const sidebar: Sidebar = new Sidebar(ranksChart);
const slider: Slider = new Slider();

describe('Ranks chart', () => {
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

  it('Select bar by click', async() => {
    await ranksChart.selectBar('India');

    expect(await ranksChart.getBarOpacity('India')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.countHighlightedBars()).toEqual(1);
  });

  it('Not selected bar became highlighted on hover', async() => {
    await ranksChart.selectBar('China');
    await ranksChart.hoverBar('Russia');

    expect(await ranksChart.getBarOpacity('Russia')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.countHighlightedBars()).toEqual(2);
  });

  it('Hover the legend colors - will highlight specific bars', async() => {
    await ranksChart.selectBar('China');
    await sidebar.hoverMinimapRegion('Asia');

    await ranksChart.getAllBarsWithColor('red').each(element => {
      element.getCssValue('opacity').then(opacity => {
        expect(Number(opacity)).toEqual(CommonChartPage.opacity.highlighted);
      });
    });

    expect(await ranksChart.countHighlightedBars()).toEqual(await ranksChart.getAllBarsWithColor('red').count());
  });

  it(`Hover the legend colors - won't dim selected bars`, async() => {
    await ranksChart.selectBar('USA');
    await sidebar.hoverMinimapRegion('Asia');

    expect(await ranksChart.getBarOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await ranksChart.getBarOpacity('USA')).toEqual(CommonChartPage.opacity.highlighted);
  });

  it(`Hover a bar change Color section (legend color and dropdown label)`, async() => {
    await ranksChart.hoverBar('China');

    expect(await sidebar.colorDropDown.getText()).toEqual('Asia');
    expect(Number(await sidebar.minimapAsiaRegion.getCssValue('opacity'))).toEqual(CommonChartPage.opacity.highlighted);
  });

  it('Change color at the top of sidebar', async() => {
    await sidebar.searchAndSelectInColorDropdown('Main religion');
    await waitForSpinner();

    const colorFromColorSection = await sidebar.color.firstColor.getAttribute('style');
    expect(colorFromColorSection).toContain(await ranksChart.getBarForCountry('China').safeGetCssValue('fill'));
  });

  it('Data doubts button', async() => {
    await ranksChart.dataDoubtsLink.safeClick();

    await safeExpectIsDispayed(ranksChart.dataDoubtsWindow);
  });

  it('Opacity should not get lost when timeslider is playing', async() => {
    await ranksChart.selectBar('China');
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(2000); // play slider for 2 seconds to get the value in movement

    expect(await ranksChart.countHighlightedBars()).toEqual(1);

    await CommonChartPage.buttonPause.safeClick();
    expect(await ranksChart.countHighlightedBars()).toEqual(1);
  });

  it('Bars sorted when timeslider change position', async() => {
    const NUMBER_OF_BARS = 10;
    await waitForSpinner();
    const barsBefore = await ranksChart.getBarsPosition(NUMBER_OF_BARS);

    slider.dragToMiddle();

    const barsAfter = await ranksChart.getBarsPosition(NUMBER_OF_BARS);

    expect(barsBefore.length).toEqual(NUMBER_OF_BARS);
    expect(barsAfter.length).toEqual(NUMBER_OF_BARS);
    expect(barsBefore).not.toEqual(barsAfter);
  });
});
