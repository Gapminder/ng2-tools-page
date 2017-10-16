import { $, browser, ElementFinder, ExpectedConditions as EC } from 'protractor';

import { CommonChartPage } from '../common-chart.po';
import { _$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';

export class Slider {
  public sliderSelectedYear: ExtendedElementFinder = _$('.vzb-ts-slider-value');
  public sliderButton: ElementFinder = $('.vzb-ts-slider-handle');
  public sliderReady: ElementFinder = $('.domain.rounded'); // TODO remove this because there is static property
  public sliderAxis: ElementFinder = $('.vzb-ts-slider');
  public speedStepper: ElementFinder = $('.vzb-tool-stepped-speed-slider');

  async waitForSliderToBeReady(): Promise<{}> {
    return await browser.wait(EC.visibilityOf(this.sliderReady), 30000);
  }

  async getPosition(): Promise<string> {
    await this.waitForSliderToBeReady();

    return this.sliderSelectedYear.getAttribute('textContent');
  }

  async dragToMiddle(): Promise<{}> {
    await this.waitForSliderToBeReady();
    await browser.actions().dragAndDrop(this.sliderButton, {x: -900, y: 0}).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async dragToStart(): Promise<{}> {
    await this.waitForSliderToBeReady();
    await browser.actions().dragAndDrop(this.sliderButton, CommonChartPage.buttonPlay).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async dragToRightEdge(): Promise<{}> {
    await this.waitForSliderToBeReady();
    await browser.actions().dragAndDrop(this.sliderButton, this.speedStepper).perform();

    return await browser.wait(EC.urlContains('#_state_time_value='), 10000);
  }

  async playTimesliderSeconds(seconds: number): Promise<void> {
    await this.waitForSliderToBeReady();
    await CommonChartPage.buttonPlay.safeClick();
    await browser.sleep(seconds * 1000);
    await CommonChartPage.buttonPause.safeClick();
  }

}