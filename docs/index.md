---
title: Styled Block Builder Documentation
---

This plugin contains a `styled-block-builder.php`, which registers plugin and begins its execution. Additionally, there is an admin class (`admin/class-admin.php`) where all admin hooks are registered and the frontend class (`public/class-frontend.php`) where all public hooks are registered. The includes directory contains the main plugin class (`include/class-style-blocks.php`), which defines the core functionality of the plugin and the loader file (`include/class-loader.php`), which feeds the admin and public hooks in from their respective classes into the main class file.

## Plugin Structure

```bash
├── admin
│   ├── api
│   │   └── class-api.php
|   |
│   ├── class-admin.php
│   |
│   ├── metabox
│   │   ├── ajax
│   │   │   ├── class-responses.php
│   │   │   ├── class-sanitizer.php
│   │   │   ├── class-update-block.php
│   │   │   ├── class-update-parent-post.php
│   │   │   ├── class-uploader.php
│   │   │   ├── class-validator.php
│   │   │   └── sanitizers
|   |   |
│   │   ├── class-metabox.php
│   │   └── ui
│   │       ├── components
│   │       ├── context
│   │       ├── index.js
│   │       └── utils
│   ├── settings
│   │   └── class-settings.php
│   └── shortcode
│       └── class-shortcode.php
├── assets
├── config
├── dist
├── docs
|
├── includes
│   ├── class-activator.php
│   ├── class-deactivator.php
│   ├── class-loader.php
│   ├── class-style-blocks.php
│   └── index.php
|
├── public
│   ├── blocks
│   │   ├── _shared
│   │   ├── article-feed
│   │   ├── blocks.js
│   │   ├── hero
│   │   ├── parallax
│   │   ├── quote-box
│   │   ├── resources
│   │   ├── slides
│   │   ├── stats
│   │   ├── text
│   │   └── timeline
|   |
│   └── class-frontend.php
|
├── styled-block-builder.php
|
└── styles
```

## Blocks

This plugin provides content editors with the ability to create dynamic content blocks within posts.

Blocks are created within the post admin panel and are inserted onto the page using a shortcode.

For a general overview of the blocks used within this plugin, [navigate here](/Style-Templates/blocks/general).
