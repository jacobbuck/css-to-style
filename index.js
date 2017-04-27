'use strict';

function camelCase(value) {
  return value.replace(/\-(\w|$)/g, function(m, p1) {
    return p1.toUpperCase();
  });
}

module.exports = function cssToStyle(cssText) {
  return cssText.split(/;(?=[^\)]*(?:\(|$))/).reduce(function(styles, rule) {
    var i = rule.indexOf(':');
    var prop = rule.substr(0, i).trim().toLowerCase();
    var value = rule.substr(i + 1).trim();
    if (prop && value) {
      if (prop === 'float') {
        prop = 'cssFloat';
      } else if (prop.substr(0, 4) === '-ms-') {
        prop = prop.substr(1);
      }
      styles[camelCase(prop)] = value;
    }
    return styles;
  }, {});
};
