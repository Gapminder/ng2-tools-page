import { browser } from 'protractor';

import { safeExpectIsDispayed, waitForSliderToBeReady } from './helpers/helper';
import { Sidebar } from './pages/components/sidebar.e2e-component';
import { LineChart } from './pages/line-chart.po';
import { CommonChartPage } from './pages/common-chart.po';
import { Slider } from './pages/components/slider.e2e-component';

const lineChart: LineChart = new LineChart();
const sidebar: Sidebar = new Sidebar(lineChart);
const slider: Slider = new Slider();

describe('Line chart', () => {
  const DEFAULT_COUNTRIES_NUMBER = 4;
  beforeEach(async() => {
    await lineChart.openChart();
  });

  it('Add country from country list in sidebar', async() => {
    await sidebar.clickOnCountryFromList('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Add country from search in sidebar', async() => {
    await sidebar.searchAndSelectCountry('Argentina');
    await expect(lineChart.getSelectedCountriesNames()).toMatch('Argentina');

    expect(await lineChart.countriesLines.count()).toEqual(DEFAULT_COUNTRIES_NUMBER + 1);
  });

  it('Select line by click on label', async() => {
    await lineChart.selectLine('China');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(1);
    expect(await lineChart.countDimmedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 1);
  });

  it('Line became highlighted on hover', async() => {
    await lineChart.selectLine('China');
    await lineChart.hoverLine('Russia');

    expect(await lineChart.getLineOpacity('Russia')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 2);
    expect(await lineChart.countDimmedLines()).toEqual(DEFAULT_COUNTRIES_NUMBER - 2);
  });

  it('Hover the legend colors - will highlight specific lines', async() => {
    await sidebar.searchAndSelectCountry('Bangladesh');
    await waitForSliderToBeReady();
    await sidebar.hoverMinimapRegion('Asia');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.getLineOpacity('Bangladesh')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(2);
    expect(await lineChart.countDimmedLines()).toEqual(3);
  });

  it(`Hover the legend colors - won't dim selected lines`, async() => {
    await lineChart.selectLine('Nigeria');
    await waitForSliderToBeReady();
    await sidebar.hoverMinimapRegion('Asia');

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.getLineOpacity('Nigeria')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(2);
    expect(await lineChart.countDimmedLines()).toEqual(2);
  });

  it('change Y axis value', async() => {
    const yAxisValue = await lineChart.changeYaxisValue();

    expect(await lineChart.yAxisBtn.getText()).toContain(yAxisValue, 'Y axis button text');
  });

  it('Data doubts button', async() => {
    await lineChart.dataDoubtsLink.safeClick();

    await safeExpectIsDispayed(lineChart.dataDoubtsWindow);
  });

  it('Text on X axis on latest point on chart', async() => {
    await slider.dragToMiddle();

    expect(await lineChart.latestPointOnChart.getText()).toEqual(await slider.getPosition());
  });

  it('Reset button drop settings to default', async() => {
    await sidebar.clickOnCountryFromList('Argentina');
    await lineChart.clickResetButton();

    expect(await lineChart.countriesLines.count()).toEqual(4, 'number of selected countries');
  });

  // TODO won't work until after adding geo selector to lines
  // xit('Change lines colors at the top of sidebar', async() => {
  //   const EC = protractor.ExpectedConditions;
  //   await sidebar.selectInColorDropdown(sidebar.color.mainReligion);
  //   await browser.wait(EC.visibilityOf(lineChart.countriesLines.first()));
  //
  //   const colorFromColorSection = await sidebar.getColorFromColorSection();
  //   expect(await lineChart.getLineLabelColor('China')).toEqual(colorFromColorSection, 'line color');
  // });

  it('"Find" button in sidebar show only selected countries', async() => {
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

  it('Lines opacity should not get lost when timeslider is playing', async() => {
    await lineChart.selectLine('China');
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(2000); // play slider for 2 seconds to get the value in movement

    expect(await lineChart.countHighlightedLines()).toEqual(1);

    await CommonChartPage.buttonPause.safeClick();
    expect(await lineChart.countHighlightedLines()).toEqual(1);
  });

  it('Settings should be stored in URL: https://github.com/vizabi/vizabi/issues/2782', async() => {
    /**
     * don't fixed yet: https://github.com/vizabi/vizabi/issues/2782
     */
    await sidebar.searchAndSelectCountry('Bangladesh');
    await lineChart.selectLine('China');
    await lineChart.refreshPage();

    expect(await lineChart.getLineOpacity('China')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.getLineOpacity('Bangladesh')).toEqual(CommonChartPage.opacity.highlighted);
    expect(await lineChart.countHighlightedLines()).toEqual(2);
    expect(await lineChart.countDimmedLines()).toEqual(2);
  });

  it(`Hover on line change Color section (legend color and dropdown label)`, async() => {
    await lineChart.hoverLine('China');

    expect(await sidebar.colorDropDown.getText()).toEqual('Asia');
    expect(Number(await sidebar.minimapAsiaRegion.getCssValue('opacity'))).toEqual(CommonChartPage.opacity.highlighted);
  });

  // xit(`Change Options X and Y values`, async() => {
  // TODO tough stuff, will try to sort it out later. xMin input works super weird!
  //   const min = '1900';
  //   const max = '2000';
  //   await Helper.safeClick(sidebar.optionsButton);
  //   await Helper.safeClick(sidebar.optionsXandY.openBtn);
  //   await Helper.safeSendKeys(sidebar.optionsXandY.xMin, '1900');
  //   await sidebar.optionsXandY.xMin.click();
  //   await sidebar.optionsXandY.xMin.sendKeys(protractor.Key.BACK_SPACE);
  //   await sidebar.optionsXandY.xMin.sendKeys(protractor.Key.BACK_SPACE);
  //   await sidebar.optionsXandY.xMin.sendKeys(protractor.Key.BACK_SPACE);
  //   await sidebar.optionsXandY.xMin.sendKeys(protractor.Key.BACK_SPACE);
  //   await sidebar.optionsXandY.xMin.sendKeys(min);
  //   await browser.sleep(2000);
  //   await Helper.safeSendKeys(sidebar.optionsXandY.xMax, max);
  //   await Helper.safeClick(sidebar.optionsOkBtn);
  //
  //   await browser.sleep(2000);
  //   expect(await lineChart.axisValues.getText()).toMatch(min);
  //   expect(await lineChart.axisValues.last().getText()).toEqual(max);
  // });

});
