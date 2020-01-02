<?php

namespace Style_Templates;

class Shortcode {

  public function add_templates_shortcode() {
    add_shortcode( 'gpalab_template', array( $this, 'template_shortcode' ) );
  }

  function template_shortcode( $args ) {
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
    wp_enqueue_script( 'gpalab-template-frontend-js' );
    wp_enqueue_style( 'gpalab-template-frontend-css' );

    // Localize the enqueued script with shortcode data.
    wp_localize_script(
      'gpalab-template-frontend-js',
      'gpalab' . str_replace( '-', '', ucwords( $type, '-' ) ) . $id,
      array(
        'meta' => get_post_meta( $id, '_gpalab_template_meta', true ),
      )
    );

    // Generate and return the shortcode.
    $html = '<div data-id="' . $id . '" data-type="gpalab-' . $type . '">' . $type . '</div>';

    return $html;
  }
}
