<?php
/**
 * Registers the Admin class.
 *
 * @package Style_Templates\Admin
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Add style templates admin scripts and styles.
 *
 * @package Style_Templates\Admin
 * @since 0.0.1
 */
class Admin {

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
   * Register the scripts and styles for the admin interface.
   */
  public function register_admin_scripts_styles() {

    // Check whether in dev mode and if so load dev builds.
    $dev_mode = get_option( 'gpalab-style-template-dev-mode' );

    $scripts = '1' === $dev_mode ? 'dev-template-admin.js' : 'gpalab-template-admin.js';
    $styles  = '1' === $dev_mode ? 'dev-template-admin.css' : 'gpalab-template-admin.css';

    wp_register_script( 'gpalab-template-admin-js', STYLE_TEMPLATES_DIST . $scripts, array(), $this->version, true );

    wp_register_style( 'gpalab-template-admin-css', STYLE_TEMPLATES_DIST . $styles, array(), $this->version );
  }

  /**
   * Pass required PHP values as variables to admin JS.
   */
  public function localize_admin_script_globals() {
    $current_post = get_the_ID();
    $post_type    = get_post_type( $current_post );
    $endpoint     = get_site_url() . '/wp-json/wp/v2/' . $post_type . 's/' . $current_post;

    $associated = get_post_meta( $current_post, 'gpalab_associated_templates', true );

    $assoc_data = array();

    if ( ! empty( $associated ) ) {
      foreach ( $associated as $id ) {
        $assoc          = array();
        $assoc['id']    = $id;
        $assoc['meta']  = get_post_meta( $id, '_gpalab_template_meta', true );
        $assoc['title'] = wp_specialchars_decode( get_the_title( $id ) );
        $assoc['type']  = get_post_type( $id );

        $assoc_data[] = $assoc;
      }
    }

    wp_localize_script(
      'gpalab-template-admin-js',
      'gpalabTemplateAdmin',
      array(
        'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
        'assets'        => STYLE_TEMPLATES_URL . 'assets/',
        'apiEndpoint'   => $endpoint,
        'associated'    => $assoc_data,
        'parentPost'    => $current_post,
        'templateNonce' => wp_create_nonce( 'gpalab-template-nonce' ),
      )
    );
  }
}
