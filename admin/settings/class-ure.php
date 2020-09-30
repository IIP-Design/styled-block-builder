<?php
/**
 * Registers the URE class.
 *
 * @package Style_Blocks\URE
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Integrates this plugin with the User Role Editor (URE) plugin.
 *
 * The URE class configures the plugin's capability manager so that it is compatible with URE.
 *
 * @package Style_Blocks\URE
 * @since 3.0.0
 */
class URE {
  /**
   * Check whether or not the User Role Editor plugin is present and activated.
   *
   * @return bool  Whether or not URE is activated.
   *
   * @since 3.0.0
   */
  public function is_ure_active() {
    $is_active = is_plugin_active( 'user-role-editor/user-role-editor.php' );

    return $is_active;
  }

  /**
   * Add custom capabilities group the the URE role manager.
   *
   * @param array $groups   List of capability groupings listed in the URE role manager.
   * @return array          List of groups with custom group added.
   *
   * @since 3.0.0
   */
  public function add_custom_group( $groups ) {

    $groups['gpalab-blocks'] = array(
      'caption' => esc_html__( 'Styled Block Builder', 'gpalab' ),
      'parent'  => 'custom',
      'level'   => 2,
    );

    return $groups;
  }

  /**
   * Place the plugin's custom capability into the Styled Block Builder group in URE.
   *
   * @param array  $groups   List of capability groupings listed in the URE role manager.
   * @param string $cap_id   Name of capability to check against group capabilities.
   * @return array           List of groups with custom group added.
   *
   * @since 3.0.0
   */
  public function get_plugin_caps( $groups, $cap_id ) {
    $plugin_caps = array( 'gpalab_blocks_add' );

    if ( in_array( $cap_id, $plugin_caps, true ) ) {
      $groups[] = 'custom';
      $groups[] = 'gpalab-blocks';
    }

    return $groups;
  }
}
