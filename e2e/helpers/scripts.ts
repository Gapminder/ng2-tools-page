let functions: any = {};

functions.getCoordinatesOfLowerOpacityBubblesOnBubblesChart = () => {
  return Array.prototype.slice.call(document.querySelectorAll('circle[class*="vzb-bc-entity"]'))
    .filter(elem => {
      return elem.getAttribute('style').indexOf('opacity: 0.3;') > -1;
    })
    .map(elm => {
      return {
        cx: elm.getAttribute('cx'),
        cy: elm.getAttribute('cy')
      };
    }).reduce((result, obj) => {
      result.push(obj.cx);
      result.push(obj.cy);

      return result;
    }, []).sort();
};

/* Publish all the functions as strings to pass to WebDriver's
 * exec[Async]Script.  In addition, also include a script that will
 * install all the functions on window (for debugging.)
 *
 * We also wrap any exceptions thrown by a clientSideScripts function
 * that is not an instance of the Error type into an Error type.  If we
 * don't do so, then the resulting stack trace is completely unhelpful
 * and the exception message is just "unknown error."  These types of
 * exceptions are the common case for dart2js code.  This wrapping gives
 * us the Dart stack trace and exception message.
 */

const util = require('util');
let scriptsList = [];
let scriptFmt = (
  'try { return (%s).apply(this, arguments); }\n' +
  'catch(e) { throw (e instanceof Error) ? e : new Error(e); }');
for (let fnName in functions) {
  if (functions.hasOwnProperty(fnName)) {
    exports[fnName] = util.format(scriptFmt, functions[fnName]);
    scriptsList.push(util.format('%s: %s', fnName, functions[fnName]));
  }
}

exports.installInBrowser = (util.format(
  'window.clientSideScripts = {%s};', scriptsList.join(', ')));
