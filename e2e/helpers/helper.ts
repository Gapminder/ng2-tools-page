import { browser, ElementFinder, protractor } from 'protractor';
import { CommonChartPage } from '../pages/CommonChartPage-page';

const EC = protractor.ExpectedConditions;

export class Helper {

  static safeOpen(url: string) {
    return browser.get(url).then(() => {
      return Helper.waitForPageLoaded();
    });
  }

  static waitForPageLoaded() {
    return browser.wait(EC.visibilityOf(CommonChartPage.sideBar), 30000).then(() => {
      return browser.wait(EC.visibilityOf(CommonChartPage.buttonPlay), 30000).then(() => {
        return browser.wait(EC.visibilityOf(CommonChartPage.mainChart), 30000);
      });
    });
  }

  static waitForSpinner() {
    // return browser.wait(EC.visibilityOf(CommonChartPage.spinner), 3000, 'spinner to be visible').then(() => {
      return browser.wait(EC.stalenessOf(CommonChartPage.spinner), 15000, 'stalenessOf of spinner');
    // });
  }

  static safeClick(element: ElementFinder) {
    return browser.wait(EC.visibilityOf(element), 15000, `element ${element.locator().value} not visible`).then(() => {
      return browser.wait(EC.elementToBeClickable(element), 15000, `element ${element.locator().value} not clickable`).then(() => {
        return element.click();
      });
    });
  }

  static safeDragAndDrop(from: ElementFinder, to: any) {
    return browser.wait(EC.visibilityOf(from), 15000, `element ${from.locator().value} not visible`).then(() => {
      return browser.actions().dragAndDrop(from, to).perform();
    });
  }

  static safeSendKeys(element: ElementFinder, text: string) {
    return browser.wait(EC.visibilityOf(element), 15000).then(() => {
      return element.clear().then(() => {
        return element.sendKeys(text);
      });
    });
  }

  static safeExpectIsDispayed(element: ElementFinder, interval?: number) {
    const timeout = interval || 10000;

    return browser.wait(EC.visibilityOf(element), timeout, `element ${element.locator().value} is not visible in ${timeout} ms`);
  }

}
