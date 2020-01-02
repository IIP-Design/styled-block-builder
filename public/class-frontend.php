<?php
/**
 * Registers the Frontend class.
 *
 * @package Style_Templates\Frontend
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Add style templates frontend scripts and styles.
 *
 * @package Style_Templates\Admin
 * @since 0.0.1
 */
class Frontend {

  /**
   * Register the scripts for each block type.
   */
  public function register_template_scripts_styles() {

    /** Check whether in dev mode and if so load dev builds. */
    $dev_mode = get_option( 'gpalab-style-template-dev-mode' );
    $scripts  = '1' === $dev_mode ? 'dev-template-frontend.js' : 'gpalab-template-frontend.js';
    $styles   = '1' === $dev_mode ? 'dev-template-frontend.css' : 'gpalab-template-frontend.css';

    wp_register_script( 'gpalab-template-frontend-js', STYLE_TEMPLATES_DIST . $scripts, array(), null, true );

    wp_register_style( 'gpalab-template-frontend-css', STYLE_TEMPLATES_DIST . $styles, array(), null );

    wp_localize_script(
      'gpalab-template-frontend-js',
      'gpalabTemplateFront',
      array(
        'assets' => STYLE_TEMPLATES_URL . 'assets/',
      )
    );
  }
}
