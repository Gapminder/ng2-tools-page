'use strict';

const ToolsPage = require('./pages/tools-page');

let page;
const EC = protractor.ExpectedConditions;

beforeEach(() => {
  page = new ToolsPage();
});

describe('Bubbles chart - Acceptance', () => {
  it('should check that there is a data warning to the bottom right(TC05)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.dataDoubtsLink.click();
    expect(page.dataDoubtsWindow).toBeTruthy();
    done();
  });

  it('should check bubbles react to hovering and tooltip appears, and contains the country name.' +
    'In 2015 the biggest red bubbles: "China", "India"; the biggest green - "United states", ' +
    'the biggest yellow is "Russia" and the biggest blue is "Nigeria"(TC06)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.hoverMouseOverBiggestYellowBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover).toBeTruthy();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("Russia");

    browser.actions().mouseMove(page.pageHeader).perform();
    page.hoverMouseOverFirstBiggestRedBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("China");

    browser.actions().mouseMove(page.pageHeader).perform();
    page.hoverMouseOverBiggestBlueBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("Nigeria");

    browser.actions().mouseMove(page.pageHeader).perform();
    page.hoverMouseOverBiggestGreenBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("United States");

    browser.actions().mouseMove(page.pageHeader).perform();
    page.hoverMouseOverSecondBiggestRedBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("India");

    done();
  });

  it('should check that United states have in 2015: GDP: 53354 $/year/person(TC07)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.hoverMouseOverBiggestGreenBubbleBubblesChart();
    expect(page.bubblesChartBubbleLabelOnMouseHover.getText()).toContain("United States");
    expect(page.bubblesChartAxisXValue.getText()).toEqual('53.4k');

    done();
  });

  it('should check that clicking the bubble of the United States should select it. The bubble gets full opacity, ' +
    'while the other bubbles get lower opacity(TC08)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    expect(page.countElementsByOpacity(page.bubblesChartAllBubbles, 0.3)).toBe(0);

    page.selectBiggestGreenBubbleBubblesChart();

    expect(page.bubblesChartUnitedStatesBubble.getCssValue('opacity')).toEqual('1');
    expect(page.countElementsByOpacity(page.bubblesChartAllBubbles, 0.3)).toBe(254);
    expect(page.countElementsByOpacity(page.bubblesChartAllBubbles, 1)).toBe(1);
    expect(page.bubblesChartIndiaBubble.getCssValue('opacity')).toEqual('0.3');

    done();
  });

  it('should check that label "United States" can be dragged and dropped anywhere in the chart area(TC09)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.selectBiggestGreenBubbleBubblesChart();

    let initialLabelPosition = page.bubblesChartCountrySelectedBiggerLabel.getAttribute('transform');

    page.dragAndDropSelectedCountryLabelBubblesChart(200, 300);

    let newLabelPosition = page.bubblesChartCountrySelectedBiggerLabel.getAttribute('transform');
    expect(initialLabelPosition).not.toEqual(newLabelPosition);

    page.dragAndDropSelectedCountryLabelBubblesChart(-250, 100);

    let finalLabelPosition = page.bubblesChartCountrySelectedBiggerLabel.getAttribute('transform');
    expect(newLabelPosition).not.toEqual(finalLabelPosition);

    done();
  });

  it('should check that the bubble can be deselected by clicking on the "x" of the label "United States",' +
    ' or by clicking on the bubble(TC10)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.selectBiggestGreenBubbleBubblesChart();
    page.deselectCountryByClickingCrossMarkOnLabelBubblesChart();

    expect(page.bubblesChartBubbleLabelOnMouseHover).toBeTruthy();

    page.selectBiggestGreenBubbleBubblesChart();
    page.selectBiggestGreenBubbleBubblesChart();

    expect(page.bubblesChartBubbleLabelOnMouseHover).toBeTruthy();
    done();
  });

  it('should check that countries could be selected/deselected using the button "Find" to the right(TC11)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.searchAndSelectCountry("China");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(1);

    page.searchAndSelectCountry("India");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(2);

    page.searchAndSelectCountry("Brazil");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(3);

    expect(page.bubblesChartSelectedCountries.getText()).toContain("China 2015");
    expect(page.bubblesChartSelectedCountries.getText()).toContain("India 2015");
    expect(page.bubblesChartSelectedCountries.getText()).toContain("Brazil 2015");
    expect(browser.getCurrentUrl()).toContain('geo=ind');
    expect(browser.getCurrentUrl()).toContain('geo=chn');
    expect(browser.getCurrentUrl()).toContain('geo=bra');

    page.deselectCountryInSearchMenu("India");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(2);

    page.deselectCountryInSearchMenu("China");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(1);

    page.deselectCountryInSearchMenu("Brazil");
    page.waitForPageToBeReloadedAfterAction();
    expect(page.bubblesChartSelectedCountries.count()).toEqual(0);

    expect(browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(browser.getCurrentUrl()).not.toContain('geo=chn');
    expect(browser.getCurrentUrl()).not.toContain('geo=bra');

    done();
  });

  it('should check that when select China and the United States bubbles and click on play,' +
    ' the trails being left for those two countries(TC13)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.searchAndSelectCountry("China");

    page.searchAndSelectCountry("United states");

    page.buttonPlay.click();
    browser.sleep(5000);
    page.buttonPause.click();

    expect(page.bubblesChartChinaTrails.count()).toBeGreaterThan(20);
    expect(page.bubblesChartUnitedStatesTrails.count()).toBeGreaterThan(20);

    page.buttonPlay.click();
    browser.sleep(5000);
    page.buttonPause.click();

    expect(page.bubblesChartChinaTrails.count()).toBeGreaterThan(50);
    expect(page.bubblesChartUnitedStatesTrails.count()).toBeGreaterThan(50);

    done();
  });

  it('should check that when select China and the United States bubbles and and drag the timeslider,' +
    ' the trails being left for those two countries(TC14)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.searchAndSelectCountry("China");
    page.searchAndSelectCountry("United states");

    page.dragSlider();
    page.dragSliderToPosition(800, 0);

    browser.sleep(2000);
    expect(page.bubblesChartChinaTrails.count()).toBeGreaterThan(100);
    expect(page.bubblesChartUnitedStatesTrails.count()).toBeGreaterThan(100);

    done();
  });

  it('should check that when select a country, click "Lock", and drag the time slider or play, ' +
    'all unselected countries stay in place and only the selected one moves(TC15)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.searchAndSelectCountry("China");

    let coordinatesOfUnselectedBubbles = page.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    coordinatesOfUnselectedBubbles.then(function (elementsArray1) {
      let xCoord = page.bubblesChartChinaBubble.getAttribute('cx');
      let yCoord = page.bubblesChartChinaBubble.getAttribute('cy');
      page.bubblesChartLockButton.click();
      page.bubblesChartTrailsButton.click();
      page.dragSlider();

      let coordinatesOfUnselectedBubbles2 = page.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

      coordinatesOfUnselectedBubbles2.then(function (elementsArray2) {
        expect(elementsArray1).toEqual(elementsArray2);

        page.buttonPlay.click();
        browser.sleep(3000);
        page.buttonPause.click();

        let coordinatesOfUnselectedBubbles3 = page.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

        coordinatesOfUnselectedBubbles3.then(function (elementsArray3) {
          expect(elementsArray2).toEqual(elementsArray3);

          let xCoordNew = page.bubblesChartChinaBubble.getAttribute('cx');
          let yCoordNew = page.bubblesChartChinaBubble.getAttribute('cy');
          expect(xCoord).not.toEqual(xCoordNew);
          expect(yCoord).not.toEqual(yCoordNew);

          done();
        });
      });
    });
  });

  it('should check that click on Size, a pop up with size sliders comes up,' +
    ' the minimum and maximum sizes of bubbles can be changed. They update instantaneously(TC16)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    let initialRadius = page.getRadiusOfBubblesOnBubblesChart();
    initialRadius.then(function () {
      page.rightSidePanelOptionsButton.click();
      browser.wait(EC.presenceOf(page.rightSidePanelOptionsMenuSizeButton));
      page.rightSidePanelOptionsMenuSizeButton.click();
      browser.wait(EC.presenceOf(page.rightSidePanelOptionsMenuBubblesResizeButton));
      page.dragElementToPosition(page.rightSidePanelOptionsMenuBubblesResizeButton, 60, 0);
    });

    let finalRadius = page.getRadiusOfBubblesOnBubblesChart();
    expect(initialRadius).not.toEqual(finalRadius);
    done();
  });


  it('should check that the indicator represented by the Size can be changed(TC16)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.rightSidePanelOptionsButton.click();
    page.rightSidePanelOptionsMenuSizeButton.click();

    let initialBubblesCount = page.bubblesChartAllBubbles.count();
    let initialIndicator = page.rightSidePanelColorIndicatorDropdown.getText();
    initialIndicator.then(function () {
      page.rightSidePanelColorIndicatorDropdown.click();
      page.sizeListBabiesPerWomanColorIndicator.click();
      page.waitForPageToBeReloadedAfterAction();
      let finalBubblesCount = page.bubblesChartAllBubbles.count();
      let finalIndicator = page.rightSidePanelColorIndicatorDropdown.getText();

      expect(initialIndicator).not.toEqual(finalIndicator);
      expect(initialBubblesCount).not.toEqual(finalBubblesCount);

      page.rightSidePanelOptionsButton.click();
      expect(page.rightSidePanelSizeDropDown.getText()).toEqual(finalIndicator);
    });

    done();
  });

  it('should check that clicking color bring the panel. Color of bubbles can be changed(TC17)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    let usaBubbleInitialColor = page.bubblesChartUnitedStatesBubble.getCssValue('fill');
    let indiaBubbleInitialColor = page.bubblesChartIndiaBubble.getCssValue('fill');
    let chinaBubbleInitialColor = page.bubblesChartChinaBubble.getCssValue('fill');

    page.rightSidePanelColorDropDown.click();
    page.sizeListChildMortalityRateColorIndicator.click();
    page.waitForPageToBeReloadedAfterAction();

    expect(page.rightSidePanelColorDropDown.getText()).toContain("Child mortality rate");
    expect(page.rightSidePanelColorIndicatorDescription.getText()).toContain("deaths under age 5 per 1000 births");

    let usaBubbleNewColor = page.bubblesChartUnitedStatesBubble.getCssValue('fill');
    let indiaBubbleNewColor = page.bubblesChartIndiaBubble.getCssValue('fill');
    let chinaBubbleNewColor = page.bubblesChartChinaBubble.getCssValue('fill');

    expect(usaBubbleInitialColor).not.toEqual(usaBubbleNewColor);
    expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleNewColor);
    expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleNewColor);

    page.rightSidePanelColorDropDown.click();
    page.sizeListIncomePerPersonColorIndicator.click();
    page.waitForPageToBeReloadedAfterAction();

    expect(page.rightSidePanelColorDropDown.getText()).toContain("Income per person");
    expect(page.rightSidePanelColorIndicatorDescription.getText()).toContain("GDP/capita in $/year adjusted for inflation & prices");

    let usaBubbleFinalColor = page.bubblesChartUnitedStatesBubble.getCssValue('fill');
    let indiaBubbleFinalColor = page.bubblesChartIndiaBubble.getCssValue('fill');
    let chinaBubbleFinalColor = page.bubblesChartChinaBubble.getCssValue('fill');

    expect(usaBubbleInitialColor).not.toEqual(usaBubbleFinalColor);
    expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleFinalColor);
    expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleFinalColor);

    done();
  });

  it('should check that on large screen resolutions panel can be dragged using the hand icon(TC18)', done => {
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.rightSidePanelOptionsButton.click();
    let optionsDialogueTopInitialPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('top');
    let optionsDialogueRightInitialPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('right');

    page.dragElementToPosition(page.rightSidePanelOptionsMenuHandIcon, -260, -100);

    let optionsDialogueTopNewPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('top');
    let optionsDialogueRightNewPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('right');

    expect(optionsDialogueTopInitialPosition).not.toEqual(optionsDialogueTopNewPosition);
    expect(optionsDialogueRightInitialPosition).not.toEqual(optionsDialogueRightNewPosition);

    page.dragElementToPosition(page.rightSidePanelOptionsMenuHandIcon, -350, -200);

    let optionsDialogueTopFinalPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('top');
    let optionsDialogueRightFinalPosition = page.rightSidePanelOptionsModalDialogue.getCssValue('right');

    expect(optionsDialogueTopNewPosition).not.toEqual(optionsDialogueTopFinalPosition);
    expect(optionsDialogueRightNewPosition).not.toEqual(optionsDialogueRightFinalPosition);

    done();
  });

  it('should check that user is able to restore charts to their default values after changing' +
    ' the indicators again and again(TC77)', done => {
    //load bubble chart, switch Y to less time-available indicator. Like number of billionaires or something.
    // Check time slider range, it should be restricted to only a few >years.
    // Switch Y back to less: time slider should be back to 1800-2015 or what we had at start
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.axisYTitle.click();
    page.axisYSearchFieldInputField.clear().sendKeys('Dollar billionaires');
    page.waitForTextPresentForElement(page.axisYFirstSearchResult, ('Dollar billionaires'));
    page.axisYFirstSearchResult.click();
    page.waitForPageToBeReloadedAfterAction();

    expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2007');

    page.axisYTitle.click();
    page.sizeListLifeExpectancyColorIndicator.click();
    page.waitForPageToBeReloadedAfterAction();

    expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2007');

    page.dragSliderToPosition(500, 0);

    expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2015');

    done();
  });

  it('should check that x, y, trails and zoom  remains after page refresh(TC79)', done => {
    //When X is time and showing a trail, zoom a rectangle on the part of the picture. Note min-max for x and y.
    // Refresh. Min-max for x and y should be the same. Trail should be preserved too
    page.openBubblesChart();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#_chart-type=bubbles');

    page.searchAndSelectCountry("China");

    page.dragSliderToBeginning();
    page.dragSliderToPosition(1500, 0);

    page.rightSidePanelZoomButton.click();

    page.dragElementToPosition(page.bubblesChartSelectedCountryLabel, 250, 250);

    let axisYMaxValue = page.axisYMaxValue.getAttribute('TextContent');
    let axisXMaxValue = page.axisXMaxValue.getAttribute('TextContent');
    let trailsCount = page.bubblesChartChinaTrails.count();

    page.refreshToolsPage();

    let axisYNewMaxValue = page.axisYMaxValue.getAttribute('TextContent');
    let axisXNewMaxValue = page.axisXMaxValue.getAttribute('TextContent');
    let trailsCountNew = page.bubblesChartChinaTrails.count();

    expect(axisXMaxValue).toEqual(axisXNewMaxValue);
    expect(axisYMaxValue).toEqual(axisYNewMaxValue);
    expect(trailsCount).toEqual(trailsCountNew);

    done();
  });

});
