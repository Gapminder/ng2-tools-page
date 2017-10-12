import { browser, protractor } from 'protractor';

import { safeDragAndDrop, safeExpectIsDispayed, waitForSpinner } from './helpers/helper';
import { Sidebar } from './pages/components/sidebar.e2e-component';
import { CommonChartPage } from './pages/common-chart.po';
import { BubbleChart } from './pages/bubble-chart.po';
import { Slider } from './pages/components/slider.e2e-component';

const commonChartPage: CommonChartPage = new CommonChartPage();
const bubbleChart: BubbleChart = new BubbleChart();
const slider: Slider = new Slider();

describe('Bubbles chart - Acceptance', () => {
  const sidebar: Sidebar = new Sidebar(bubbleChart);

  beforeEach(async() => {
    await browser.get('/');
    await bubbleChart.openChart();
  });

  it('data warning to the bottom right(TC05)', async() => {
    await bubbleChart.dataDoubtsLink.safeClick();
    await safeExpectIsDispayed(bubbleChart.dataDoubtsWindow);
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

  it('only selected bubble get full opacity', async() => {
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

    expect(await bubbleChart.countryTooltip('India').isPresent()).toBe(false, 'tooltip should be hidden');

    await bubbleChart.clickOnCountryBubble('India');
    await bubbleChart.deselectBubble('India');

    expect(await bubbleChart.countryTooltip('India').isPresent()).toBe(false, 'tooltip should be hidden');
  });

  it('deselect country using search field', async() => {
    // should check that countries could be selected/deselected using the button "Find" to the right(TC11)
    await sidebar.searchAndSelectCountry('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await sidebar.searchAndSelectCountry('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(2);

    expect(bubbleChart.selectedCountries.getText()).toMatch('China 2015');
    expect(bubbleChart.selectedCountries.getText()).toMatch('India 2015');
    expect(browser.getCurrentUrl()).toContain('geo=ind');
    expect(browser.getCurrentUrl()).toContain('geo=chn');

    await sidebar.deselectCountryInSearch('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await sidebar.deselectCountryInSearch('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(0);

    expect(browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(browser.getCurrentUrl()).not.toContain('geo=chn');
  });

  it('trialsegments for bubbles on play', async() => {
    /**
     * should check that when select China and the United States bubbles and click on play,
     * the trails being left for those two countries(TC13)
     */
    await sidebar.searchAndSelectCountry('China');
    await sidebar.searchAndSelectCountry('United States');

    await slider.playTimesliderSeconds(5);

    expect(await bubbleChart.chinaTrails.count()).toBeGreaterThan(20);
    expect(await bubbleChart.usaTrails.count()).toBeGreaterThan(20);

    await slider.playTimesliderSeconds(5);

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

    await slider.dragToMiddle();
    await slider.dragToRightEdge();

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

    await bubbleChart.lockButton.safeClick();
    await bubbleChart.trailsButton.safeClick();
    await slider.dragToMiddle();

    const coordinatesOfUnselectedBubbles2 = await bubbleChart.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    await expect(coordinatesOfUnselectedBubbles).toEqual(coordinatesOfUnselectedBubbles2);

    await slider.playTimesliderSeconds(3);

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

    sidebar.optionsButton.safeClick();
    sidebar.optionsMenuSizeButton.safeClick();
    safeDragAndDrop(sidebar.optionsMenuBubblesResizeToddler, {x: 60, y: 0});

    const finalRadius = await bubbleChart.getBubblesRadius();

    await expect(initialRadius).not.toEqual(finalRadius);
    // await expect(finalRadius[0]).toBeGreaterThan(initialRadius); // TODO add check like this
  });

  it('change Size indicator', async() => {
    /**
     * should check that the indicator represented by the Size can be changed(TC16)
     */
    await sidebar.optionsButton.safeClick();
    await sidebar.optionsMenuSizeButton.safeClick();

    const initialBubblesCount = await bubbleChart.allBubbles.count();
    const initialIndicator = await sidebar.colorIndicatorDropdown.getText();

    await sidebar.colorIndicatorDropdown.safeClick();
    await sidebar.sizeListBabiesPerWomanColorIndicator.safeClick();
    await waitForSpinner();

    const finalBubblesCount = await bubbleChart.allBubbles.count();
    const finalIndicator = await sidebar.colorIndicatorDropdown.getText();

    await expect(initialIndicator).not.toEqual(finalIndicator);
    await expect(initialBubblesCount).not.toEqual(finalBubblesCount);

    await sidebar.optionsButton.safeClick();
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
    await sidebar.optionsButton.safeClick();

    const optionsDialogueTopInitialPosition = await sidebar.optionsModalDialogue.getCssValue('top');
    const optionsDialogueRightInitialPosition = await sidebar.optionsModalDialogue.getCssValue('right');

    await safeDragAndDrop(sidebar.optionsMenuHandIcon, {x: -260, y: -100});

    const optionsDialogueTopNewPosition = await sidebar.optionsModalDialogue.getCssValue('top');
    const optionsDialogueRightNewPosition = await sidebar.optionsModalDialogue.getCssValue('right');

    await expect(optionsDialogueTopInitialPosition).not.toEqual(optionsDialogueTopNewPosition);
    await expect(optionsDialogueRightInitialPosition).not.toEqual(optionsDialogueRightNewPosition);

    await safeDragAndDrop(sidebar.optionsMenuHandIcon, {x: -350, y: -200});

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
    await sidebar.searchAndSelectCountry('China');

    await slider.dragToStart();
    await slider.dragToMiddle();

    await sidebar.zoomButton.safeClick();
    await safeDragAndDrop(bubbleChart.selectedCountryLabel, {x: 250, y: 250});

    const axisYMaxValue = commonChartPage.axisYMaxValue.safeGetAttribute('TextContent');
    const axisXMaxValue = commonChartPage.axisXMaxValue.safeGetAttribute('TextContent');
    const trailsCount = bubbleChart.chinaTrails.count();

    await bubbleChart.refreshPage();

    const axisYNewMaxValue = commonChartPage.axisYMaxValue.safeGetAttribute('TextContent');
    const axisXNewMaxValue = commonChartPage.axisXMaxValue.safeGetAttribute('TextContent');
    const trailsCountNew = bubbleChart.chinaTrails.count();

    await expect(axisXMaxValue).toEqual(axisXNewMaxValue);
    await expect(axisYMaxValue).toEqual(axisYNewMaxValue);
    await expect(trailsCount).toEqual(trailsCountNew);
  });
});
