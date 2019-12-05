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

    // Check what sort of form has been submittes
    $form_type = sanitize_text_field( $_POST['type'] );
    
    // Use the appropriate sanitizer to sanitize the inputs
    $sanitizer = $this->load_sanitizer( $form_type );
    $meta = $sanitizer->sanitize_inputs( $_POST['meta'] );

    // Istantiate and populate the post data array
    $data = array();
    $data['post_meta'] = $meta;
    $data['post_title'] = $meta['title'];
    $data['post_type'] = 'quote-box';

    // Pull in and instantiate Update_Template class
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-template.php';
    $update_template = new Update_Template();

    // Run function to pass data to post
    $update_template->insert_template_data( $data );
  }

  // Pull in and instantiate the proper sanitizer class for the form type submitted
  function load_sanitizer( $form_type ) {

    if ( $form_type == 'quote-box') {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/forms/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();
      
      return $sanitize;
    }
  }
}