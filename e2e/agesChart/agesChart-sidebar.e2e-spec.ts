import { CommonChartPage } from "../pageObjects/common-chart.po";
import { AgesChart } from "../pageObjects/ages-chart.po";
import { Slider } from "../pageObjects/components/slider.e2e-component";
import { Sidebar } from "../pageObjects/components/sidebar.e2e-component";
import { safeOpen, waitForSpinner, waitForSliderToBeReady } from "../helpers/helper";
import { browser } from "protractor";


const commonChartPage: CommonChartPage = new CommonChartPage();
const agesChart: AgesChart = new AgesChart();
const slider: Slider = new Slider();

describe('Ages chart: Sidebar', () => {
  const sidebar: Sidebar = new Sidebar(agesChart);

  beforeEach(async() => {
    await agesChart.openChart();
  });

  it(`add region to chart from sidebar by click`, async() => {
    await sidebar.clickOnCountryFromList('Africa');

    expect(await agesChart.graphTitles.safeGetText()).toMatch('Africa');
    expect(await agesChart.graphsOnChart.count()).toEqual(2);
  });

  it(`"Group" slider on sidebar increases group range`, async() => {
    const allBarsBefore = await agesChart.bars.count();
    await agesChart.moveGroupSlider();
    await waitForSpinner();
    await waitForSliderToBeReady();
    const allBarsAfter = await agesChart.bars.count();

    await expect(allBarsBefore).toBeGreaterThan(allBarsAfter);
  });

});
