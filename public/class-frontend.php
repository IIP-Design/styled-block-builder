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
    $dev_mode = get_option( 'gpalab-blocks-dev-mode' );
    $scripts  = '1' === $dev_mode ? 'dev-block-frontend.js' : 'gpalab-block-frontend.js';
    $styles   = '1' === $dev_mode ? 'dev-block-frontend.css' : 'gpalab-block-frontend.css';

    $style_mode = get_option( 'gpalab-style-dev-mode' );
    $set_styles = '1' === $style_mode ? 'site-state.css' : 'gpalab-block-frontend.css';

    wp_register_script( 'gpalab-blocks-frontend-js', STYLE_BLOCKS_DIST . $scripts, array(), $this->version, true );

    wp_register_style( 'gpalab-blocks-frontend-css', STYLE_BLOCKS_DIST . $styles, array(), $this->version );

    wp_register_style( 'site-state-css', STYLE_BLOCKS_DIST . $set_styles, array(), $this->version );


    wp_localize_script(
      'gpalab-blocks-frontend-js',
      'gpalabBlockFront',
      array(
        'assets' => STYLE_BLOCKS_URL . 'assets/',
      )
    );
  }
}
