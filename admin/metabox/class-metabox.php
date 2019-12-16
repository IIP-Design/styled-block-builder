<?php

namespace Style_Templates;

class Metabox {

  // Add custom metabox to the sidebar of the WordPress admin area
  public function add_templates_metabox() {
    add_meta_box(
      'gpalab_templates_meta',
      __( 'Style Templates', 'gpalab-templates' ),
      array( $this, 'render_templates_metabox' ),
      array( 'page', 'post' ),
      'side',
      'high'
    );
  }

  // Enqueue the scripts & styles which control the metabox, add divs required by JS to the DOM
  // Note: these scripts & styles are registered & localized in Style_Templates/Admin
  function render_templates_metabox() {
    wp_enqueue_script( 'gpalab-template-admin-js' );
    wp_enqueue_style( 'gpalab-template-admin-css' );

    $html .= '<div id="gpalab-add-template-metabox"></div>';
    $html .= '<div id="gpalab-add-template-modal"></div>';

    echo $html;
  }
}