<?php
/**
 * Registers the Update_Block class.
 *
 * @package Style_Blocks\Update_Block
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Handles block form submissions.
 *
 * Accepts AJAX request from the styled blocks metabox, validates and sanitize form inputs,
 * and executes the appropriate action (be it post creation, deletion, or update).
 *
 * @package Style_Blocks\Update_Block
 * @since 0.0.1
 */
class Update_Block {

  /**
   * Create/update a block post.
   */
  public function handle_block_update() {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Load in sanitizer.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-sanitizer.php';
    $sanitizer = new Sanitizer();

    // Load in validator.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-validator.php';
    $validator = new Validator();

    // Load in uploader.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-uploader.php';
    $uploader = new Uploader();

    // The following rules are handled by the below validation and sanitization functions and hence can be safely ignored.
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotValidated
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

    // Validate the values sent in the AJAX call.
    $validator->validate_nonce( $_POST['security'] );
    $validator->validate_block_id( $_POST['id'] );
    $validator->validate_form_type( $_POST['type'] );
    $validator->validate_parent_id( $_POST['parent'] );

    // Sanitize submitted values.
    $form_type = sanitize_text_field( $_POST['type'] );
    $passed_id = sanitize_text_field( $_POST['id'] );
    $parent_id = sanitize_text_field( $_POST['parent'] );

    // Handle file uploads.
    $files;
    if ( isset( $_FILES ) ) {
      $files = $uploader->initiate_upload( $_FILES, $form_type );
    }

    $uploads = $sanitizer->prep_uploads( $files );
    $meta    = $_POST['meta'];

    // Use the appropriate sanitizer to sanitize the inputs.
    $sanitize       = $sanitizer->load_sanitizer( $form_type );
    $sanitized_meta = $sanitize->sanitize_inputs( $meta, $uploads );

    // phpcs:enable

    // Instantiate and populate the block data array.
    $block_data          = array();
    $block_data['id']    = $passed_id;
    $block_data['meta']  = $sanitized_meta;
    $block_data['title'] = $sanitized_meta['title'];
    $block_data['type']  = $form_type;

    // Add the block id to its parent's post metadata.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();

    $completed = $update_parent->save_to_parent_post_meta( $parent_id, $block_data );

    // Return post ID as the AJAX response.
    $action_type = 'added' === $completed ? 'added_post' : 'updated_post';
    $send_response->send_custom_success( $action_type, $block_data );
  }

  /**
   * Delete a block post.
   */
  public function handle_block_deletion() {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Load in validator and validate inputs.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-validator.php';
    $validator = new Validator();

    // The following rules are handled by the validation and sanitization functions and hence can be safely ignored.
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotValidated
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

    // Validate the values sent in the AJAX call.
    $validator->validate_nonce( $_POST['security'] );
    $validator->validate_parent_id( $_POST['parent'] );
    $validator->validate_block_id( $_POST['id'] );

    // Sanitize submitted values.
    $post_id   = sanitize_text_field( $_POST['id'] );
    $parent_id = sanitize_text_field( $_POST['parent'] );

    // phpcs:enable

    // Remove the block id from it's parent's post metadata.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-update-parent-post.php';
    $update_parent = new Update_Parent_Post();

    $update_parent->remove_from_parent_post_meta( $parent_id, $post_id );

    // If block exists, delete it from the database.
    if ( get_post_status( $post_id ) !== false ) {
      wp_delete_post( $post_id );
    }

    // Return post ID as the AJAX response.
    $send_response->send_custom_success( 'deleted_post', $post_id );
  }
}
