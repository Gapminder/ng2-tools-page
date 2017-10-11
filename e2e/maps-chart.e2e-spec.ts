import { browser } from 'protractor';

import { Helper } from './helpers/helper';
import { CommonChartPage } from './pages/common-chart.po';
import { Sidebar } from './pages/sidebar.po';
import { MapChart } from './pages/map-chart.po';

const mapChart: MapChart = new MapChart();
const commonChartPage: CommonChartPage = new CommonChartPage();
const sidebar: Sidebar = new Sidebar();

describe('Maps chart - Acceptance', () => {
  beforeEach(async() => {
    await browser.get('/');
    await mapChart.openChart();
  });

  it('bubbles change size with timeslider drag and play(TC25)', async() => {
    const initialSelectedYear = await commonChartPage.sliderSelectedYear.getAttribute('textContent');
    await mapChart.searchAndSelectCountry('China');
    const initialBubbleSize = await mapChart.selectedCountries.getAttribute('r');

    await mapChart.dragSliderToMiddle();

    const finalSelectedYear = await commonChartPage.sliderSelectedYear.getAttribute('textContent');
    const draggedBubbleSize = await mapChart.selectedCountries.getAttribute('r');

    await expect(initialSelectedYear).not.toEqual(finalSelectedYear);
    await expect(initialBubbleSize).not.toEqual(draggedBubbleSize);

    await commonChartPage.playTimesliderSeconds(3);

    const finalBubbleSize = await mapChart.selectedCountries.getAttribute('r');
    await expect(finalBubbleSize).not.toEqual(draggedBubbleSize);
  });

  it('bubble tooltip on hover contains country name', async() => {
    /**
     * should check bubbles react to hovering and a tooltip appears, and contains the country name.
     * In 2015 the biggest red bubbles: "China", "India"; the biggest green - "United states",
     * the biggest yellow is "Russia" and the biggest blue is "Nigeria"(TC27)
     */

    await mapChart.hoverMouseOverBubble('red');
    expect(await mapChart.bubbleLabelOnMouseHover.getText()).toContain('China');

    await mapChart.hoverMouseOverBubble('red', 1); // second biggest bubble
    expect(await mapChart.bubbleLabelOnMouseHover.getText()).toContain('India');

    await mapChart.hoverMouseOverBubble('yellow');
    expect(await mapChart.bubbleLabelOnMouseHover.getText()).toContain('Russia');

    await mapChart.hoverMouseOverBubble('blue');
    expect(await mapChart.bubbleLabelOnMouseHover.getText()).toContain('Nigeria');

    await mapChart.hoverMouseOverBubble('green');
    expect(await mapChart.bubbleLabelOnMouseHover.getText()).toContain('United States');
  });

  it('Bubbles selected by click', async() => {
    /**
     * should check that clicking the bubble of the United States should select it. The bubble gets full opacity,
     * while the other bubbles get lower opacity(TC28)
     */

    const nonSelectedBubblesCount = await mapChart.allBubbles.count();
    await mapChart.clickOnBubble('green');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('United States');
    expect(await mapChart.selectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');
    expect(await mapChart.allBubbles.get(0).getAttribute('style')).toContain('opacity: 0.3;');
    expect(await mapChart.allBubbles.count()).not.toEqual(nonSelectedBubblesCount);
    expect(await mapChart.getOpacityOfNonSelectedBubblesMapsChart()).not.toEqual('opacity: 1;');
  });

  it('Bubble label can be dragged and dropped(TC29)', async() => {
    await mapChart.clickOnBubble('green');
    const initialLabelPosition = await mapChart.selectedCountryLabel.getAttribute('transform');

    await Helper.safeDragAndDrop(mapChart.selectedCountryLabel, {x: 200, y: 300});

    const newLabelPosition = await mapChart.selectedCountryLabel.getAttribute('transform');
    await expect(initialLabelPosition).not.toEqual(newLabelPosition);

    await Helper.safeDragAndDrop(mapChart.selectedCountryLabel, {x: 250, y: 100});

    const finalLabelPosition = await mapChart.selectedCountryLabel.getAttribute('transform');
    await expect(newLabelPosition).not.toEqual(finalLabelPosition);
  });

  it('Deselect bubble by click on "X", or on the bubble(TC30)', async() => {
    await mapChart.clickOnBubble('green');
    await mapChart.clickXiconOnBubble('USA');

    expect(await browser.isElementPresent(mapChart.selectedCountryLabel)).toBeFalsy();

    await mapChart.clickOnBubble('green');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('United States');
    expect(await mapChart.selectedCountries.get(0).getAttribute('style')).toContain('opacity: 1;');

    await mapChart.deselectBubble('green');

    expect(await browser.isElementPresent(mapChart.selectedCountryLabel)).toBeFalsy();
  });

  it('Countries could be selected/deselected using the button "Find"(TC31)', async() => {
    await sidebar.searchAndSelectCountry('China');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.searchAndSelectCountry('India');
    expect(await mapChart.selectedCountries.count()).toEqual(2);

    await sidebar.searchAndSelectCountry('Brazil');
    expect(await mapChart.selectedCountries.count()).toEqual(3);

    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('China');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('India');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('Brazil');
    expect(browser.getCurrentUrl()).toContain('geo=ind');
    expect(browser.getCurrentUrl()).toContain('geo=chn');
    expect(browser.getCurrentUrl()).toContain('geo=bra');

    await sidebar.deselectCountryInSearch('India');
    expect(await mapChart.selectedCountries.count()).toEqual(2);

    await sidebar.deselectCountryInSearch('China');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.deselectCountryInSearch('Brazil');
    expect(await mapChart.selectedCountries.count()).toEqual(0);

    expect(browser.getCurrentUrl()).not.toContain('geo=ind');
    expect(browser.getCurrentUrl()).not.toContain('geo=chn');
    expect(browser.getCurrentUrl()).not.toContain('geo=bra');
  });

  it('Chart title show the exact values on hover(TC32)', async() => {
    const axisYInitialText = await mapChart.yAxisTitle.getText();
    await expect(axisYInitialText).toEqual('Size: Population, total');

    await mapChart.hoverMouseOverBubble('blue');
    await mapChart.hoverMouseOverBubble('green');
    await mapChart.hoverMouseOverBubble('blue');

    const axisYTextOnBlueBubbleMouseHover = await mapChart.yAxisTitle.getText();
    const colorDropDownTextOnBlueBubbleMouseHover = await sidebar.colorDropDown.getText();
    const sizeDropDownTextOnBlueBubbleMouseHover = await sidebar.sizeDropDown.getText();

    expect(axisYTextOnBlueBubbleMouseHover).toEqual('Size: 181M');
    expect(colorDropDownTextOnBlueBubbleMouseHover).toEqual('Africa');
    expect(sizeDropDownTextOnBlueBubbleMouseHover).toEqual('181M');

    await mapChart.hoverMouseOverBubble('yellow');

    const axisYTextOnYellowBubbleMouseHover = await mapChart.yAxisTitle.getText();
    const colorDropDownTextOnYellowBubbleMouseHover = await sidebar.colorDropDown.getText();
    const sizeDropDownTextOnYellowBubbleMouseHover = await sidebar.sizeDropDown.getText();

    expect(axisYTextOnYellowBubbleMouseHover).toEqual('Size: 144M');
    expect(colorDropDownTextOnYellowBubbleMouseHover).toEqual('Europe');
    expect(sizeDropDownTextOnYellowBubbleMouseHover).toEqual('144M');
  });
});
