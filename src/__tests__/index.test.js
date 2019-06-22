import cssToStyle from '..';

test('transforms a rule', () => {
  expect(cssToStyle('color: red')).toEqual({ color: 'red' });
});

test('transforms multiple rules', () => {
  expect(cssToStyle('color: red; font-size: 2em; opacity: 1;')).toEqual({
    color: 'red',
    fontSize: '2em',
    opacity: '1',
  });
});

test('transforms no rules', () => {
  expect(cssToStyle('')).toEqual({});
  expect(cssToStyle('   ')).toEqual({});
  expect(cssToStyle(' : ;; :;: ;')).toEqual({});
});

test('transforms rules with browser prefixes', () => {
  expect(
    cssToStyle('-webkit-transform: scale(2); -ms-transform: scale(2);')
  ).toEqual({ WebkitTransform: 'scale(2)', msTransform: 'scale(2)' });
});

test('transforms float rule property to cssFloat', () => {
  expect(cssToStyle('float: left')).toEqual({ cssFloat: 'left' });
});

test('transforms rules with urls', () => {
  expect(
    cssToStyle('background: red url("awesome/image.png") no-repeat; color: red')
  ).toEqual({
    background: 'red url("awesome/image.png") no-repeat',
    color: 'red',
  });
});

test('transforms rules with dataurls', () => {
  expect(
    cssToStyle('cursor: url(data:image/gif;base64,data); color: red')
  ).toEqual({ cursor: 'url(data:image/gif;base64,data)', color: 'red' });
});

test("transforms rules with quoted ';' in value", () => {
  expect(
    cssToStyle("list-style-type: ';'; list-style-position: outside;")
  ).toEqual({ listStyleType: "';'", listStylePosition: 'outside' });
  expect(
    cssToStyle('list-style-type: ":"; list-style-position: outside;')
  ).toEqual({ listStyleType: '":"', listStylePosition: 'outside' });
});

test("transforms rules with quoted ':' in value", () => {
  expect(
    cssToStyle('list-style-type: ";"; list-style-position: inside;')
  ).toEqual({ listStyleType: '";"', listStylePosition: 'inside' });
  expect(
    cssToStyle('list-style-type: ":"; list-style-position: inside;')
  ).toEqual({ listStyleType: '":"', listStylePosition: 'inside' });
});

test('transforms rule properties of any case to camelCase', () => {
  expect(cssToStyle('FONT-SIZE: 2em; font-WEIGHT: bold; oPaCiTy: 1;')).toEqual({
    fontSize: '2em',
    fontWeight: 'bold',
    opacity: '1',
  });
});

test('transforms custom properties', () => {
  expect(cssToStyle('--foo: red; --bar: 2em; opacity: 1')).toEqual({
    '--foo': 'red',
    '--bar': '2em',
    opacity: '1',
  });
});

test('ignores empty rules', () => {
  expect(cssToStyle('color: ; font-size: 2em; : 1; ;; ')).toEqual({
    fontSize: '2em',
  });
});

test('handles excessive whitespace', () => {
  expect(
    cssToStyle('color:\nred; \n\r\t\tfont-size:\r2em;\topacity:  1 ;')
  ).toEqual({ color: 'red', fontSize: '2em', opacity: '1' });
});

test('handles no whitespace', () => {
  expect(cssToStyle('color:red;font-size:2em;opacity:1')).toEqual({
    color: 'red',
    fontSize: '2em',
    opacity: '1',
  });
});
