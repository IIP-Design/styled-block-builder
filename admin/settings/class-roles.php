<?php
/**
 * Registers the Roles class.
 *
 * @package Style_Blocks\Roles
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Natively handles changes to the plugin's permissions settings.
 *
 * The Roles class configures the plugin's native capability manager.
 *
 * @package Style_Blocks\Roles
 * @since 3.0.0
 */
class Roles {

  /**
   * Add a custom capability which permits a user to add blocks to posts.
   *
   * @param string $old_value   Previous value for the given option.
   * @param string $value       New value for the given option.
   *
   * @since 3.0.0
   */
  public function update_role_caps( $old_value, $value ) {
    $custom_cap = 'gpalab_blocks_add';
    $grant      = true;

    $editable = get_editable_roles();

    foreach ( wp_roles()->role_objects as $key => $role ) {
      // Add custom capability to all roles the meet minimum requirements.
      if ( isset( $editable[ $key ] ) && $role->has_cap( $value ) ) {
        $role->add_cap( $custom_cap, $grant );
      }

      // Remove custom capability from all roles that do not meet requirements.
      if ( isset( $editable[ $key ] ) && ! $role->has_cap( $value ) ) {
        $role->remove_cap( $custom_cap );
      }
    }

    unset( $role );
  }
}
