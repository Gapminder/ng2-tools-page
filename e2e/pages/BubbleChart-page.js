const EC = protractor.ExpectedConditions;

const CommonChartSidebar = require('./CommonChartSidebar-page');
const CommonChartPage = require('./CommonChartPage-page');
const commonChartSidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();

class BubbleChart {
  constructor() {
    this.url = '#_chart-type=bubbles';

    this.dataDoubtsLink = $('.vzb-data-warning');
    this.dataDoubtsWindow = $('.vzb-data-warning-body');
    this.allBubbles = $$('circle[class*="vzb-bc-entity"]');
    // this.bubbleLabelOnMouseHover = element(by.css('g[class="vzb-bc-tooltip"] > text'));
    this.bubbleLabelOnMouseHover = $('g[class="vzb-bc-tooltip"]');
    this.axisXValue = $$('g[class="vzb-axis-value"]').first();
    this.tooltipOnClick = $$('.vzb-bc-label-content');
    this.selectedCountryLabel = $$('.vzb-label-fill.vzb-tooltip-border');

    this.selectedCountries = $$('text[class="vzb-bc-label-content stroke"]');

    this.sidebar = {
      bubbleOpacityControl: $('.vzb-dialog-bubbleopacity'),
      resetFiltersBtn: $('.vzb-find-deselect'),
      zoomSection: $('.vzb-dialog-zoom-buttonlist')
    }
  }

  getSidebarElements(){
    return this.sidebar;
  }

  getCountryBubble(country){
    return $(`circle[class*="vzb-bc-entity bubble-${commonChartPage.countries[country]}"]`);
  }

  async openChart() {
    return await commonChartPage.openChart(this.url);
  }

  async dragSlider(){
    return await commonChartPage.dragSlider();
  }

  async openByClick() {
    let currentUrl = await browser.getCurrentUrl();
    // if we are already on this page no need to click on the link
    if(!currentUrl.match(this.url)){
      await commonChartPage.click(commonChartPage.bubblesChart);
      return await commonChartPage.waitForToolsPageCompletelyLoaded();
    }
  }

  async refreshPage() {
    return await commonChartPage.refreshPage();
  }

  async searchAndSelectCountry(country) {
    return commonChartSidebar.searchAndSelectCountry(country);
  }

  getSelectedCountries(){
    return this.selectedCountries;
  }

  async hoverMouseOverCountry(country) {
    await browser.actions().mouseMove(this.getCountryBubble(country)).perform();
    await browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 2000);
  }

  async filterBubbles(color, index){
    this.index = index || 0;

    const colors = {
      'red': 'rgb(255, 88, 114)',
      'yellow': 'rgb(255, 231, 0)',
      'blue': 'rgb(0, 213, 233)',
      'green': 'rgb(127, 235, 0)'
    };

    return this.allBubbles.filter(elem => {
      return elem.getCssValue('fill').then(fill => {
        return fill === colors[color];
      });
    }).then(filteredElements => {
      return filteredElements[index];
    })
  }

  hoverMouseOverBubble(color, index, x, y) {
    // this needs because some bubbles could overlay another
    this.x = x | 0;// x coordinate
    this.y = y | 0;// y coordinate

    return this.filterBubbles(color, index).then(filteredElement=>{
      browser.actions()
        .mouseMove(filteredElement, {x: this.x, y: this.y})
        .perform();
    }).then(() => {
      return browser.wait(EC.visibilityOf(this.bubbleLabelOnMouseHover), 4000);
    })
  }

  clickOnBubble(color, index, x, y) {
    // this needs because some bubbles could overlay another
    this.x = x | 0;// x coordinate
    this.y = y | 0;// y coordinate

    return this.filterBubbles(color, index).then(filteredElement=>{
      browser.actions()
        .mouseMove(filteredElement)
        .click()
        .perform();
    }).then(() => {
      return browser.wait(EC.visibilityOf(this.tooltipOnClick.last()), 4000);
    })
  }

  async hoverUnitedStates() {
    await this.hoverMouseOverBubble('green', 0, 10, 10);
  }

  async clickOnUnitedStates() {
    await this.clickOnBubble('green', 0, 10, 10);
    await browser.wait(EC.visibilityOf(this.getCountryBubble('USA')), 4000);
  }

  getSliderPosition(){
    return commonChartPage.getSliderPosition();
  }

  countElementsByOpacity(element, opacity) {
    {
      if (!opacity) {
        return element.then(function (elements) {
          return elements.length;
        });
      }
      return element.map(function (element) {
        return element.getCssValue('opacity');
      }).then(function (textArray) {
        let numElements = 0;
        for (let i in textArray) {
          if (textArray[i] == opacity) {
            numElements++;
          }
        }
        return numElements;
      });
    }
  };

  dragAndDropSelectedCountryLabelBubblesChart(x, y) {
    return browser.actions().dragAndDrop(this.selectedCountryLabel, {x: x, y: y}).perform();
  };

}

module.exports = BubbleChart;
