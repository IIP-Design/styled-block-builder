<?php
/**
 * Registers the Uninstall class.
 *
 * @package Style_Blocks/Uninstall
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Register all hooks to be run when the plugin is uninstalled.
 *
 * @package Style_Blocks/Uninstall
 * @since 3.0.0
 */
class Uninstall {

  /**
   * Delete the plugin's options from the options table in the database.
   */
  public function uninstall() {
    delete_option( 'gpalab-blocks-brightcove' );
    delete_option( 'gpalab-blocks-dev-mode' );
    delete_option( 'gpalab-blocks-feed-sources' );
    delete_option( 'gpalab-blocks-role' );
    delete_option( 'gpalab-blocks-styling' );
  }
}
