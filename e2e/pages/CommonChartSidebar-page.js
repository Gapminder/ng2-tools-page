const CommonChartPage = require('./CommonChartPage-page');
const EC = protractor.ExpectedConditions;
const commonChartPage = new CommonChartPage();

class CommonChartSidebar {
  constructor() {
    // public rightSidePanel = element(by.css('.vzb-tool-sidebar'));
    this.rightSidePanel = $$('.vzb-dialog-title');
    this.colorSection = $$('[data-dlg="colors"]').get(0);
    this.colorDropDown = $$('span[class="vzb-ip-select"]').first();

    // this.countriesList = $$('.vzb-find-item.vzb-dialog-checkbox');

    this.searchInputField = $('.vzb-find-search');
    this.searchResult = $$('div[class="vzb-find-item vzb-dialog-checkbox"] > label'); //TODO
    this.searchResults = $$('.vzb-find-item.vzb-dialog-checkbox:not([class*="hidden"])');
    this.hiddenSearchResult = $$('.vzb-find-item.vzb-dialog-checkbox').first();

    this.optionsButton = $$('[data-btn="moreoptions"]').last();

    // this.advancedControlsRightSidePanelExpandButton = $$('[data-btn="fullscreen"]').last();
    // this.advancedControlsRightSidePanelShowButton = $$('[data-btn="show"]').last();
    // this.advancedControlsRightSidePanelOptionsButton = $$('[data-btn="moreoptions"]').last();
    // this.advancedControlsRightSidePanelPresentButton = $$('[data-btn="presentation"]').last();

    this.sidebar = {
      colorsSection: $('[data-dlg="colors"]'),
      miniMap: $('.vzb-cl-minimap'),
      searchSection: $('.vzb-find-filter'),
      countriesList: $('.vzb-find-list'),
      advancedButtons: $('.vzb-tool-buttonlist')
    }
  }

  async selectCountry(country) {
    //TODO
  };

  async searchAndSelectCountry(country) {
    // LineChart-page Override this method
    await browser.wait(EC.visibilityOf(this.searchInputField), 4000); //TODO
    await this.searchInputField.clear();
    await this.searchInputField.sendKeys(country);
    await browser.wait(EC.visibilityOf(this.searchResult.first()), 5500);
    await this.clickOnSearchResult(country);
    await browser.wait(commonChartPage.waitForCountryToBeAddedInUrl(country), 7000);
    await commonChartPage.waitForSliderToBeReady();
  };

  waitForSearchResult(country) {
    return function () {
      return this.searchResult.filter(elem => {
        return elem.getText().then(text => {
          return text === country;
        })
      })
    }
  }

  async clickOnSearchResult(country) {
  // find country in search results and wait for it

    return browser.wait(this.waitForSearchResult(country), 8000).then(()=> {
      this.searchResult.filter(elem => {
        return elem.getText().then(text => {
          return text === country;
        })
      }).then(res => {
        return browser.wait(EC.visibilityOf(res[0]), 5400).then(() => {
          return commonChartPage.click(res[0]);
        })
      })
    })
  }
}

module.exports = CommonChartSidebar;
