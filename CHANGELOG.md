# Changelog

## v1.4.0 - 2020-11-08

### Added

- Added source maps to build output.

### Changed

- Updated devDependencies.

## v1.3.3 - 2020-06-27

### Added

- Set `"sideEffects": false` in [package.json](./package.json).

## v1.3.2 - 2020-06-27

### Changed

- Enabled loose mode on '@babel/preset-env' to reduce build output.
- Refactored internals into multiple smaller functions.
- Updated devDependencies.

## v1.3.1 - 2020-06-09

### Added

- Added ES Module build.

### Changed

- Updated devDependencies.

## v1.3.0 - 2019-06-22

### Changed

- Builds are now done with [Rollup](http://rollupjs.org).
- Refactored internals.
- Updated devDependencies.

### Fixed

- Custom properties (CSS variables) are no longer lowercased.

## v1.2.1 - 2018-10-19

### Changed

- Updated devDependencies.

## v1.2.0 - 2017-09-07

### Added

- Added support for custom properties (CSS variables.)

## v1.1.0 - 2017-09-07

### Added

- Added support for handling semi-colons inside quotes.

### Changed

- Refactored internals into ES2015 syntax.
- Refactored parser to not use regular expressions.

## v1.0.3 - 2017-04-28

### Added

- Added support for handling [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) inside values.
- Handles uppercased property names by lowercasing them.

## v1.0.1 - 2017-04-25

### Changed

- Transform `float` property name to `cssFloat`.

## v1.0.0 - 2017-04-25

Initial public version! :tada:
