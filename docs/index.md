---
title: Styled Block Builder Technical Documentation
---

This plugin contains a `styled-block-builder.php` file, which registers the plugin and begins its execution. There is an admin directory (`admin`) where all functions relating to the admin portion of the plugin are registered and a public directory (`public`) where all functions relating to the plugin's frontend are registered. The `includes` directory contains the main plugin class (`include/class-style-blocks.php`) - which defines the core functionality of the plugin, the loader class (`include/class-loader.php`) - which feeds the admin and public hooks in from their respective classes into the main class file, and activator/deactivator hooks - which define the plugin's behavior upon installation/deactivation.

### Development

To install the plugin locally for development, clone this repository into the plugins directory of your WordPress site using the command `git clone git@github.com:IIP-Design/styled-block-builder.git`. Then in the WordPress admin panel go to the installed plugins and activate the Styled Block Builder plugin.

To prevent the need for repeated re-compilation of the JavaScript and CSS, we have added a dev mode to the plugin. This mode loads development version of the scripts and styles, which can be regenerated on the fly as changes are saved. To activate dev mode, go to the `Styled Blocks` page under the `Settings` tab in your WordPress admin panel (note that you must have admin privileges on your WordPress instance to see this option). Therein, toggle Dev Mode to `enabled`. With this done, you can enter into the plugin directory in your terminal (`cd styled-block-builder`) and run `npm run dev` to start a development server. This will watch for any changes to JavaScript and CSS files and recompile on save.

Please note that ESLint and PHP Codesniffer will run on every commit to ensure that the plugin's code is conforming to the correct standards. If any code fails this linting, you will not be able to complete your commit. As such it is highly recommended that you integrate ESLint and PHP Codesniffer into your preferred text editor or frequently run the linting script `npm run lint`.

To compile the JavaScript and CSS for production run the command `npm run build`, which will update the production files in the `dist` directory.

### Plugin Structure

Below is a listing of key plugin files and directories:

```bash
root
├── styled-block-builder.php # Entry point for the plugin.
│
├── admin # All files pertaining to the administrative portion of the plugin.
│   │
│   ├── class-admin.php # Registers and localizes admin scripts and styles.
│   ├── metabox # All files pertaining to the plugin's custom metabox.
│   │   ├── class-metabox.php # Registers and adds the custom metabox to the page/post admin interface.
│   │   ├── ajax # Handles all AJAX operations including validation and sanitization of inputs.
│   │   └── ui # Small React application that renders out the blocks input forms.
│   ├── api # Adds block data to the API endpoint of the associated post.
│   ├── settings # Adds a Styled Blocks page to the Settings tab in the administrative panel.
│   └── shortcode # Registers and defines the [gpalab-block] shortcode.
│
├── includes # Registering and implements all classes.
│   │
│   ├── class-activator.php # Hooks run when the plugin is activated.
│   ├── class-uninstall.php # Hooks run when the plugin is deleted.
│   ├── class-loader.php # Loader file, which runs all needed action and filter hooks.
│   └── class-style-blocks.php # Registers the Style_Blocks class and imports/instantiates all the plugin's classes.
│
├── public # All files pertaining to the frontend portion of the plugin.
│   │
│   ├── class-frontend.php # Registers and localizes frontend scripts and styles.
│   ├── blocks # Entry point for the frontend JS, uses the component-library to render out blocks on a page.
│   └── component-library # React component library containing a directory for every block type.
│       ├── lib # Transpiled code for distribution as a package
│       └── src # Block components.
│
├── assets # Static assets used throughout the plugin.
├── config # Plugin configuration files.
├── dist # Compiled JavaScript and CSS bundles.
├── docs # Plugin documentation.
└── styles # Global CSS files.
```

## Blocks

This plugin provides content editors with the ability to create dynamic content blocks within posts.

Blocks are created within the post admin panel and are inserted onto the page using a shortcode.

For a general overview of the blocks used within this plugin, [navigate here](/styled-block-builder/blocks/general).
