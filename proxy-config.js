'use strict';

const _ = require('lodash');

module.exports = {
  "/tools/assets/*": {
    target: "http://localhost:4200",
    secure: false,
    logLevel: "debug",
    pathRewrite: (path, req) => path.replace('/tools/assets/', '/assets/')
  }
};
