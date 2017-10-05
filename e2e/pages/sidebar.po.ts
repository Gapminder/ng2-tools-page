import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartPage } from './common-chart.po';

const commonChartPage: CommonChartPage = new CommonChartPage();

export class Sidebar {
  public colorDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').first();

  public searchInputField: ElementFinder = $('.vzb-find-search');
  public searchResult: ElementFinder = $('.vzb-find-item.vzb-dialog-checkbox label'); // TODO

  public optionsButton: ElementFinder = $$('[data-btn="moreoptions"]').last();
  public optionsMenuSizeButton: ElementFinder = $$('span[data-vzb-translate="buttons/size"]').last();
  public optionsMenuBubblesResizeToddler: ElementFinder = $$('.vzb-slider.vzb-slider-bubblesize .w').last();
  public colorIndicatorDropdown: ElementFinder = $$('span[class="vzb-ip-holder"] > span').get(8); // TODO
  public sizeListBabiesPerWomanColorIndicator: ElementFinder = $$('span[class="vzb-treemenu-list-item-label"]').first();
  public sizeDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').get(1);
  public optionsModalDialogue: ElementArrayFinder = $$('div[data-dlg="moreoptions"]');
  public optionsMenuHandIcon: ElementFinder = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');

  public zoomButton: ElementFinder = $$('[data-btn="plus"]').first();

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
    const countryInSearchResult = await Helper.findElementByExactText(resultSelector, country);

    await Helper.safeClick(countryInSearchResult);
    // this method can be used to both select and deselect country
    select ? await browser.wait(commonChartPage.isCountryAddedInUrl(country)) : await browser.wait(commonChartPage.isCountryAddedInUrl(country, false));
    await Helper.waitForSpinner();

    return await commonChartPage.waitForSliderToBeReady();
  }

  async deselectCountryInSearch(country: string, inputSelector?: ElementFinder, resultSelector?: ElementFinder): Promise<{}> {
    // cilck on country name in search results and wait for it to disappear
    // LineChart-page use it's own selectors
    return await this.searchAndSelectCountry(country, inputSelector, resultSelector, false);
  }

  async selectInColorDropdown(element: ElementFinder): Promise<{}> {
    await Helper.safeClick(this.colorDropDown);
    await Helper.safeClick(element);

    return await Helper.waitForSpinner();
  }
}
