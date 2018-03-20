'use strict';
const url = process.env.URL || 'http://localhost:4200/tools/';
const device = process.env.DEVICE || 'desktop'; // 'desktop' or 'tablet' or 'mobile'
const fs = require('fs');

const testResultsDir = 'results';
const testResultsFile = `./${testResultsDir}/testResults.txt`;

let screenSize = {
  desktop: true,
  tablet: false,
  mobile: false,
  width: 1920,
  height: 1080
};

if (device === 'desktop') {
  screenSize.desktop = true;
  screenSize.width = 1920;
  screenSize.height = 1080;
}

if (device === 'mobile') {
  screenSize.desktop = false;
  screenSize.mobile = true;
  screenSize.width = 375;
  screenSize.height = 667;
}

if (device === 'tablet') {
  screenSize.desktop = false;
  screenSize.tablet = true;
  screenSize.width = 768;
  screenSize.height = 1024;
}

const capabilityForSaucelabs = {
  browserName: 'chrome',
  platform: 'Windows 10',
  version: '63.0',
  chromedriverVersion: '2.33',
  screenResolution: '1920x1080',
  shardTestFiles: true,
  maxInstances: 4,
  chromeOptions: {
    args: ['no-sandbox']
  }
};
const capabilityForLocalRun = {
  browserName: 'chrome',
  screenResolution: '1920x1080',
  shardTestFiles: true,
  maxInstances: 2,
  chromeOptions: {
    args: ['no-sandbox', 'headless']
  }
};

const SAUCEUSER = process.env.SAUCEUSER;
const SAUCEKEY = process.env.SAUCEKEY;

exports.config = {
  sauceUser: SAUCEUSER,
  sauceKey: SAUCEKEY,
  specs: ['./e2e/**/*.e2e-spec.ts'],
  exclude: ['./e2e/redirects-spec.js'],
  capabilities: SAUCEUSER && SAUCEKEY ? capabilityForSaucelabs : capabilityForLocalRun,
  // crossbrowser testing:
  // selenium server should be started for safari, microsoftEdge and firefox. directConnect works correctly only with Chrome.
  //
  // {
  //   browserName: 'firefox',
  //   "moz:firefoxOptions": {
  //     "args": ["-headless"],
  //   }
  // },
  // {
  //   browserName: 'MicrosoftEdge'
  // },
  // {
  //   browserName: 'safari'
  // },
  // mouseMove action is not implemented in safari

  directConnect: !(SAUCEUSER&&SAUCEKEY), // use directConnect only for local run

  params: {
    desktop: screenSize.desktop,
    tablet: screenSize.tablet,
    mobile: screenSize.mobile,
    screenWidth: screenSize.width,
    screenHeight: screenSize.height
  },
  baseUrl: url,
  allScriptsTimeout: 60000,
  getPageTimeout: 60000,
  // temporary disabled, because it causes NoSuchSessionError
  // typescript compiles 'async await' into generators, so it won't affect protractor controlFlow
  // SELENIUM_PROMISE_MANAGER: false,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },

  // this will be run after all the tests will be finished 
  afterLaunch: function() {
    const fileParse = fs.readFileSync(testResultsFile, 'utf-8');
    const testResults = JSON.parse(fileParse);

    // print consolidated report to the console
    for (const testResult of testResults) {
      console.log(`\n${testResults.indexOf(testResult) + 1}) ${testResult.fullName}`);
      testResult.failedExpectations.forEach(exp => {
        console.log('  - [31m' + exp.message + '[39m');
      });
    }
  },

  // will be run before any test starts
  beforeLaunch: function() {
    // create directory for testResults if not exist
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir);
    }

    // clear older tests results
    const files = fs.readdirSync(testResultsDir);
    for (const file of files) {
      fs.unlinkSync(`${testResultsDir}/${file}`);
    }
    // fill the file with default values
    fs.writeFileSync(testResultsFile, JSON.stringify([]), 'utf-8');
  },

  onPrepare: async () => {
    browser.waitForAngularEnabled(false);
    require('ts-node').register({ project: 'e2e' });

    browser.driver
      .manage()
      .window()
      .setSize(1920, 1080);

    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: 'specs'
        }
      })
    );

    jasmine.getEnv().addReporter({
      specDone: function(result) {
        if (result.status === 'failed') {
          // take screenshot on fail
          browser.takeScreenshot().then(function(screenShot) {

            const existingResults = fs.readFileSync(testResultsFile, 'utf-8');
            const appendedRes = JSON.parse(existingResults);
            appendedRes.push(result);

            // write consolidated result to file
            fs.writeFileSync(testResultsFile, JSON.stringify(appendedRes), 'utf-8');

            // Save screenshot
            fs.writeFile(`${testResultsDir}/${result.fullName}`, screenShot, 'base64', function(err) {
              if (err) throw err;
              console.log('File saved.');
            });
          });
        }
      }
    });
  }
};
