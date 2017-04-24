'use strict';

module.exports = function camelCase(value) {
  return value.replace(/\-\w/g, function(matches) {
    return matches[1].toUpperCase();
  });
};
