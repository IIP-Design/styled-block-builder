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
   * Run cleanup to delete plugin data upon uninstall.
   *
   * @since 3.0.0
   */
  public function uninstall() {
    // Ensure user has the proper permissions.
    if ( ! current_user_can( 'delete_plugins' ) ) {
      return;
    }

    self::remove_options();
    self::remove_capability();
  }

  /**
   * Delete the plugin's options from the options table in the database.
   *
   * @since 3.0.0 - previously in deactivation hook
   */
  private static function remove_options() {
    delete_option( 'gpalab-blocks-brightcove' );
    delete_option( 'gpalab-blocks-dev-mode' );
    delete_option( 'gpalab-blocks-feed-sources' );
    delete_option( 'gpalab-blocks-role' );
    delete_option( 'gpalab-blocks-styling' );
  }

  /**
   * Remove the custom capability which permits a user to add blocks to posts.
   *
   * @since 3.0.0
   */
  private static function remove_capability() {
    $custom_cap = 'gpalab_blocks_add';

    $editable = get_editable_roles();

    foreach ( wp_roles()->role_objects as $key => $role ) {
      if ( isset( $editable[ $key ] ) && $role->has_cap( $custom_cap ) ) {
        $role->remove_cap( $custom_cap );
      }
    }

    unset( $role );
  }
}
