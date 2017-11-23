import { browser, protractor } from 'protractor';

import { safeDragAndDrop, safeExpectIsDispayed, safeOpen, waitForSpinner } from './helpers/helper';
import { Sidebar } from './pages/components/sidebar.e2e-component';
import { CommonChartPage } from './pages/common-chart.po';
import { Slider } from './pages/components/slider.e2e-component';
import { AgesChart } from './pages/ages-chart.po';

const commonChartPage: CommonChartPage = new CommonChartPage();
const agesChart: AgesChart = new AgesChart();
const slider: Slider = new Slider();

describe('Ages chart - Acceptance', () => {
  const sidebar: Sidebar = new Sidebar(agesChart);

  beforeEach(async() => {
    await agesChart.openChart();
  });

  it(`Open chart by click on link`, async() => {
    await safeOpen(protractor.browser.baseUrl);
    await agesChart.openByClick();

    expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#_${agesChart.url}`);
  });

  it(`Data shown by hover on bar`, async() => {
    await agesChart.bars.first().hover();

    expect(await agesChart.labelOnBar.safeGetText()).toEqual('0-year-olds World: 136M');
  });

  it(`add region to chart from sidebar by click`, async() => {
    await sidebar.clickOnCountryFromList('Africa');

    expect(await agesChart.graphTitles.safeGetText()).toMatch('Africa');
    expect(await agesChart.graphsOnChart.count()).toEqual(2);
  });

  it(`select specific bar on chart (by click on bar)`, async() => {
    const allBars = await agesChart.bars.count();
    const barToSelect = await agesChart.bars.get(15);

    await barToSelect.safeClick();

    expect(Number(await barToSelect.getCssValue('opacity'))).toEqual(CommonChartPage.opacity.highlighted);
    expect(await agesChart.countHighlightedBars()).toEqual(1);
    expect(await agesChart.countDimmedBars()).toEqual(allBars - 1);
  });

  it(`"Group" slider on sidebar increases group range`, async() => {
    const allBarsBefore = await agesChart.bars.count();
    await agesChart.moveGroupSlider();
    await waitForSpinner();
    const allBarsAfter = await agesChart.bars.count();

    await expect(allBarsBefore).toBeGreaterThan(allBarsAfter);
  });


});
