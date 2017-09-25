const EC = protractor.ExpectedConditions;

const CommonChartSidebar = require('./CommonChartSidebar-page');
const CommonChartPage = require('./CommonChartPage-page');
const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();

class MapChart {
  constructor() {
    this.url = '#_chart-type=map';

    this.selectedCountries = $$('text[class="vzb-bmc-label-content stroke"]');

    this.sidebar = {
      bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
      resetFiltersBtn: $('.vzb-find-deselect'),
      axisSelector: $('.vzb-saxis-selector')
    }
  }

  getSidebarElements(){
    return this.sidebar;
  }

  async dragSlider(){
    return await commonChartPage.dragSlider();
  }

  getSliderPosition(){
    return commonChartPage.getSliderPosition();
  }

  async refreshPage() {
    return await commonChartPage.refreshPage();
  };

  async openChart() {
    return await commonChartPage.openChart(this.url);
  }

  async openByClick() {
    await commonChartPage.click(commonChartPage.mapsChart);
    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async searchAndSelectCountry(country) {
    return commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(){
    return this.selectedCountries;
  }
}

module.exports = MapChart;
