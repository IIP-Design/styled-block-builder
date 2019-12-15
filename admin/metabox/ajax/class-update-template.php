<?php

namespace Style_Templates;

class Update_Template {

  // Create/update a template post
  public function handle_template_update() {
    // Load in possible HTTP responses
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Load in sanitizer
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-sanitizer.php';
    $sanitizer = new Sanitizer();

    // Load in validator
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-validator.php';
    $validator = new Validator();

    // Validate the values sent in the AJAX call
    $validator->validate_nonce( $_POST[ 'security' ] );
    $validator->validate_post_id( $_POST['id'] );
    $validator->validate_form_type( $_POST['type'] );
    $validator->validate_parent_id( $_POST['parent'] );

    // Sanitize submited values
    $form_type = sanitize_text_field( $_POST['type'] );
    $passed_id = sanitize_text_field( $_POST['id'] );
    $parent_id = sanitize_text_field( $_POST['parent'] );
    
    // Use the appropriate sanitizer to sanitize the inputs
    $sanitize = $sanitizer->load_sanitizer( $form_type );
    $meta = $sanitize->sanitize_inputs( $_POST['meta'] );

    // Istantiate and populate the post data array
    $data = array();
    $data['id'] = $passed_id;
    $data['post_meta'] = $meta;
    $data['post_title'] = $meta['title'];
    $data['post_type'] = $form_type;

    // Run function to pass data to post
    $post_id = $this->insert_template_data( $data );
    
    // Add the template id to its parent's post metadata
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();

    $update_parent->set_parent_post_meta( $parent_id, $post_id );

    // Return post ID as the AJAX response
    $action_type = $passed_id == 0 ? 'added_post' : 'updated_post';
    $send_response->send_custom_success( $action_type, $post_id );
  }

  // Delete a template post
  public function handle_template_deletion() {
    // Load in possible HTTP responses
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Load in validator and validate inputs
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-validator.php';
    $validator = new Validator();

    // Validate the values sent in the AJAX call
    $validator->validate_nonce( $_POST[ 'security' ] );
    $validator->validate_post_id( $_POST['id'] );
    $validator->validate_parent_id( $_POST['parent'] );

    // Sanitize submited values
    $post_id = sanitize_text_field( $_POST['id'] );
    $parent_id = sanitize_text_field( $_POST['parent'] );
    
    // Remove the template id from it's parent's post metadata
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();

    $update_parent->remove_from_parent_post_meta( $parent_id, $post_id );

    wp_delete_post( $post_id );

    // Return post ID as the AJAX response
    $send_response->send_custom_success( 'deleted_post', $post_id );
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
      'post_type'             => 'gpalab-' . $data['post_type'],
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