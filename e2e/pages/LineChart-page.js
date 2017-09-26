const EC = protractor.ExpectedConditions;
const helper = require('../helpers/helper');

const CommonChartPage = require('./CommonChartPage-page');
const CommonChartSidebar = require('./CommonChartSidebar-page');
const commonChartPage = new CommonChartPage();
const commonChartSidebar = new CommonChartSidebar();

class LineChart {
  constructor(){
    this.url = '#_chart-type=linechart';
    this.linesChartShowAllButton = $('.vzb-dialog-button.vzb-show-deselect');
    this.linesChartRightSidePanelCountriesList = $$('.vzb-show-item.vzb-dialog-checkbox');
    this.linesChartDataDoubtsLabel = $$('g[class="vzb-data-warning vzb-noexport"]');
    this.linesChartSelectedCountries = $$('.vzb-lc-label');
    this.advancedControlsRightSidePanelFindButton = $$('[data-btn="find"]').last();

    this.searchInputField = $('.vzb-show-search');
    this.searchResult = $$('div[class="vzb-show-item vzb-dialog-checkbox"] label'); //TODO
    this.selectedCountries = $$('.vzb-lc-labelname.vzb-lc-labelstroke');

    this.sidebar = {
      searchSection: $('.vzb-show-filter'),
      countriesList: $('.vzb-show-list'),
      resetFilterButton: $('.vzb-show-deselect'),
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

  searchAndSelectCountry(country) {
    return commonChartSidebar.searchAndSelectCountry(country, this.searchInputField, this.searchResult);
  }

  async refreshPage() {
    await commonChartPage.refreshPage();
    await commonChartPage.waitForToolsPageCompletelyLoaded();
    return await browser.wait(EC.visibilityOf($('.vzb-lc-labelname.vzb-lc-labelfill')), 6000);
  };

  async openChart() {
    await commonChartPage.openChart(this.url);
    await browser.sleep(1000);
  }

  async openByClick() {
    await helper.safeClick(commonChartPage.linesChart);
    return await commonChartPage.waitForToolsPageCompletelyLoaded();
  }

  getSelectedCountries(){
    return this.selectedCountries;
  }
}

module.exports = LineChart;
