<?php

namespace Style_Templates;

class Metabox {

  public function add_templates_metabox() {
    add_meta_box(
      'gpalab_templates_meta',
      __( 'Style Templates', 'gpalab-templates' ),
      array( $this, 'render_templates_metabox' ),
      'post',
      'side',
      'high'
    );
  }

  public function render_templates_metabox() {
    wp_enqueue_script( 'gpalab-template-admin-js' );
    wp_enqueue_style( 'gpalab-template-admin-css' );

    $html .= '<div id="gpalab-add-template-metabox"></div>';
    $html .= '<div id="gpalab-add-template-modal"></div>';

    echo $html;
  }

  static function update_template( $args ) {
    $create_new_template = new Style_Templates\Create_Post();

    $create_new_template->create_template( $args );
  }
}