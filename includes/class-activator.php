<?php
/**
 * Registers the Activator class.
 *
 * @package Style_Blocks\Activator
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Register all hooks to be run when the plugin is activated.
 *
 * @package Style_Blocks/Activator
 * @since 0.0.1
 */
class Activator {

  /**
   * Add the plugin's options values to the options table in the database.
   */
  public function activate() {
    add_option( 'gpalab-blocks-dev-mode', 0 );
  }
}
