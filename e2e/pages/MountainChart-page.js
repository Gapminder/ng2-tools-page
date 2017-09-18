const EC = protractor.ExpectedConditions;

const CommonChartSidebar = require('./CommonChartSidebar-page');
const CommonChartPage = require('./CommonChartPage-page');
const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();

class MountainChart {
  constructor() {
    this.url = '#_chart-type=mountain';
    this.selectedCountries = $$('text[class="vzb-mc-label-text"]');
    this.mountainsChartLeftSidePanelSelectedCountries = $$('text[class="vzb-mc-label-text"]');

    this.sidebar = {
      stackSection: $('.vzb-howtostack')
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

  async openByClick() {
    await commonChartPage.click(commonChartPage.mountainsChart);
    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async openChart() {
    return await commonChartPage.openChart(this.url);
  }

  async refreshPage() {
    return await commonChartPage.refreshPage();
  }

  async getSelectedCountries() {
    return await this.mountainsChartLeftSidePanelSelectedCountries;
  }

  async searchAndSelectCountry(country) {
    return commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(){
    return this.selectedCountries;
  }
}

module.exports = MountainChart;
