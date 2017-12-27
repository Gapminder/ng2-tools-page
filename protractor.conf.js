'use strict';

exports.config = {
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  exclude: ['./e2e/redirects-spec.js'],
  multiCapabilities: [
    {
      browserName: 'chrome',
      loggingPrefs: {
        'driver': 'INFO',
        'browser': 'INFO'
      },
      // shardTestFiles: true,
      // maxInstances: 5,
      // count: 1,
      // screenResolution: "1920x1080",
      chromeOptions: {
        args: ['no-sandbox', 'disable-infobars', 'headless']
      },
    },

  ],

  directConnect: true,

  baseUrl: 'http://localhost:4200/tools/',
  useAllAngular2AppRoots: true,
  allScriptsTimeout: 60000,
  getPageTimeout: 60000,
  // restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000,
    print: function () {
    }
  },

  onPrepare: () => {
    browser.waitForAngularEnabled(false);
    require('ts-node').register({ project: 'e2e' });
    browser.driver.manage().window().setSize(1920, 1080);
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};
