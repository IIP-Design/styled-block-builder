# Change Log

##### All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/IIP-Design/styled-block-builder/compare/v2.0.2...HEAD)

_This sections lists changes committed since most recent release_

### Added:

- Migration tool to detect and convert/delete blocks stored under the legacy data architecture
- Link List block type to display a list of user specified links (currently disabled)

### Changed:

- [BREAKING] Restructure block data architecture by storing all blocks in parent's postmeta rather than as individual posts
- Replace deactivation hooks with uninstall hooks to avoid unexpected deletion of plugin data
- Only load React-axe once for the frontend bundle and allow for toggling it on or off
- Replace deprecated `react-axe` package with it's successor `@axe-core/react`
- Log block id in error message if post contains a shortcode with an invalid block id

### Fixed:

- Only enqueue frontend scripts and styles if shortcode present AND blocks found in postmeta

### Security:

- Update dependencies

## [v2.0.2](https://github.com/IIP-Design/styled-block-builder/compare/v2.0.1...v2.0.2) - 2020.09.24

### Added:

- Editor/Manager role to the permitted users list using the custom capability `state_options`

### Fixed:

- Use event id rather than year to trigger timeline animation to allow for multiple events in the same year
- Allow for the deletion of associated blocks, when the block does not exist in the database
- Show error message when trying to edit a non-existent block from the associated list

## [v2.0.1](https://github.com/IIP-Design/styled-block-builder/compare/v2.0.0...v2.0.1) - 2020.09.23

### Fixed:

- Add a default value of Administrator for user role required to add blocks to a page

## [v2.0.0](https://github.com/IIP-Design/styled-block-builder/compare/v1.0.0...v2.0.0) - 2020.09.21

### Added:

- Integration with the WordPress media library to as the source for image uploads
- Add Brightcove video embed support
- A Navigation block that can be populated with anchor tags to other blocks on the page
- The ability to set the unit in the Stats block
- A section in settings page to configure which sources are available in the article feed
- A section in settings page to configure which users can add styled blocks (based on user's WordPress role)
- An optional stylesheet to enforce state.gov heading and link styles
- Option to add a prefix to button text resulting in a two-line button
- Rich text editor to allow for formatted text in the Hero, Parallax, Quote Box, Resources, Slides, and Text blocks
- Alt text support for background images
- A reusable background component to set the block background color/image and gradient
- The ability to rename resource tab labels
- An add button option to the resources block
- Additional alignment options for Hero block headings and content
- Tooltip displaying color name in color picker component
- Reusable sanitizers for article, button, and video sub-forms
- Enable use of radio conditionals within nested groups
- Support for the checkbox conditional component within nested forms

### Changed:

- Unify styling across article feed, button, and video input forms
- Update color options to more closely align with state.gov styleguide
- Update the Resources block an accordion on mobile (rather than simply stacking the content)
- Vary link text color based on surrounding text rather than simply inheriting surrounding text color
- Make buttons more configurable with additional style options
- Enable background images for Text blocks
- Alter the Stats block animation, transitioning the stat line's opacity from 25% to 100% rather than counting up the stat number
- On the Stats block, use stat ids rather than indices to trigger animation, allowing multiple blocks on the same page
- Increase CDP Feed item limit from three to six
- Increase button limit in text block from one to two
- Add Jest for JavaScript unit testing
- Remove automated formatting with Prettier in favor of ESLint config rules
- Do not fill block root div with the block type (to prevent flash of text before the block loads)
- Show "Untitled [block type] block" rather than block id for untitled blocks in associated blocks list
- Group and streamline sanitizers
- Several SCSS mixins to make common CSS styles a bit more reusable

### Fixed:

- Stretch link elements in the CDP feed to cover full image height
- Update mobile styling to prevent odd margins and shifted content
- Video option in Resources block not saving values
- Stop Resources block tabs from reordering when adding nested content
- When adding a tab to a tabbed form, automatically open it
- Added focus states to all links and buttons for better accessibility
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
