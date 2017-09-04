'use strict';

const ToolsPage = require('./pages/tools-page');

let page;

beforeEach(() => {
  page = new ToolsPage();
});

afterEach(function() {
  browser.manage().logs().get('browser').then(function(browserLog) {
    console.log('\nbrowser log: ' + require('util').inspect(browserLog));
  });
});

describe('Maps chart - Acceptance', () => {
  it('should check the bubbles change size with timeslider drag and play(TC25)', done => {
    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    let initialSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
    page.searchAndSelectCountry("China");
    let initialBubbleSize = page.mapsChartSelectedCountries.getAttribute('r');

    page.dragSlider();

    let finalSelectedYear = page.sliderSelectedYear.getAttribute('textContent');
    let draggedBubbleSize = page.mapsChartSelectedCountries.getAttribute('r');

    expect(initialSelectedYear).not.toEqual(finalSelectedYear);
    expect(initialBubbleSize).not.toEqual(draggedBubbleSize);

    page.buttonPlay.click();
    browser.sleep(3000);

    page.buttonPause.click();
    let finalBubbleSize = page.mapsChartSelectedCountries.getAttribute('r');
    expect(finalBubbleSize).not.toEqual(draggedBubbleSize);

    done();
  });

  it('should check bubbles react to hovering and a tooltip appears, and contains the country name.' +
    'In 2015 the biggest red bubbles: "China", "India"; the biggest green - "United states", ' +
    'the biggest yellow is "Russia" and the biggest blue is "Nigeria"(TC27)', done => {
    const EC = protractor.ExpectedConditions;

    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    browser.wait(EC.presenceOf(page.mapsChartAllBubbles));

    page.hoverMouseOverFirstBiggestRedBubbleMapsChart();

    browser.wait(EC.presenceOf(page.mapsChartBubbleLabelOnMouseHover));

    expect(page.mapsChartBubbleLabelOnMouseHover).toBeTruthy();
    expect(page.mapsChartBubbleLabelOnMouseHover.getText()).toContain("China");

    page.hoverMouseOverSecondBiggestRedBubbleMapsChart();
    browser.sleep(100);
    expect(page.mapsChartBubbleLabelOnMouseHover.getText()).toContain("India");

    page.hoverMouseOverBiggestYellowBubbleMapsChart();
    browser.sleep(100);
    expect(page.mapsChartBubbleLabelOnMouseHover.getText()).toContain("Russia");

    page.hoverMouseOverBiggestBlueBubbleMapsChart();
    browser.sleep(100);
    expect(page.mapsChartBubbleLabelOnMouseHover.getText()).toContain("Nigeria");

    page.hoverMouseOverBiggestGreenBubbleMapsChart();
    browser.sleep(100);
    expect(page.mapsChartBubbleLabelOnMouseHover.getText()).toContain("United States");

    done();
  });

  it('should check that clicking the bubble of the United States should select it. The bubble gets full opacity, ' +
    'while the other bubbles get lower opacity(TC28)', done => {
    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    let nonSelectedBubblesCount = page.mapsChartAllBubbles.count();
    page.selectBiggestGreenBubbleMapsChart();
    expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("United States");
    expect(page.mapsChartSelectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');
    expect(page.mapsChartAllBubbles.get(0).getAttribute('style')).toContain('opacity: 0.3;');
    expect(nonSelectedBubblesCount).not.toEqual(page.mapsChartAllBubbles.count());
    expect(page.getOpacityOfNonSelectedBubblesMapsChart()).not.toEqual('opacity: 1;');
    done();
  });
  it('should check that label "United States" can be dragged and dropped anywhere in the chart area(TC29)', done => {
    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    page.selectBiggestGreenBubbleMapsChart();
    let initialLabelPosition = page.mapsChartSelectedCountryLabel.getAttribute('transform');

    page.dragAndDropSelectedCountryLabelMapsChart(200, 300);

    let newLabelPosition = page.mapsChartSelectedCountryLabel.getAttribute('transform');
    expect(initialLabelPosition).not.toEqual(newLabelPosition);


    page.dragAndDropSelectedCountryLabelMapsChart(-250, 100);

    let finalLabelPosition = page.mapsChartSelectedCountryLabel.getAttribute('transform');
    expect(newLabelPosition).not.toEqual(finalLabelPosition);

    done();
  });

  it('should check that the bubble can be deselected by clicking on the "x" of the label "United States",' +
    ' or by clicking on the bubble(TC30)', done => {
    page.openMapsChart();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');
    page.selectBiggestGreenBubbleMapsChart();


    browser.sleep(500);

    page.deselectCountryByClickingCrossMarkOnLabelMapsChart();

    browser.sleep(500);

    expect(browser.isElementPresent(page.mapsChartSelectedCountryLabel)).toBeFalsy();

    page.selectBiggestGreenBubbleMapsChart();

    browser.sleep(500);

    expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("United States");
    expect(page.mapsChartSelectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');

    page.mapsChartSelectedCountries.get(0).click();

    browser.sleep(500);

    expect(browser.isElementPresent(page.mapsChartSelectedCountryLabel)).toBeFalsy();

    done();
  });

  it('should check that countries could be selected/deselected using the button "Find" to the right(TC31)', done => {
    const EC = protractor.ExpectedConditions;

    page.openMapsChart();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    page.searchAndSelectCountry("China");

    browser.wait(EC.presenceOf(page.mapsChartSelectedCountries));

    expect(page.mapsChartSelectedCountries.count()).toEqual(1);

    page.searchAndSelectCountry("India");
    browser.sleep(100);
    expect(page.mapsChartSelectedCountries.count()).toEqual(2);

    page.searchAndSelectCountry("Brazil");
    browser.sleep(100);
    expect(page.mapsChartSelectedCountries.count()).toEqual(3);

    browser.wait(EC.presenceOf(page.mapsChartSelectedCountriesLabels));

    expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("China");
    expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("India");
    expect(page.mapsChartSelectedCountriesLabels.getText()).toContain("Brazil");

    browser.wait(EC.urlContains('geo=ind'), 1000);
    browser.wait(EC.urlContains('geo=chn'), 1000);
    browser.wait(EC.urlContains('geo=bra'), 1000);

    page.deselectCountryInSearchMenu("India");
    browser.sleep(100);

    expect(page.mapsChartSelectedCountries.count()).toEqual(2);

    page.deselectCountryInSearchMenu("China");
    browser.sleep(100);
    expect(page.mapsChartSelectedCountries.count()).toEqual(1);

    page.deselectCountryInSearchMenu("Brazil");
    browser.sleep(100);
    expect(page.mapsChartSelectedCountries.count()).toEqual(0);

    browser.sleep(500);

    expect(browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(browser.getCurrentUrl()).not.toContain('geo=chn');
    expect(browser.getCurrentUrl()).not.toContain('geo=bra');

    done();
  });

  it('should check that while hovering, the chart title changes to show the exact values(TC32)', done => {
    const EC = protractor.ExpectedConditions;

    page.openMapsChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=map');

    let axisYInitialText = page.mapsChartYAxisTitle.getText();
    expect(axisYInitialText).toEqual('Size: Population');

    page.hoverMouseOverBiggestBlueBubbleMapsChart();
    browser.sleep(100);
    page.hoverMouseOverBiggestGreenBubbleMapsChart();
    browser.sleep(100);
    page.hoverMouseOverBiggestBlueBubbleMapsChart();

    browser.wait(EC.presenceOf(page.mapsChartYAxisTitle));

    let axisYTextOnBlueBubbleMouseHover = page.mapsChartYAxisTitle.getText();

    browser.wait(EC.presenceOf(page.rightSidePanelColorDropDown));
    browser.wait(EC.presenceOf(page.rightSidePanelSizeDropDown));

    let colorDropDownTextOnBlueBubbleMouseHover = page.rightSidePanelColorDropDown.getText();
    let sizeDropDownTextOnBlueBubbleMouseHover = page.rightSidePanelSizeDropDown.getText();

    expect(axisYTextOnBlueBubbleMouseHover).toEqual('Size: 181M people');
    expect(colorDropDownTextOnBlueBubbleMouseHover).toEqual('Africa');
    expect(sizeDropDownTextOnBlueBubbleMouseHover).toEqual('181M people');

    page.hoverMouseOverBiggestYellowBubbleMapsChart();
    browser.sleep(100);

    let axisYTextOnYellowBubbleMouseHover = page.mapsChartYAxisTitle.getText();
    let colorDropDownTextOnYellowBubbleMouseHover = page.rightSidePanelColorDropDown.getText();
    let sizeDropDownTextOnYellowBubbleMouseHover = page.rightSidePanelSizeDropDown.getText();

    expect(axisYTextOnYellowBubbleMouseHover).toEqual('Size: 144M people');
    expect(colorDropDownTextOnYellowBubbleMouseHover).toEqual('Europe');
    expect(sizeDropDownTextOnYellowBubbleMouseHover).toEqual('144M people');

    done();
  });

});
