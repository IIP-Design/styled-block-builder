<?php

namespace Style_Templates;

class Update_Template {

  // Create/update template post
  public function handle_template_update() {
    // Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
    check_ajax_referer( 'gpalab-template-nonce', 'security' );

    // Check what sort of form has been submitted
    $form_type = sanitize_text_field( $_POST['type'] );
    
    // Use the appropriate sanitizer to sanitize the inputs
    $sanitizer = $this->load_sanitizer( $form_type );
    $meta = $sanitizer->sanitize_inputs( $_POST['meta'] );

    // Istantiate and populate the post data array
    $data = array();
    $data['post_meta'] = $meta;
    $data['post_title'] = $meta['title'];
    $data['post_type'] = 'quote-box';

    // Run function to pass data to post
    $this->insert_template_data( $data );
  }

  // Pull in and instantiate the proper sanitizer class for the form type submitted
  function load_sanitizer( $form_type ) {

    if ( $form_type == 'quote-box') {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/forms/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();
      
      return $sanitize;
    }
  }
  
  // Accept post data and use it to create/update post
  function insert_template_data( $data ) {
    $user_id = get_current_user_id();
    
    $post_data = array(
      'post_author'           => $user_id,
      'post_content'          => '',
      'post_content_filtered' => '',
      'post_title'            => $data['post_title'],
      'post_excerpt'          => '',
      'post_status'           => 'publish',
      'post_type'             => $data['post_type'],
      'comment_status'        => 'closed',
      'post_parent'           => 0,
      'meta_input'            => $data['post_meta']
    );

    // wp_insert_post creates a new post if the ID passed in is empty or 0
    // Otherwise, it updates the existing post with the provided post ID
    wp_insert_post( $post_data, true );
  }
}