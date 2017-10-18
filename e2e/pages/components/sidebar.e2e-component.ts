import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor';

import {
  findElementByExactText, isCountryAddedInUrl, waitForSpinner
} from '../../helpers/helper';
import { _$, _$$, ExtendedArrayFinder, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { CommonChartPage } from '../common-chart.po';
import { LineChart } from '../line-chart.po';

export class Sidebar {
  /**
   * Note that sidebar could include specific elements in different charts
   * The elements could be added in constructor
   */
  chartType;

  /**
   *  Common elements
   *  change it carefully becaues it can affect all charts
   */
  rootElement: ElementFinder = $('.vzb-tool-sidebar');
  sidebar = {
    colorsSection: $('[data-dlg="colors"]'),
    miniMap: $('.vzb-cl-minimap'),
    searchSection: $('.vzb-find-filter'),
    countriesList: $('.vzb-find-list'),
    advancedButtons: $('.vzb-tool-buttonlist')
  };

  /**
   * Color section
   */
  colorDropDown: ExtendedElementFinder = _$$('span[class="vzb-ip-select"]').first();
  colorIndicatorDropdown: ExtendedElementFinder = _$$('span[class="vzb-ip-holder"] > span').get(8); // TODO
  color = {
    childMortalityRate: _$$('span[class="vzb-treemenu-list-item-label"]').get(3), // TODO add test class to vizabi
    incomePerPerson: _$$('span[class="vzb-treemenu-list-item-label"]').get(4), // TODO add test class to vizabi
    mainReligion: element(by.cssContainingText('.vzb-treemenu-list-item-label', 'Main religion')),
    firstColor: $$('.vzb-cl-color-sample').first()
  };
  minimapAsiaRegion = this.sidebar.miniMap.$$('path').first(); // TODO maybe add selector to vizabi

  /**
   * Search select
   */
  searchInputField: ExtendedElementFinder;
  searchResult: ExtendedArrayFinder;

  /**
   * Advanced buttons section
   */
  advancedSection: ExtendedArrayFinder = _$$('.vzb-tool-buttonlist');

  /**
   * Options
   */
  optionsButton: ExtendedElementFinder = _$$('[data-btn="moreoptions"]').last();
  optionsMenuSizeButton: ExtendedElementFinder = _$$('span[data-vzb-translate="buttons/size"]').last();
  optionsMenuBubblesResizeToddler: ExtendedElementFinder = _$$('.vzb-slider.vzb-slider-bubblesize .w').last();
  optionsXandY = {
    openBtn: $('[data-vzb-translate="buttons/axes"]'),
    xMin: $$('.vzb-mmi-zoomedmin').first(),
    xMax: $$('.vzb-mmi-zoomedmax').first(),
    yMin: $$('.vzb-mmi-zoomedmin').last(),
    yMax: $$('.vzb-mmi-zoomedmax').last()
  };
  optionsMenuHandIcon: ElementFinder = $('.thumb-tack-class-ico-drag[data-dialogtype="moreoptions"]');
  optionsModalDialogue: ElementArrayFinder = $$('div[data-dlg="moreoptions"]');
  optionsOkBtn: ElementFinder = $$('.vzb-dialog-button.vzb-label-primary').last();

  /**
   * Size
   */
  sizeDropDown: ElementFinder = $$('span[class="vzb-ip-select"]').get(1);
  sizeListBabiesPerWomanColorIndicator: ExtendedElementFinder = _$$('span[class="vzb-treemenu-list-item-label"]').first();

  /**
   * Zoom
   */
  zoomButton: ExtendedElementFinder = _$$('[data-btn="plus"]').first();

  /**
   * Find
   */
  findButton: ExtendedElementFinder = _$$('[data-btn="find"]').last();
  countriesInFindModal: ElementArrayFinder = $$('.vzb-find-item.vzb-dialog-checkbox');


  constructor(chart: any) {
    this.chartType = chart;
    this.searchResult = chart.searchResult || _$$('.vzb-find-item.vzb-dialog-checkbox label');
    this.searchInputField = chart.searchInputField || _$('.vzb-find-search');
  }

  async waitForVisible(): Promise<void> {
    await browser.wait(EC.visibilityOf(this.rootElement), 10000, `element ${this.rootElement.locator()} not visible`);
    await browser.wait(EC.visibilityOf(this.colorDropDown), 10000, `element ${this.rootElement.locator()} not visible`);
    await browser.wait(EC.visibilityOf(this.searchInputField), 10000, `element ${this.rootElement.locator()} not visible`);
  }

  async searchAndSelectCountry(country: string, select = true): Promise<void> {
    /**
     * this method can be used to both select and deselect country
     * LineChart-page use it's own selectors
     */
    await this.searchInputField.typeText(country);
    await this.searchResult.findElementByExactText(country).safeClick();

    await browser.wait(isCountryAddedInUrl(country, select));

    await waitForSpinner();
  }

  async deselectCountryInSearch(country: string): Promise<void> {
    /**
     * cilck on country name in search results and wait for it to disappear
     * LineChart-page use it's own selectors
     */
    await this.searchAndSelectCountry(country, false);
  }

  async clickOnCountryFromList(country: string): Promise<void> {
    const countryFromList: ElementFinder = await findElementByExactText(this.searchResult, country);

    await new ExtendedElementFinder(countryFromList).safeClick();
    await browser.wait(isCountryAddedInUrl(country));
    await waitForSpinner();
  }

  async selectInColorDropdown(element: ExtendedElementFinder | ElementFinder): Promise<{}> {
    await this.colorDropDown.safeClick();

    if (element instanceof ExtendedElementFinder) {
      await element.safeClick();
    } else {
      await new ExtendedElementFinder(element).safeClick();
    }

    return await waitForSpinner();
  }

  async getColorFromColorSection(): Promise<string> {
    return await this.color.firstColor.getCssValue('background-color');
  }

  async clickOnFindButton(): Promise<void> {
    await this.findButton.safeClick();
    await browser.wait(EC.visibilityOf(this.countriesInFindModal.first()));
  }

  async hoverMinimapRegion(region: string): Promise<void> {
    // TODO make this work for specific region
    // const elem = await this.sidebar.miniMap.$$('path').first();

    return await browser.actions().mouseMove(this.minimapAsiaRegion, {x: 20, y: 10}).perform();
  }
}
