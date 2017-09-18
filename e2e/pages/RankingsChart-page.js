const CommonChartSidebar = require('./CommonChartSidebar-page');
const CommonChartPage = require('./CommonChartPage-page');
const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();


class RankingsChart {
  constructor() {
    this.url = '#_chart-type=barrank';
    this.selectedCountries = $$('.vzb-br-bar.vzb-selected > .vzb-br-label'); //TODO

    this.sidebar = {
      timeDisplay: $('.vzb-timedisplay')
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
    await commonChartPage.click(commonChartPage.rankingsChart);
    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  async openChart() {
    return await commonChartPage.openChart(this.url);
  }

  async refreshPage() {
    return await commonChartPage.refreshPage();
  }

  async searchAndSelectCountry(country) {
    return await commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(){
    return this.selectedCountries;
  }
}

module.exports = RankingsChart;
