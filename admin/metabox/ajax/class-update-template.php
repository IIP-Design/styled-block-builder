<?php

namespace Style_Templates;

class Update_Template {

  // Create/update a template post
  public function handle_template_update() {
    // Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
    $is_nonce_set = isset( $_POST[ 'security' ] );
    $is_verified_nonce = wp_verify_nonce( $_POST[ 'security' ], 'gpalab-template-nonce' );
    $is_referer_valid = check_ajax_referer( 'gpalab-template-nonce', 'security' );
    
    if ( !$is_nonce_set || !$is_verified_nonce || !$is_referer_valid ) {
      return;
    }

    // Check what sort of form has been submitted and whether it is a new post
    $form_type = sanitize_text_field( $_POST['type'] );
    $passed_id = sanitize_text_field( $_POST['id'] );
    
    // Use the appropriate sanitizer to sanitize the inputs
    $sanitizer = $this->load_sanitizer( $form_type );
    $meta = $sanitizer->sanitize_inputs( $_POST['meta'] );

    // Istantiate and populate the post data array
    $data = array();
    $data['id'] = $passed_id;
    $data['post_meta'] = $meta;
    $data['post_title'] = $meta['title'];
    $data['post_type'] = $form_type;

    // Run function to pass data to post
    $post_id = $this->insert_template_data( $data );

    $parent_id = sanitize_text_field( $_POST['parent'] );
    
    // Add the template id to its parent's post metadata
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();
    $update_parent->set_parent_post_meta( $parent_id, $post_id );

    // Return post ID as the AJAX response
    $is_new = $passed_id == 0 ? 'Added a ' : 'Updated the ';
    wp_send_json($is_new . $form_type . ' template with the ID: ' . $post_id );

    wp_die();
  }

  // Delete a template post
  public function handle_template_deletion() {
    // Check for a valid nonce coming from the AJAX request (nonce set in Style_Templates/Admin)
    $is_nonce_set = isset( $_POST[ 'security' ] );
    $is_verified_nonce = wp_verify_nonce( $_POST[ 'security' ], 'gpalab-template-nonce' );
    $is_referer_valid = check_ajax_referer( 'gpalab-template-nonce', 'security' );
    
    if ( !$is_nonce_set || !$is_verified_nonce || !$is_referer_valid ) {
      return;
    }

    // Get required information about the template
    $post_id = sanitize_text_field( $_POST['id'] );
    $parent_id = sanitize_text_field( $_POST['parent'] );
    
    // Remove the template id from it's parent's post metadata
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();
    $update_parent->remove_from_parent_post_meta( $parent_id, $post_id );

    wp_delete_post( $post_id );

    // Return post ID as the AJAX response
    wp_send_json('Deleted the template with the ID: ' . $post_id );

    wp_die();
  }

  // Pull in and instantiate the proper sanitizer class for the form type submitted
  function load_sanitizer( $form_type ) {

    if ( $form_type == 'quote-box') {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();
      
      return $sanitize;
    }

    if ( $form_type == 'text') {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-text-meta.php';
      $sanitize = new Sanitize_Text_Meta();
      
      return $sanitize;
    }
  }
  
  // Accept post data and use it to create/update post
  function insert_template_data( $data ) {
    $user_id = get_current_user_id();
    
    $post_data = array(
      'ID'                    => $data['id'],
      'post_author'           => $user_id,
      'post_content'          => '',
      'post_content_filtered' => '',
      'post_title'            => $data['post_title'],
      'post_excerpt'          => '',
      'post_status'           => 'publish',
      'post_type'             => $data['post_type'],
      'comment_status'        => 'closed',
      'post_parent'           => 0,
      'meta_input'            => array( '_gpalab_template_meta' => $data['post_meta'])
    );

    // wp_insert_post creates a new post if the ID passed in is empty or 0
    // Otherwise, it updates the existing post with the provided post ID
    $post_id = wp_insert_post( $post_data, true );

    return $post_id;
  }
}