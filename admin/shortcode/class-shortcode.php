<?php

namespace Style_Templates;

class Shortcode {

  // Register the scripts for each block type
  public function register_template_scripts_styles() {
    wp_register_script( 'gpalab-quote-box-js', STYLE_TEMPLATES_URL . 'dist/gpalab-quote-box.js', array(), null, true );

    wp_register_style( 'gpalab-quote-box-css', STYLE_TEMPLATES_URL . 'dist/gpalab-quote-box.css', array(), null );
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
      wp_enqueue_script( 'gpalab-quote-box-js' );
      wp_enqueue_style( 'gpalab-quote-box-css' );
    }
    
    wp_localize_script(
      'gpalab-' . $type . '-js',
      str_replace('-', '', $type) . $id,
      array(
        'blockId' => $id,
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