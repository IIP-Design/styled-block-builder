<?php

/**
* Plugin Name: Style Templates
* Plugin URI: https://github.com/IIP-Design/style-templates
* Description: Customizable animated blocks for WordPress sites
* Version: v0.0.1
* Author: Marek Rewers, U.S. Department of State, Global Public Affairs <designdevops@america.gov>
* Text Domain: gpalab-templates
* License: GNU General Public License v2.0
* License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
 	die;
}

// Define constants
define( 'STYLE_TEMPLATES_DIR', plugin_dir_path( dirname( __FILE__ ) ) . 'style-templates/' );
define( 'STYLE_TEMPLATES_URL', plugin_dir_url( dirname( __FILE__ ) ) . 'style-templates/' );

// Imports Style_Templates class
require plugin_dir_path( __FILE__ ) . 'includes/class-style-templates.php';

/* Begin execution of the plugin.
*
* Since everything within the plugin is registered via hooks,
* then kicking off the plugin from this point in the file does
* not affect the page life cycle.
*
*/

function run_style_templates() {
  $plugin = new Style_Templates();
  $plugin->run();
}
run_style_templates();