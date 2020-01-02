<?php
/**
 * Registers the Metabox class.
 *
 * @package Style_Templates\Metabox
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Add style templates metabox.
 *
 * The Metabox class adds a custom metabox to post and page admin interface where
 * users can add and configure style template to be added to the post.
 *
 * @package Style_Templates\Metabox
 * @since 0.0.1
 */
class Metabox {

  /**
   * Add custom metabox to the sidebar of the WordPress admin area.
   */
  public function add_templates_metabox() {
    add_meta_box(
      'gpalab_templates_meta',
      __( 'Style Templates', 'gpalab-templates' ),
      function() {
        return $this->render_templates_metabox();
      },
      array( 'page', 'post' ),
      'side',
      'high'
    );
  }

  /**
   * Enqueue the scripts & styles which control the metabox, add divs required by JS to the DOM
   * Note: these scripts & styles are registered & localized in Style_Templates/Admin
   */
  private function render_templates_metabox() {
    wp_enqueue_script( 'gpalab-template-admin-js' );
    wp_enqueue_style( 'gpalab-template-admin-css' );

    $html .= '<div id="gpalab-add-template-metabox"></div>';
    $html .= '<div id="gpalab-add-template-modal"></div>';

    $allowed_html = array(
      'div' => array(
        'id' => array(),
      ),
    );

    echo wp_kses( $html, $allowed_html );
  }
}
