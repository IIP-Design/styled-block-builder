<?php

namespace Style_Templates;

class Shortcode {

  // Register the scripts for each block type
  public function register_template_scripts_styles() {
    
    // Check whether in dev mode and if so load dev builds 
    $dev_mode = get_option( 'gpalab-style-template-dev-mode' );
    $scripts = $dev_mode == 1 ? 'dev-template-frontend.js' : 'gpalab-template-frontend.js';
    $styles = $dev_mode == 1 ? 'dev-template-frontend.css' : 'gpalab-template-frontend.css';
    
    wp_register_script( 'gpalab-template-frontend-js', STYLE_TEMPLATES_DIST . $scripts, array(), null, true );

    wp_register_style( 'gpalab-template-frontend-css', STYLE_TEMPLATES_DIST . $styles, array(), null );
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
      'gpalab' . str_replace('-', '', ucwords( $type, '-') ) . $id,
      array(
        'meta' => get_post_meta( $id, '_gpalab_template_meta', true ),
      )
    );

    // Generate and return the shortcode
    $html = '<div data-id="' . $id . '" data-type="gpalab-' . $type . '">' . $type . '</div>';

    return $html;
  }
}