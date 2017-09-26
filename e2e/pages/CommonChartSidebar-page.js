const EC = protractor.ExpectedConditions;
const helper = require('../helpers/helper');

const CommonChartPage = require('./CommonChartPage-page');
const commonChartPage = new CommonChartPage();

class CommonChartSidebar {
  constructor() {
    // public rightSidePanel = element(by.css('.vzb-tool-sidebar'));
    this.rightSidePanel = $$('.vzb-dialog-title');
    this.colorSection = $$('[data-dlg="colors"]').get(0);
    this.colorDropDown = $$('span[class="vzb-ip-select"]').first();

    // this.countriesList = $$('.vzb-find-item.vzb-dialog-checkbox');

    this.searchInputField = $('.vzb-find-search');
    this.searchResult = $('div[class="vzb-find-item vzb-dialog-checkbox"] label'); //TODO
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

  async searchAndSelectCountry(country, inputSelector, resultSelector) {
    // type country name in search and click on it in the results
    // LineChart-page use it's own selectors

    let searchResultSelector = resultSelector || this.searchResult; // LineChart use it's own selector
    let searchInputFieldSelector = inputSelector || this.searchInputField; // LineChart use it's own selector

    await helper.safeSendKeys(searchInputFieldSelector, country);

    let countryInSearchResult = await this.findElementByExactText(searchResultSelector, country);

    await helper.safeClick(countryInSearchResult);
    await browser.wait(commonChartPage.isCountryAddedInUrl(country), 15000);
    await commonChartPage.waitForSliderToBeReady();
  };

  findElementByExactText(cssSelector, searchText) {

    return element(by.js(`var elements = document.querySelectorAll('${cssSelector.locator().value}'); 
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i]; 
      var elementText = element.textContent || element.innerText || ''; 
      if (elementText === '${searchText}') return element
    };`));
    };

}

module.exports = CommonChartSidebar;
