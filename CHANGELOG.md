# Change Log

##### All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/IIP-Design/styled-block-builder/compare/v1.0.0...HEAD)

_This sections lists changes committed since most recent release_

### Added:

- Integration with the WordPress media library to as the source for
- The ability to set the unit in the stats block
- A section in settings page to configure which sources are available in the article feed
- A section in settings page to configure which users can add styled blocks
- An optional stylesheet to enforce state.gov heading styles
- Rich text editor to allow for formatted text in the hero, parallax, quote box, and text blocks
- Alt text support for background images
- Alignment options for hero block headings
- Tooltip displaying color name in color picker component

### Changed:

- Update color options to more closely align with state.gov styleguide
- Make buttons more configurable with additional style options
- Add Jest for JavaScript unit testing
- Remove automated formatting with Prettier in favor of ESLint config rules

### Fixed:

- Correctly escape and render the settings page title
- Updated JavaScript dependencies

## [v1.0.0](https://github.com/IIP-Design/styled-block-builder/releases/tag/v1.0.0) - 2020.03.16 (Initial Release)

### Added:

- Article Feed, Hero, Parallax, Quote, Resources, Slides, Stats, Text, and Timeline blocks
- Custom metabox to input block data
- Custom shortcode to render the blocks
- Custom API endpoint which adds block data to their associated posts
- Validation and sanitization of user inputs
- Robust error handling and custom HTTP response messages to AJAX calls
- Plugin settings page which enables site admins to enable development mode
