<?php
/**
 * Plugin Name: Styled Block Builder
 * Plugin URI: https://github.com/IIP-Design/styled-block-builder
 * Description: Customizable animated blocks for WordPress sites
 * Version: v2.0.2
 * Author: Marek Rewers, U.S. Department of State, Global Public Affairs <designdevops@america.gov>
 * Text Domain: gpalab-blocks
 * License: GNU General Public License v2.0
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 * @package Style_Blocks
 * @author Marek Rewers, U.S. Department of State, Global Public Affairs
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
 	die;
}

// Define constants.
define( 'STYLE_BLOCKS_DIR', plugin_dir_path( dirname( __FILE__ ) ) . 'styled-block-builder/' );
define( 'STYLE_BLOCKS_DIST', plugin_dir_url( dirname( __FILE__ ) ) . 'styled-block-builder/dist/' );
define( 'STYLE_BLOCKS_URL', plugin_dir_url( dirname( __FILE__ ) ) . 'styled-block-builder/' );

/**
 * Run functions needed at startup when plugin is installed.
 */
function gpalab_style_blocks_activate() {
  require_once plugin_dir_path( __FILE__ ) . 'includes/class-activator.php';
  Style_Blocks\Activator::activate();
}
register_activation_hook( __FILE__, 'gpalab_style_blocks_activate' );

/**
 * Clean up site when the plugin is deactivated.
 */
function gpalab_style_blocks_deactivate() {
  require_once plugin_dir_path( __FILE__ ) . 'includes/class-deactivator.php';
  Style_Blocks\Deactivator::deactivate();
}
register_deactivation_hook( __FILE__, 'gpalab_style_blocks_deactivate' );

// Imports Style_Blocks class.
require plugin_dir_path( __FILE__ ) . 'includes/class-style-blocks.php';

/**
 * Begin execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 */
function run_style_blocks() {
  $plugin = new Style_Blocks();
  $plugin->run();
}

run_style_blocks();
