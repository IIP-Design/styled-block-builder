<?php
/**
 * Registers the Deactivator class.
 *
 * @package Style_Templates/Deactivator
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Register all hooks to be run when the plugin is deactivated.
 *
 * @package Style_Templates/Deactivator
 * @since 0.0.1
 */
class Deactivator {

  /**
   * Delete the plugin's options from the options table in the database.
   */
  public function deactivate() {
    delete_option( 'gpalab-style-template-dev-mode' );
  }
}
