import { CommonChartPage } from "./pages/common-chart.po";
import { AgesChart } from "./pages/ages-chart.po";
import { Slider } from "./pages/components/slider.e2e-component";
import { Sidebar } from "./pages/components/sidebar.e2e-component";
import { safeOpen, waitForSpinner } from "./helpers/helper";
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
    const allBarsAfter = await agesChart.bars.count();

    await expect(allBarsBefore).toBeGreaterThan(allBarsAfter);
  });

});
