<?php
/**
 * Registers the Metabox class.
 *
 * @package Style_Blocks\Metabox
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Add styled blocks metabox.
 *
 * The Metabox class adds a custom metabox to post and page admin interface where
 * users can add and configure styled block to be added to the post.
 *
 * @package Style_Blocks\Metabox
 * @since 0.0.1
 */
class Metabox {

  /**
   * Add custom metabox to the sidebar of the WordPress admin area.
   */
  public function add_blocks_metabox() {
    add_meta_box(
      'gpalab_blocks_meta',
      __( 'Styled Blocks', 'gpalab-blocks' ),
      function() {
        return $this->render_blocks_metabox();
      },
      array( 'page', 'post' ),
      'side',
      'high'
    );
  }

  /**
   * Enqueue the scripts & styles which control the metabox, add divs required by JS to the DOM
   * Note: these scripts & styles are registered & localized in Style_Blocks/Admin
   */
  private function render_blocks_metabox() {
    wp_enqueue_script( 'gpalab-blocks-admin-js' );
    wp_enqueue_style( 'gpalab-blocks-admin-css' );

    $html .= '<div id="gpalab-blocks-metabox"></div>';
    $html .= '<div id="gpalab-blocks-modal"></div>';

    $allowed_html = array(
      'div' => array(
        'id' => array(),
      ),
    );

    echo wp_kses( $html, $allowed_html );
  }
}
