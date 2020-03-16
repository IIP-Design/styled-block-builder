<?php
/**
 * Registers the Admin class.
 *
 * @package Style_Blocks\Admin
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Add styled blocks admin scripts and styles.
 *
 * @package Style_Blocks\Admin
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
    $dev_mode = get_option( 'gpalab-blocks-dev-mode' );

    $scripts = '1' === $dev_mode ? 'dev-block-admin.js' : 'gpalab-block-admin.js';
    $styles  = '1' === $dev_mode ? 'dev-block-admin.css' : 'gpalab-block-admin.css';

    wp_register_script( 'gpalab-blocks-admin-js', STYLE_BLOCKS_DIST . $scripts, array(), $this->version, true );

    wp_register_style( 'gpalab-blocks-admin-css', STYLE_BLOCKS_DIST . $styles, array(), $this->version );
  }

  /**
   * Pass required PHP values as variables to admin JS.
   */
  public function localize_admin_script_globals() {
    $current_post = get_the_ID();
    $post_type    = get_post_type( $current_post );
    $endpoint     = get_site_url() . '/wp-json/wp/v2/' . $post_type . 's/' . $current_post;

    $associated = get_post_meta( $current_post, 'gpalab_associated_blocks', true );

    $assoc_data = array();

    if ( ! empty( $associated ) ) {
      foreach ( $associated as $id ) {
        $assoc          = array();
        $assoc['id']    = $id;
        $assoc['meta']  = get_post_meta( $id, '_gpalab_block_meta', true );
        $assoc['title'] = wp_specialchars_decode( get_the_title( $id ) );
        $assoc['type']  = get_post_type( $id );

        $assoc_data[] = $assoc;
      }
    }

    wp_localize_script(
      'gpalab-blocks-admin-js',
      'gpalabBlockAdmin',
      array(
        'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
        'assets'      => STYLE_BLOCKS_URL . 'assets/',
        'apiEndpoint' => $endpoint,
        'associated'  => $assoc_data,
        'parentPost'  => $current_post,
        'blockNonce'  => wp_create_nonce( 'gpalab-block-nonce' ),
      )
    );
  }
}
