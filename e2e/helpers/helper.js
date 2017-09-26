const EC = protractor.ExpectedConditions;

class Helper {
  constructor() {
  }

  static safeOpen(url) {
    return browser.get(url).then(()=>{
      return Helper.whaitForPageLoaded();
    })
  }

  static whaitForPageLoaded(){
    let sideBar = $('.vzb-tool-dialogs');
    let buttonPlay = $('.vzb-ts-btn-play');
    let mainChart = $('.vzb-tool');

    return browser.wait(EC.visibilityOf(sideBar), 30000).then(()=>{
      return browser.wait(EC.visibilityOf(mainChart), 30000).then(()=>{
        return browser.wait(EC.visibilityOf(buttonPlay), 30000);
      });
    });
  }

  static safeClick(element) {
    return browser.wait(EC.visibilityOf(element), 15000).then(()=>{
      return browser.wait(EC.elementToBeClickable(element), 15000).then(() => {
        return element.click();
      });
    })
  }

  static safeSendKeys(element, text) {
    return browser.wait(EC.visibilityOf(element), 15000).then(() => {
      return element.clear().then(()=>{
        return element.sendKeys(text);
      });
    });
  }


}

module.exports = Helper;
