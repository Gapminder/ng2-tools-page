import { browser } from 'protractor';

import { Helper } from './helpers/helper';
import { CommonChartSidebar } from './pages/CommonChartSidebar-page';
import { CommonChartPage } from './pages/CommonChartPage-page';
import { BubbleChart } from './pages/BubbleChart-page';

const sidebar = new CommonChartSidebar();
const commonChartPage = new CommonChartPage();
const bubbleChart = new BubbleChart();

beforeAll(() => {
  browser.waitForAngularEnabled(false);
});

beforeEach(async() => {
  await browser.get('/');
  await bubbleChart.openChart();
  expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + bubbleChart.url);
});

describe('Bubbles chart - Acceptance', () => {
  it('should check that there is a data warning to the bottom right(TC05)', async() => {
    await Helper.safeClick(bubbleChart.dataDoubtsLink);
    await Helper.safeExpectIsDispayed(bubbleChart.dataDoubtsWindow);
  });

  it('hover biggest bubbles: red, yellow, green and blue', async() => {
    /**
     * should check bubbles react to hovering and tooltip appears, and contains the country name.
     * In 2015 the biggest red bubbles: "China", "India"; the biggest green - "United states"
     * the biggest yellow is "Russia" and the biggest blue is "Nigeria"(TC06)
     */


    /**
     *  bubbleChart.hoverMouseOverBubble(bubble color, index in arrayFinder, x-coordinate, y-coordinate;
     */
    // hove biggest yellow
    await bubbleChart.hoverMouseOverBubble('yellow');
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('Russia');

    // hove biggest red
    await bubbleChart.hoverMouseOverBubble('red', 0, 10, 10); // fine tune coordinates because other bubble overlaps it
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('China');

    // hove biggest blue
    await bubbleChart.hoverMouseOverBubble('blue');
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('Nigeria');

    // hove biggest green
    await bubbleChart.hoverMouseOverBubble('green', 0, 10, 10); // fine tune coordinates because other bubble overlaps it
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('United States');

    // hover second biggest red bubble
    await bubbleChart.hoverMouseOverBubble('red', 1);
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('India');
  });

  it('United states bubble data', async() => {
    /**
     * United states have in 2015: GDP: 53354 $/year/person(TC07)
     */
    await bubbleChart.hoverUnitedStates();
    expect(await bubbleChart.bubbleLabelOnMouseHover.getText()).toContain('United States');
    expect(await bubbleChart.axisXValue.getText()).toEqual('53.4k');
  });

  fit('only selected bubble get full opacity', async() => {
    /**
     * should check that clicking the bubble of the United States should select it. The bubble gets full opacity,
     * while the other bubbles get lower opacity(TC08)
     */
    expect(await bubbleChart.countBubblesByOpacity(0.3)).toBe(0, 'no elements with low opacity');
    await bubbleChart.clickOnUnitedStates();

    expect(await bubbleChart.getCountryBubble('USA').getCssValue('opacity')).toEqual('1');
    expect(await bubbleChart.countBubblesByOpacity(0.3)).toBe(254);
    expect(await bubbleChart.countBubblesByOpacity(1)).toBe(1);
    expect(await bubbleChart.getCountryBubble('India').getCssValue('opacity')).toEqual('0.3');
  });

  it('drag and drop bubble label', async() => {
    /**
     * should check that label "United States" can be dragged and dropped anywhere in the chart area(TC09)
     */
    await bubbleChart.clickOnUnitedStates();

    const initialLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');

    await bubbleChart.dragAndDropSelectedCountryLabelBubblesChart(200, 300);
    const newLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');

    await expect(initialLabelPosition).not.toEqual(newLabelPosition);

    await bubbleChart.dragAndDropSelectedCountryLabelBubblesChart(250, 100);

    const finalLabelPosition = await bubbleChart.countrySelectedBiggerLabel.getAttribute('transform');
    await expect(newLabelPosition).not.toEqual(finalLabelPosition);
  });

  it('deselect bubble on click', async() => {
    /**
     * should check that the bubble can be deselected by clicking on the "x" of the label "United States",
     * or by clicking on the bubble(TC10)
     */
    await bubbleChart.clickOnCountryBubble('India');
    await bubbleChart.clickXiconOnBubble('India');

    expect(await bubbleChart.tooltipOnClick.isPresent()).toBe(false, 'tooltip should be hidden');

    await bubbleChart.clickOnCountryBubble('India');
    await bubbleChart.diselectBubble('India');

    expect(await bubbleChart.tooltipOnClick.isPresent()).toBe(false, 'tooltip should be hidden');
  });

  it('deselect country using search field', async() => {
    // should check that countries could be selected/deselected using the button "Find" to the right(TC11)
    await bubbleChart.searchAndSelectCountry('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await bubbleChart.searchAndSelectCountry('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(2);

    await bubbleChart.searchAndSelectCountry('Brazil');
    expect(await bubbleChart.selectedCountries.count()).toEqual(3);

    expect(bubbleChart.selectedCountries.getText()).toMatch('China 2015');
    expect(bubbleChart.selectedCountries.getText()).toMatch('India 2015');
    expect(bubbleChart.selectedCountries.getText()).toMatch('Brazil 2015');
    expect(browser.getCurrentUrl()).toContain('geo=ind');
    expect(browser.getCurrentUrl()).toContain('geo=chn');
    expect(browser.getCurrentUrl()).toContain('geo=bra');

    await bubbleChart.diselectCountryInSearch('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(2);

    await bubbleChart.diselectCountryInSearch('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await bubbleChart.diselectCountryInSearch('Brazil');
    expect(await bubbleChart.selectedCountries.count()).toEqual(0);

    expect(browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(browser.getCurrentUrl()).not.toContain('geo=chn');
    expect(browser.getCurrentUrl()).not.toContain('geo=bra');
  });

  it('trialsegments for bubbles on play', async() => {
    /**
     * should check that when select China and the United States bubbles and click on play,
     * the trails being left for those two countries(TC13)
     */
    await bubbleChart.searchAndSelectCountry('China');
    await bubbleChart.searchAndSelectCountry('United States');

    await Helper.safeClick(CommonChartPage.buttonPlay);
    await browser.sleep(5000);
    await Helper.safeClick(CommonChartPage.buttonPause);

    expect(await bubbleChart.chinaTrails.count()).toBeGreaterThan(20);
    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(20);

    await Helper.safeClick(CommonChartPage.buttonPlay);
    await browser.sleep(5000);
    await Helper.safeClick(CommonChartPage.buttonPause);

    expect(await bubbleChart.chinaTrails.count()).toBeGreaterThan(50);
    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(50);
  });

  it(`trialsegments for bubbles on drag'n'drop`, async() => {
    /**
     * should check that when select China and the United States bubbles and and drag the timeslider,
     * the trails being left for those two countries(TC14)
     */
    await bubbleChart.clickOnChina();
    await bubbleChart.clickOnUnitedStates();

    await bubbleChart.dragSliderToMiddle();
    await bubbleChart.dragSliderToRightEdge();

    expect(await bubbleChart.chinaTrails.count()).toBeGreaterThan(100);
    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(100);
  });

  it('Lock button', async() => {
    /**
     * should check that when select a country, click "Lock", and drag the time slider or play,
     * all unselected countries stay in place and only the selected one moves(TC15)
     */
    await bubbleChart.clickOnChina();

    const coordinatesOfUnselectedBubbles = await bubbleChart.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    const xCoord = await bubbleChart.getCountryBubble('China').getAttribute('cx');
    const yCoord = await bubbleChart.getCountryBubble('China').getAttribute('cy');

    await Helper.safeClick(bubbleChart.lockButton);
    await Helper.safeClick(bubbleChart.trailsButton);
    await bubbleChart.dragSliderToMiddle();

    const coordinatesOfUnselectedBubbles2 = await bubbleChart.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    await expect(coordinatesOfUnselectedBubbles).toEqual(coordinatesOfUnselectedBubbles2);

    await Helper.safeClick(CommonChartPage.buttonPlay);
    browser.sleep(3000);
    await Helper.safeClick(CommonChartPage.buttonPause);

    const coordinatesOfUnselectedBubbles3 = await bubbleChart.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    await expect(coordinatesOfUnselectedBubbles2).toEqual(coordinatesOfUnselectedBubbles3);

    const xCoordNew = await bubbleChart.getCountryBubble('China').getAttribute('cx');
    const yCoordNew = await bubbleChart.getCountryBubble('China').getAttribute('cy');
    await expect(xCoord).not.toEqual(xCoordNew);
    await expect(yCoord).not.toEqual(yCoordNew);
  });

  it('Size section', async() => {
    /**
     * should check that click on Size, a pop up with size sliders comes up,
     * the minimum and maximum sizes of bubbles can be changed. They update instantaneously(TC16)
     */
    const initialRadius = await bubbleChart.getBubblesRadius();

    Helper.safeClick(sidebar.optionsButton);
    Helper.safeClick(sidebar.optionsMenuSizeButton);
    Helper.safeDragAndDrop(sidebar.optionsMenuBubblesResizeToddler, {x: 60, y: 0});

    const finalRadius = await bubbleChart.getBubblesRadius();

    await expect(initialRadius).not.toEqual(finalRadius);
    // await expect(finalRadius[0]).toBeGreaterThan(initialRadius); // TODO add check like this
  });

  it('change Size indicator', async() => {
    /**
     * should check that the indicator represented by the Size can be changed(TC16)
     */
    await Helper.safeClick(sidebar.optionsButton);
    await Helper.safeClick(sidebar.optionsMenuSizeButton);

    const initialBubblesCount = await bubbleChart.allBubbles.count();
    const initialIndicator = await sidebar.colorIndicatorDropdown.getText();

    await Helper.safeClick(sidebar.colorIndicatorDropdown);
    await Helper.safeClick(sidebar.sizeListBabiesPerWomanColorIndicator);
    await Helper.waitForSpinner();

    const finalBubblesCount = await bubbleChart.allBubbles.count();
    const finalIndicator = await sidebar.colorIndicatorDropdown.getText();

    await expect(initialIndicator).not.toEqual(finalIndicator);
    await expect(initialBubblesCount).not.toEqual(finalBubblesCount);

    await Helper.safeClick(sidebar.optionsButton);
    expect(await sidebar.sizeDropDown.getText()).toEqual(finalIndicator);
  });

  it('clicking color bring the panel. Color of bubbles can be changed(TC17)', async() => {
    const usaBubbleInitialColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleInitialColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleInitialColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    await sidebar.selectInColorDropdown(sidebar.color.childMortalityRate);

    expect(await sidebar.colorDropDown.getText()).toContain('Child mortality');

    const usaBubbleNewColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleNewColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleNewColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    expect(usaBubbleInitialColor).not.toEqual(usaBubbleNewColor);
    expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleNewColor);
    expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleNewColor);

    await sidebar.selectInColorDropdown(sidebar.color.incomePerPerson);

    expect(await sidebar.colorDropDown.getText()).toContain('Income per person');

    const usaBubbleFinalColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleFinalColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleFinalColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    await expect(usaBubbleInitialColor).not.toEqual(usaBubbleFinalColor);
    await expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleFinalColor);
    await expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleFinalColor);
  });

  it(`drag'n'drop panel using the hand icon`, async() => {
    /**
     * should check that on large screen resolutions panel can be dragged using the hand icon(TC18)
     */
    await Helper.safeClick(sidebar.optionsButton);

    const optionsDialogueTopInitialPosition = await sidebar.optionsModalDialogue.getCssValue('top');
    const optionsDialogueRightInitialPosition = await sidebar.optionsModalDialogue.getCssValue('right');

    await Helper.safeDragAndDrop(sidebar.optionsMenuHandIcon, {x: -260, y: -100});

    const optionsDialogueTopNewPosition = await sidebar.optionsModalDialogue.getCssValue('top');
    const optionsDialogueRightNewPosition = await sidebar.optionsModalDialogue.getCssValue('right');

    await expect(optionsDialogueTopInitialPosition).not.toEqual(optionsDialogueTopNewPosition);
    await expect(optionsDialogueRightInitialPosition).not.toEqual(optionsDialogueRightNewPosition);

    await Helper.safeDragAndDrop(sidebar.optionsMenuHandIcon, {x: -350, y: -200});

    const optionsDialogueTopFinalPosition = await sidebar.optionsModalDialogue.getCssValue('top');
    const optionsDialogueRightFinalPosition = await sidebar.optionsModalDialogue.getCssValue('right');

    await expect(optionsDialogueTopNewPosition).not.toEqual(optionsDialogueTopFinalPosition);
    await expect(optionsDialogueRightNewPosition).not.toEqual(optionsDialogueRightFinalPosition);
  });

// TODO complete this after Mountains chart tests
// it('restore default charts settigns', async() => {
//   /**
//    * should check that user is able to restore charts to their default values after changing
//    * the indicators again and again(TC77)
//    */
//   // load bubble chart, switch Y to less time-available indicator. Like number of billionaires or something.
//   // Check time slider range, it should be restricted to only a few >years.
//   // Switch Y back to less: time slider should be back to 1800-2015 or what we had at start
//   page.axisYTitle.click();
//   page.axisYSearchFieldInputField.clear().sendKeys('Dollar billionaires');
//   page.waitForTextPresentForElement(page.axisYFirstSearchResult, ('Dollar billionaires'));
//   page.axisYFirstSearchResult.click();
//   page.waitForPageToBeReloadedAfterAction();
//
//   expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2007');
//
//   page.axisYTitle.click();
//   page.sizeListLifeExpectancyColorIndicator.click();
//   page.waitForPageToBeReloadedAfterAction();
//
//   expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2007');
//
//   page.dragSliderToPosition(500, 0);
//
//   expect(page.sliderSelectedYear.getAttribute('textContent')).toContain('2015');
// });

  it('x, y, trails and zoom remains after page refresh', async() => {
    /**
     * should check that x, y, trails and zoom  remains after page refresh(TC79)
     */
    // When X is time and showing a trail, zoom a rectangle on the part of the picture. Note min-max for x and y.
    // Refresh. Min-max for x and y should be the same. Trail should be preserved too
    await bubbleChart.searchAndSelectCountry('China');

    await bubbleChart.dragSliderToStart();
    await bubbleChart.dragSliderToMiddle();

    await Helper.safeClick(sidebar.zoomButton);
    await Helper.safeDragAndDrop(bubbleChart.selectedCountryLabel, {x: 250, y: 250});

    const axisYMaxValue = commonChartPage.axisYMaxValue.getAttribute('TextContent');
    const axisXMaxValue = commonChartPage.axisXMaxValue.getAttribute('TextContent');
    const trailsCount = bubbleChart.chinaTrails.count();

    await bubbleChart.refreshPage();

    const axisYNewMaxValue = commonChartPage.axisYMaxValue.getAttribute('TextContent');
    const axisXNewMaxValue = commonChartPage.axisXMaxValue.getAttribute('TextContent');
    const trailsCountNew = bubbleChart.chinaTrails.count();

    await expect(axisXMaxValue).toEqual(axisXNewMaxValue);
    await expect(axisYMaxValue).toEqual(axisYNewMaxValue);
    await expect(trailsCount).toEqual(trailsCountNew);
  });
});
