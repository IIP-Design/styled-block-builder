<?php

namespace Style_Templates;

class Update_Template {

  // Create/update template post
  public function handle_template_update() {
    // Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
    $is_nonce_set = isset( $_POST[ 'security' ] );
    $is_verified_nonce = wp_verify_nonce( $_POST[ 'security' ], 'gpalab-template-nonce' );
    $is_referer_valid = check_ajax_referer( 'gpalab-template-nonce', 'security' );
    
    if ( !$is_nonce_set || !$is_verified_nonce || !$is_referer_valid ) {
      return;
    }

    // Check what sort of form has been submitted
    $form_type = sanitize_text_field( $_POST['type'] );
    
    // Use the appropriate sanitizer to sanitize the inputs
    $sanitizer = $this->load_sanitizer( $form_type );
    $meta = $sanitizer->sanitize_inputs( $_POST['meta'] );

    // Istantiate and populate the post data array
    $data = array();
    $data['post_meta'] = $meta;
    $data['post_title'] = $meta['title'];
    $data['post_type'] = $form_type;

    // Run function to pass data to post
    $post_id = $this->insert_template_data( $data );

    $parent_id = sanitize_text_field( $_POST['parent'] );
    
    // Add template id to parent post meta
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();
    $update_parent->set_parent_post_meta( $parent_id, $post_id );

    // Return post ID as the AJAX response
    wp_send_json($post_id);

    wp_die();
  }

  // Pull in and instantiate the proper sanitizer class for the form type submitted
  function load_sanitizer( $form_type ) {

    if ( $form_type == 'quote-box') {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-quotebox-meta.php';
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
    $post_id = wp_insert_post( $post_data, true );

    return $post_id;
  }
}