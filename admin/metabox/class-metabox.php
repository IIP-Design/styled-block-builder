<?php

namespace Style_Templates;

class Metabox {

  // Add custom metabox to the sidebar of the WordPress admin area
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

  // Enqueue the scripts & styles which control the metabox, add divs required by JS to the DOM
  // Note: these scripts & styles are registered & localized in Style_Templates/Admin
  public function render_templates_metabox() {
    wp_enqueue_script( 'gpalab-template-admin-js' );
    wp_enqueue_style( 'gpalab-template-admin-css' );

    $html .= '<div id="gpalab-add-template-metabox"></div>';
    $html .= '<div id="gpalab-add-template-modal"></div>';

    echo $html;
  }

  // Create/update template post
  function handle_template_update() {
    // Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
    check_ajax_referer( 'gpalab-template-nonce', 'security' );
    
    // Pull in and instantiate Update_Template class
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-template.php';
    
    $update_template = new Update_Template();

    // Run function to pass data to post
    $update_template->insert_template_data();
  }
}