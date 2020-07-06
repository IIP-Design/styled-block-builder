<?php
/**
 * Registers the Deactivator class.
 *
 * @package Style_Blocks/Deactivator
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Register all hooks to be run when the plugin is deactivated.
 *
 * @package Style_Blocks/Deactivator
 * @since 0.0.1
 */
class Deactivator {

  /**
   * Delete the plugin's options from the options table in the database.
   */
  public function deactivate() {
    delete_option( 'gpalab-blocks-dev-mode' );
    delete_option( 'gpalab-blocks-feed-sources' );
    delete_option( 'gpalab-blocks-role' );
    delete_option( 'gpalab-blocks-styling' );
  }
}
