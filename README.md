# Style Block Builder

This plugin contains a `style-templates.php`, which registers plugin and begins its execution. Additionally, there is an admin class (`admin/class-style-templates-admin.php`) where all admin hooks are registered and the frontend class (`public/class-style-templates-public.php`) where all public hooks are registered. The includes directory contains the main plugin class (`include/class-style-templates.php`), which defines the core functionality of the plugin and the loader file (`include/class-style-templates-loader.php`), which feeds the admin and public hooks in from their respective classes into the main class file.

## Plugin Structure

```bash
├── my-plugin.php
        ├── admin
        │   └── class-my-plugin-admin.php
        ├── includes
        │   ├── class-my-plugin.php
        │   └── class-my-plugin-loader.php
        └── public
            └── class-my-plugin-public.php
```
