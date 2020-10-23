<?php
/**
 * Registers the Frontend class.
 *
 * @package Style_Blocks\Frontend
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Add styled blocks frontend scripts and styles.
 *
 * @package Style_Blocks\Frontend
 * @since 0.0.1
 */
class Frontend {

  /**
   * Initializes the class with the plugin name and version.
   *
   * @param string $plugin     The plugin name.
   * @param string $version    The plugin version number.
   */
  public function __construct( $plugin, $version ) {
    $this->plugin  = $plugin;
    $this->version = $version;
  }

  /**
   * Register the scripts for each block type.
   */
  public function register_blocks_scripts_styles() {

    /** Check whether in dev mode and if so load dev builds. */
    $dev_mode     = get_option( 'gpalab-blocks-dev-mode' );
    $scripts      = '1' === $dev_mode ? 'dev-block-frontend.js' : 'gpalab-block-frontend.js';
    $base_styles  = '1' === $dev_mode ? 'dev-block-frontend.css' : 'gpalab-block-frontend.css';
    $state_styles = '1' === $dev_mode ? 'dev-site-state.css' : 'gpalab-site-state.css';

    wp_register_script( 'gpalab-blocks-frontend-js', STYLE_BLOCKS_DIST . $scripts, array(), $this->version, true );

    wp_register_style( 'gpalab-blocks-frontend-css', STYLE_BLOCKS_DIST . $base_styles, array(), $this->version );

    if ( '1' === get_option( 'gpalab-blocks-styling' ) ) {
      wp_register_style( 'site-state-css', STYLE_BLOCKS_DIST . $state_styles, array(), $this->version );
    }

    $brightcove = get_option( 'gpalab-blocks-brightcove' ) ? get_option( 'gpalab-blocks-brightcove' ) : get_option( '_brightcove_default_account' );

    wp_localize_script(
      'gpalab-blocks-frontend-js',
      'gpalabBlockFront',
      array(
        'brightcove' => $brightcove,
      )
    );
  }
}
