import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

import { Helper } from '../helpers/helper';
import { CommonChartPage } from './common-chart.po';

const commonChartPage: CommonChartPage = new CommonChartPage();
const EC = protractor.ExpectedConditions;

export class Sidebar {
  colorDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').first();
  searchInputField: ElementFinder = $('.vzb-find-search');
  public searchResult: ElementFinder = $('.vzb-find-item.vzb-dialog-checkbox label'); // TODO

  optionsButton: ElementFinder = $$('[data-btn="moreoptions"]').last();
  optionsMenuSizeButton: ElementFinder = $$('span[data-vzb-translate="buttons/size"]').last();
  optionsMenuBubblesResizeToddler: ElementFinder = $$('.vzb-slider.vzb-slider-bubblesize .w').last();
  optionsXandY = {
    openBtn: $('[data-vzb-translate="buttons/axes"]'),
    xMin: $$('.vzb-mmi-zoomedmin').first(),
    xMax: $$('.vzb-mmi-zoomedmax').first(),
    yMin: $$('.vzb-mmi-zoomedmin').last(),
    yMax: $$('.vzb-mmi-zoomedmax').last()
  };
  optionsOkBtn: ElementFinder = $$('.vzb-dialog-button.vzb-label-primary').last();

  colorIndicatorDropdown: ElementFinder = $$('span[class="vzb-ip-holder"] > span').get(8); // TODO
  sizeListBabiesPerWomanColorIndicator: ElementFinder = $$('span[class="vzb-treemenu-list-item-label"]').first();
  sizeDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').get(1);
  optionsModalDialogue: ElementArrayFinder = $$('div[data-dlg="moreoptions"]');
  optionsMenuHandIcon: ElementFinder = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');
  zoomButton: ElementFinder = $$('[data-btn="plus"]').first();

  advancedSection: ElementArrayFinder = $$('.vzb-tool-buttonlist');
  findButton: ElementFinder = this.advancedSection.$$('[data-btn="find"]').last();
  countriesInFindModal: ElementArrayFinder = $$('.vzb-find-item.vzb-dialog-checkbox');

  sidebar = {
    colorsSection: $('[data-dlg="colors"]'),
    miniMap: $('.vzb-cl-minimap'),
    searchSection: $('.vzb-find-filter'),
    countriesList: $('.vzb-find-list'),
    advancedButtons: $('.vzb-tool-buttonlist')
  };

  minimapAsiaRegion = this.sidebar.miniMap.$$('path').first(); // TODO maybe add selector to vizabi

  color = {
    childMortalityRate: $$('span[class="vzb-treemenu-list-item-label"]').get(3), // TODO add test class to vizabi
    incomePerPerson: $$('span[class="vzb-treemenu-list-item-label"]').get(4), // TODO add test class to vizabi
    mainReligion: element(by.cssContainingText('.vzb-treemenu-list-item-label', 'Main religion')),
    firstColor: $$('.vzb-cl-color-sample').first()
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

  async clickOnCountryFromList(country: string, resultSelector = this.searchResult): Promise<void> {
    const countryFromList = await Helper.findElementByExactText(resultSelector, country);
    await Helper.safeClick(countryFromList);

    await browser.wait(commonChartPage.isCountryAddedInUrl(country));
    await commonChartPage.waitForSliderToBeReady();
  }

  async selectInColorDropdown(element: ElementFinder): Promise<{}> {
    await Helper.safeClick(this.colorDropDown);
    await Helper.safeClick(element);

    return await Helper.waitForSpinner();
  }

  async getColorFromColorSection(): Promise<string> {
    return await this.color.firstColor.getCssValue('background-color');
  }

  async clickOnFindButton(): Promise<void> {
    await Helper.safeClick(this.findButton);
    await browser.wait(EC.visibilityOf(this.countriesInFindModal.first()));
  }

  async hoverMinimapRegion(region: string): Promise<void> {
    // TODO make this work for specific region
    // const elem = await this.sidebar.miniMap.$$('path').first();

    return await browser.actions().mouseMove(this.minimapAsiaRegion, {x: 20, y: 10}).perform();
  }
}
