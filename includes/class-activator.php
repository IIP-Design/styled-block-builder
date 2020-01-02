<?php
/**
 * Registers the Activator class.
 *
 * @package Style_Templates\Activator
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Register all hooks to be run when the plugin is activated.
 *
 * @package Style_Templates/Activator
 * @since 0.0.1
 */
class Activator {

  /**
   * Add the plugin's options values to the options table in the database.
   */
  public function activate() {
    add_option( 'gpalab-style-template-dev-mode', 0 );
  }
}
