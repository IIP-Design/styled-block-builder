<?php
/**
 * Registers the Shortcode class.
 *
 * @package Style_Blocks\Shortcode
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Add styled blocks shortcode.
 *
 * The Shortcode class adds a custom shortcode and registers the corresponding scripts and styles.
 *
 * @package Style_Blocks\Shortcode
 * @since 0.0.1
 */
class Shortcode {

  /**
   * Adds a custom shortcode for the styled block.
   */
  public function add_blocks_shortcode() {
    add_shortcode( 'gpalab_block', array( $this, 'block_shortcode' ) );
  }

  /**
   * Pass required PHP values as variables to admin JS.
   *
   * @param array $args     The arguments passed into the shortcode.
   * @return string         Output shortcode.
   */
  public function block_shortcode( $args ) {
    $current_post = get_the_ID();

    $blocks = get_post_meta( $current_post, 'gpalab_blocks', true );

    // Abort and print error to console if there is a shortcode but no blocks are found in postmeta.
    if ( empty( $blocks ) ) {
      $error_msg = __(
        'Error: No blocks saved to this page. You may want to remove the gpalab-blocks shortcode(s).',
        'gpalab-blocks'
      );

      if ( ! is_admin() && ! defined( 'REST_REQUEST' ) ) {
         echo (
          '<script>console.error("' . esc_js( $error_msg ) . '")</script>'
        );
      }

      return;
    }

    // Map the provided shortcode attributes.
    $attr = shortcode_atts(
      array(
        'type' => '',
        'id'   => '',
      ),
      $args
    );

    $id   = $attr['id'];
    $type = $attr['type'];

    // Enqueue the relevant scripts & styles when shortcode present.
    wp_enqueue_script( 'gpalab-blocks-frontend-js' );
    wp_enqueue_style( 'gpalab-blocks-frontend-css' );

    if ( '1' === get_option( 'gpalab-blocks-styling' ) ) {
      wp_enqueue_style( 'site-state-css' );
    }

    // Localize the enqueued script with shortcode data.
    wp_localize_script(
      'gpalab-blocks-frontend-js',
      'gpalabBlocks',
      array(
        'blocks' => get_post_meta( $current_post, 'gpalab_blocks', true ),
      )
    );

    // Generate and return the shortcode.
    $html = '<div class="gpalab-block-item" data-id="' . $id . '" data-type="gpalab-' . $type . '" id="gpalab-' . $id . '"></div>';

    return $html;
  }
}
