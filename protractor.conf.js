'use strict';

exports.config = {
  specs: [
    './e2e/**/*-spec.js'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome',
      loggingPrefs: {
        'driver': 'INFO',
        'browser': 'INFO'},
      shardTestFiles: true,
      maxInstances: 5,
      count: 1,
      chromeOptions: {
        args: ['no-sandbox', 'disable-infobars']
      },
    },

  ],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  useAllAngular2AppRoots: true,
  allScriptsTimeout: 180000,
  getPageTimeout: 180000,
  restartBrowserBetweenTests: true,
  untrackOutstandingTimeouts: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },

  onPrepare: () => {
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: false
      }
    }));
  }
};
