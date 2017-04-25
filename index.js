'use strict';

function camelCase(value) {
  return value.replace(/\-(\w|$)/g, function(m, p1) {
    return p1.toUpperCase();
  });
}

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
      var prop = value[0].toLowerCase();
      if (prop === 'float') prop = 'cssFloat';
      if (prop.substr(0, 4) === '-ms-') prop = prop.substr(1);
      styles[camelCase(prop)] = value[1];
      return styles;
    }, {});
};
