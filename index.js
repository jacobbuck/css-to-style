'use strict';

var camelCase = require('./camel-case');

module.exports = function cssToStyle(cssText) {
  return cssText
    .split(';')
    .map(function(value) {
      return value
        .split(':')
        .map(function(value) {
          return value.trim();
        });
    })
    .filter(function(value) {
      return value && value[0] && value[1];
    })
    .reduce(function(styles, value) {
      var prop = value[0];
      if (prop === 'float') prop = 'cssFloat';
      if (prop.substr(0, 4) === '-ms-') prop = prop.substr(1);
      styles[camelCase(prop)] = value[1];
      return styles;
    }, {});
};
