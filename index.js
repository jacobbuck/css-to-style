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
      styles[camelCase(value[0].replace('-ms-', 'ms-'))] = value[1];
      return styles;
    }, {});
};
