<?php

namespace Style_Templates;

class Shortcode {

  // Register the scripts for each block type
  public function register_template_scripts() {
    wp_register_script( 'gpalab-quote-box', STYLE_TEMPLATES_URL . 'dist/gpalab-quote-box.js', array(), null, true );
  }
  
  public function template_shortcode( $args ) {
    // Map the provided shortcode attributes
    $attr = shortcode_atts( array(
      'type' => '',
      'id'   => ''
    ), $args );

    $id = $attr['id'];
    $type = $attr['type'];

    // Check the requested block type and enqueue the relevant script
    if ( $type == 'quote-box' ) {
      wp_enqueue_script( 'gpalab-quote-box' );
    }

    wp_localize_script(
      'gpalab-' . $type,
      str_replace('-', '', $type) . $id,
      array(
        'blockId' => $id
      )
    );

    // Generate and return the shortcode
    $html = '<div data-id="' . $id . '" data-type="gpalab-' . $type . '">' . $type . '</div>';

    return $html;
  }

  public function add_templates_shortcode() {
    add_shortcode( 'gpalab_template', array( $this, 'template_shortcode' ) );
  }
}