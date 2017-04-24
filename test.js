var expect = require('expect');
var cssToStyle = require('./');

describe('css-to-style', function() {
  it('transforms a rule', function() {
    expect(cssToStyle('color: red'))
      .toEqual({ color: 'red' });
  });

  it('transforms multiple rules', function() {
    expect(cssToStyle('color: red; font-size: 2em; opacity: 1;'))
      .toEqual({ color: 'red', fontSize: '2em', opacity: '1' });
  });

  it('transforms rules with browser prefixes', function() {
    expect(cssToStyle('-webkit-transform: scale(2); -ms-transform: scale(2);'))
      .toEqual({ WebkitTransform: 'scale(2)', msTransform: 'scale(2)' });
  });

  it('ignores empty rules', function() {
    expect(cssToStyle('color: ; font-size: 2em; : 1; '))
      .toEqual({ fontSize: '2em' });
  });

  it('handles excessive whitespace', function() {
    expect(cssToStyle('color:\nred; \n\r\t\tfont-size:\r2em;\topacity:  1 ;'))
      .toEqual({ color: 'red', fontSize: '2em', opacity: '1' });
  });

  it('handles no whitespace', function() {
    expect(cssToStyle('color:red;font-size:2em;opacity:1'))
      .toEqual({ color: 'red', fontSize: '2em', opacity: '1' });
  });
});
