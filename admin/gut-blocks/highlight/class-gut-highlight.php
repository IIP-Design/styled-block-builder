<?php
/**
 * Registers the Animated class.
 *
 * @package Style_Templates\Animated
 * @since 0.0.1
 */

namespace Style_Templates;

class Animated {

  public function register_animated_blocks() {

    // Ensures that Gutenberg is active.
    if ( ! function_exists( 'register_block_type' ) ) {
      return;
    }

    wp_register_script(
      'gcx-animated-admin-js',
      STYLE_TEMPLATES_URL . 'admin/js/dist/gcx-animated.min.js',
      array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-i18n' ),
      filemtime( STYLE_TEMPLATES_DIR . 'admin/js/dist/gcx-animated.min.js' ),
      true
    );

    wp_register_style(
      'gcx-animated-css',
      STYLE_TEMPLATES_URL . 'admin/js/dist/gcx-animated.min.css',
      array(),
      filemtime( STYLE_TEMPLATES_DIR . 'admin/js/dist/gcx-animated.min.css' )
    );

    register_block_type(
      'gcx-templates/animated',
      array(
        'editor_script' => 'gcx-animated-admin-js',
        'style'         => 'gcx-animated-css',
      )
    );
  }

  public function register_animated_block_category( $categories, $post ) {
    $type = $post->post_type;

    if ( 'post' !== $type && 'page' !== $type ) {
      return $categories;
    }

    return array_merge(
      $categories,
      array(
        array(
          'slug'  => 'gcx_animated',
          'title' => __( 'Animated', 'gcx-templates' ),
        ),
      )
    );
  }
}
