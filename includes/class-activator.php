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
   * Run all actions required to start using the plugin.
   *
   * @since 0.0.1
   */
  public function activate() {

    // Ensure user has the proper permissions.
    if ( ! current_user_can( 'activate_plugins' ) ) {
      return;
    }

    self::initialize_options();
    self::add_capability();
  }

  /**
   * Add the plugin's default options values to the options table in the database.
   *
   * @since 3.0.0
   */
  private static function initialize_options() {
    add_option( 'gpalab-blocks-dev-mode', 0 );
    add_option( 'gpalab-blocks-role', 'manage_options' );
    add_option( 'gpalab-blocks-styling', 0 );

    $default = array( 'share', 'yali', 'ylai', 'this' );
    add_option( 'gpalab-blocks-feed-sources', $default );
  }

  /**
   * Add a custom capability which permits a user to add blocks to posts.
   *
   * @since 3.0.0
   */
  private static function add_capability() {
    $custom_cap      = 'gpalab_blocks_add';
    $default_min_cap = 'manage_options';
    $grant           = true;

    $editable = get_editable_roles();

    foreach ( wp_roles()->role_objects as $key => $role ) {
      if ( isset( $editable[ $key ] ) && $role->has_cap( $default_min_cap ) ) {
        $role->add_cap( $custom_cap, $grant );
      }
    }

    unset( $role );
  }
}
