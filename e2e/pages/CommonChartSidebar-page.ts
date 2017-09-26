import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartPage } from './CommonChartPage-page';

const EC = protractor.ExpectedConditions;
const commonChartPage = new CommonChartPage();

export class CommonChartSidebar {
  public rightSidePanel: ElementArrayFinder = $$('.vzb-dialog-title');
  public colorSection: ElementFinder = $$('[data-dlg="colors"]').first();
  public colorDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').first();
  public sizeListChildMortalityRateColorIndicator = $$('span[class="vzb-treemenu-list-item-label"]').get(3);
  public colorIndicatorDescription = $$('span[class="vzb-cl-unit-text"]').first();
  public incomePerPersonColorIndicator = element.all(by.css('span[class="vzb-treemenu-list-item-label"]')).get(4);

  public countriesList: ElementArrayFinder = $$('.vzb-find-item.vzb-dialog-checkbox');

  public searchInputField: ElementFinder = $('.vzb-find-search');
  public searchResult: ElementFinder = $('.vzb-find-item.vzb-dialog-checkbox label'); //TODO

  public optionsButton: ElementFinder = $$('[data-btn="moreoptions"]').last();
  public optionsMenuSizeButton: ElementFinder = $$('span[data-vzb-translate="buttons/size"]').last();
  public optionsMenuBubblesResizeToddler = $$('.vzb-slider.vzb-slider-bubblesize .w').last();
  public colorIndicatorDropdown = $$('span[class="vzb-ip-holder"] > span').get(8); // TODO
  public sizeListBabiesPerWomanColorIndicator = $$('span[class="vzb-treemenu-list-item-label"]').first();
  public sizeDropDown = $$('span[class="vzb-ip-select"]').get(1);
  public optionsModalDialogue = $$('div[data-dlg="moreoptions"]');
  public optionsMenuHandIcon = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');

  public zoomButton = $$('[data-btn="plus"]').first();

  public advancedControlsRightSidePanelExpandButton: ElementFinder = $$('[data-btn="fullscreen"]').last();
  public advancedControlsRightSidePanelShowButton: ElementFinder = $$('[data-btn="show"]').last();
  public advancedControlsRightSidePanelOptionsButton: ElementFinder = $$('[data-btn="moreoptions"]').last();
  public advancedControlsRightSidePanelPresentButton: ElementFinder = $$('[data-btn="presentation"]').last();

  public sidebar = {
    colorsSection: $('[data-dlg="colors"]'),
    miniMap: $('.vzb-cl-minimap'),
    searchSection: $('.vzb-find-filter'),
    countriesList: $('.vzb-find-list'),
    advancedButtons: $('.vzb-tool-buttonlist')
  };

  public color = {
    childMortalityRate: $$('span[class="vzb-treemenu-list-item-label"]').get(3), // TODO add test class to vizabi
    incomePerPerson: $$('span[class="vzb-treemenu-list-item-label"]').get(4) // TODO add test class to vizabi
  };

  async searchAndSelectCountry(country: string,
                               inputSelector = this.searchInputField,
                               resultSelector = this.searchResult,
                               select = true): Promise<{}> {
    // this will type country name in search and click on it in the results
    // LineChart-page use it's own selectors
    await Helper.safeSendKeys(inputSelector, country);
    const countryInSearchResult = await this.findElementByExactText(resultSelector, country);

    await Helper.safeClick(countryInSearchResult);
    // this method can be used to both select and deselect country
    select ? await browser.wait(commonChartPage.isCountryAddedInUrl(country)) : await browser.wait(commonChartPage.isCountryAddedInUrl(country, false));

    return await commonChartPage.waitForSliderToBeReady();
  }

  async diselectCountryInSearch(country: string, inputSelector?: ElementFinder, resultSelector?: ElementFinder): Promise<{}> {
    // cilck on country name in search results and wait for it to disappear
    // LineChart-page use it's own selectors
    return await this.searchAndSelectCountry(country, inputSelector, resultSelector, false);
  }

  findElementByExactText(cssSelector: ElementFinder, searchText: string): ElementFinder {
    // there are few ways to find element by exact text:
    // element.getText() - works too slow
    // use xpath - not very cool to use xpath in general, but it works fast and written in one line
    // use js - too bulky, but works fast


    // return element.all(by.xpath(`//*[text()=${searchText}]`)).last();

    // TODO make it bueatyfull
    return element(by.js(`var elements = document.querySelectorAll('${cssSelector.locator().value}');
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var elementText = element.textContent || element.innerText || '';
      if (elementText === '${searchText}') return element
    };`));
  }

  async selectInColorDropdown(element: ElementFinder): Promise<{}> {
    await Helper.safeClick(this.colorDropDown);
    await Helper.safeClick(element);

    return await Helper.waitForSpinner();
  }
}
