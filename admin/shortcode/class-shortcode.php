<?php

namespace Style_Templates;

class Shortcode {

  // Register the scripts for each block type
  public function register_template_scripts_styles() {
    wp_register_script( 'gpalab-template-frontend-js', STYLE_TEMPLATES_DIST . 'gpalab-template-frontend.js', array(), null, true );

    wp_register_style( 'gpalab-template-frontend-css', STYLE_TEMPLATES_DIST . 'gpalab-template-frontend.css', array(), null );
  }

  public function add_templates_shortcode() {
    add_shortcode( 'gpalab_template', array( $this, 'template_shortcode' ) );
  }
  
  function template_shortcode( $args ) {
    // Map the provided shortcode attributes
    $attr = shortcode_atts( array(
      'type' => '',
      'id'   => ''
    ), $args );

    $id = $attr['id'];
    $type = $attr['type'];

    // Enqueue the relevant scripts & styles when shortcode present
    wp_enqueue_script( 'gpalab-template-frontend-js' );
    wp_enqueue_style( 'gpalab-template-frontend-css' );

    // Localize the enqueued script
    wp_localize_script(
      'gpalab-template-frontend-js',
      str_replace('-', '', $type) . $id,
      array(
        'blockId' => $id,
      )
    );

    // Generate and return the shortcode
    $html = '<div data-id="' . $id . '" data-type="gpalab-' . $type . '">' . $type . '</div>';

    return $html;
  }
}