<?php

namespace Style_Templates;

class Metabox {

  public function add_templates_metabox() {
    add_meta_box(
      'gpalab_templates_meta',
      __( 'Add Style Template', 'gpalab-templates' ),
      array( $this, 'render_templates_metabox' ),
      'post',
      'side',
      'high'
    );
  }

  public function render_templates_metabox() {
    wp_enqueue_style( 'gpalab-template-admin' );

    $html .= '<div id="gpalab-add-style-template">';
    $html .=   '<label for="gpalab-templates-dropdown">';
    $html .=     '<strong>Add a Style Template:</strong>';
    $html .=     '<select class="gpalab-admin-dropdown id="gpalab-templates-dropdown">';
    $html .=       '<option value="">- Select Template Type -</option>';
    $html .=       '<option value="quote-box">Quote Box</option>';
    $html .=     '</select>';
    $html .=   '</label>';
    $html .= '</div>';

    echo $html;
  }
}