# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

## [0.0.10] - 2022-12-23

### Changed

- Import as text with `?text` suffix instead of `.text.js`

## [0.0.9] - 2022-11-22

### Added

- References to 'Types for Adobe' types

### Fixed

- Cross platform npm scripts
- Error handling in `jsxbin.js`
- Script path in `launch.json`

## [0.0.8] - 2022-11-14

### Added

- Import `.png` and `.jpg` icons as binary string

## [0.0.7] - 2022-11-08

### Added

- Import JavaScript files as text

## [0.0.6] - 2022-08-18

### Added

- Minimum required Node version as `engines` in `package.json`
- Every `.js` file in `src/` is considered an entrypoint
- Multiple entrypoints result in multiple scripts
- A single entrypoint is renamed to `name` from `package.json`

### Changed

- Minification does not rewrite syntax to avoid Extendscript errors

## [0.0.5] - 2022-08-12

### Added

- Exposes `PRODUCT_DISPLAY_NAME` environment variable
- Copies static files from `/static`

### Changed

- Renamed entrypoint to `main.js` instead of `app.js`

### Fixed

- Improves debug configuration

## [0.0.1] - 2022-08-11

Initial "release"
