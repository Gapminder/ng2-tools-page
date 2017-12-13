import { Sidebar } from "./pages/components/sidebar.e2e-component";
import { BubbleChart } from "./pages/bubble-chart.po";
import { browser } from "protractor";
import { safeDragAndDrop, waitForSpinner } from "./helpers/helper";
import { CommonChartPage } from "./pages/common-chart.po";
import { Slider } from "./pages/components/slider.e2e-component";
import { MapChart } from './pages/map-chart.po';


const commonChartPage: CommonChartPage = new CommonChartPage();
const bubbleChart: BubbleChart = new BubbleChart();
const slider: Slider = new Slider();

describe('Bubbles chart: Sidebar', () => {
  const sidebar: Sidebar = new Sidebar(bubbleChart);

  beforeEach(async () => {
    await bubbleChart.openChart();
  });

  it('Select country using search', async () => {
    const country = 'China';
    await sidebar.searchAndSelectCountry(country);

    expect(await bubbleChart.selectedCountries.count()).toEqual(1);
    expect(await browser.getCurrentUrl()).toContain(CommonChartPage.countries[country]);
  });

  it('deselect country using search field', async () => {
    // should check that countries could be selected/deselected using the button "Find" to the right(TC11)
    await sidebar.searchAndSelectCountry('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await sidebar.searchAndSelectCountry('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(2);

    expect(await bubbleChart.selectedCountries.getText()).toMatch('China 2015');
    expect(await bubbleChart.selectedCountries.getText()).toMatch('India 2015');
    expect(await browser.getCurrentUrl()).toContain('geo=ind');
    expect(await browser.getCurrentUrl()).toContain('geo=chn');

    await sidebar.deselectCountryInSearch('India');
    expect(await bubbleChart.selectedCountries.count()).toEqual(1);

    await sidebar.deselectCountryInSearch('China');
    expect(await bubbleChart.selectedCountries.count()).toEqual(0);

    expect(await browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(await browser.getCurrentUrl()).not.toContain('geo=chn');
  });

  it('x, y, trails and zoom remains after page refresh', async () => {
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


  it('Lock button', async () => {
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

    await slider.playTimesliderSeconds(4);

    const coordinatesOfUnselectedBubbles3 = await bubbleChart.getCoordinatesOfLowerOpacityBubblesOnBubblesChart();

    await expect(coordinatesOfUnselectedBubbles2).toEqual(coordinatesOfUnselectedBubbles3);

    const xCoordNew = await bubbleChart.getCountryBubble('China').getAttribute('cx');
    const yCoordNew = await bubbleChart.getCountryBubble('China').getAttribute('cy');
    await expect(xCoord).not.toEqual(xCoordNew);
    await expect(yCoord).not.toEqual(yCoordNew);
  });

  it('Size section', async () => {
    /**
     * should check that click on Size, a pop up with size sliders comes up,
     * the minimum and maximum sizes of bubbles can be changed. They update instantaneously(TC16)
     */
    const initialRadius = await bubbleChart.getBubblesRadius();

    await sidebar.optionsButton.safeClick();
    await sidebar.optionsMenuSizeButton.safeClick();
    await safeDragAndDrop(sidebar.optionsMenuBubblesResizeToddler, {x: 60, y: 0});

    const finalRadius = await bubbleChart.getBubblesRadius();

    await expect(initialRadius).not.toEqual(finalRadius);
    await expect(browser.getCurrentUrl()).toContain(`size_extent@`);
    // await expect(finalRadius[0]).toBeGreaterThan(initialRadius); // TODO add check like this
  });

  it('change Size indicator', async () => {
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

  it('clicking color bring the panel. Color of bubbles can be changed(TC17)', async () => {
    const usaBubbleInitialColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleInitialColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleInitialColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    const colorNewOption = sidebar.colorListItems.get(3);
    await sidebar.selectInColorDropdown(colorNewOption);

    await expect(sidebar.colorDropDown.getText()).toContain(colorNewOption.getText());

    const usaBubbleNewColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleNewColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleNewColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    expect(usaBubbleInitialColor).not.toEqual(usaBubbleNewColor);
    expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleNewColor);
    expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleNewColor);

    const colorFinalOption = sidebar.colorListItems.get(2);
    await sidebar.selectInColorDropdown(colorFinalOption);

    await expect(sidebar.colorDropDown.getText()).toContain(colorFinalOption.getText());

    const usaBubbleFinalColor = await bubbleChart.getCountryBubble('USA').getCssValue('fill');
    const indiaBubbleFinalColor = await bubbleChart.getCountryBubble('India').getCssValue('fill');
    const chinaBubbleFinalColor = await bubbleChart.getCountryBubble('China').getCssValue('fill');

    await expect(usaBubbleInitialColor).not.toEqual(usaBubbleFinalColor);
    await expect(indiaBubbleInitialColor).not.toEqual(indiaBubbleFinalColor);
    await expect(chinaBubbleInitialColor).not.toEqual(chinaBubbleFinalColor);
  });

  it(`drag'n'drop panel using the hand icon`, async () => {
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

  it('Change opacity for non-selected bubbles', async () => {
    await sidebar.searchAndSelectCountry('China');
    const nonSelectedBubbles = await bubbleChart.countBubblesByOpacity(CommonChartPage.opacity.dimmed);

    await sidebar.changeOpacityForNonSelected();
    const newOpacity = await bubbleChart.allBubbles.last().getCssValue('opacity');

    expect(await bubbleChart.countBubblesByOpacity(Number(newOpacity))).toEqual(nonSelectedBubbles);
    expect(await browser.getCurrentUrl()).toContain(`opacitySelectDim:${newOpacity}`);
  });

  it('Change regular opacity', async () => {
    const highlightedBubbles = await bubbleChart.countBubblesByOpacity(CommonChartPage.opacity.highlighted);

    await sidebar.changeRegularOpacity();
    const newOpacity = await bubbleChart.allBubbles.last().getCssValue('opacity');

    expect(await bubbleChart.countBubblesByOpacity(Number(newOpacity))).toEqual(highlightedBubbles);
    expect(await browser.getCurrentUrl()).toContain(`opacityRegular:${newOpacity}`);
  });

  it('Click on minimap region - "Remove everything else"', async () => {
    await sidebar.removeEverythingElseInMinimap('Asia');
    
    await expect(bubbleChart.allBubbles.count()).toEqual(bubbleChart.countBubblesByColor('red'));
  });

  it('Click on minimap region - "Select all in this group"', async () => {
    await sidebar.selectAllInThisGroup('Asia');
    const selectedBubbles = await bubbleChart.countBubblesByColor('red');
    const selectedLabels = await bubbleChart.allLabels.count();
    
    expect(selectedLabels).toEqual(selectedBubbles);
  });
});
