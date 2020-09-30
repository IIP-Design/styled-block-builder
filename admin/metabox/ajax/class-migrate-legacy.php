<?php
/**
 * Registers the Migrate_Legacy class.
 *
 * @package Style_Blocks\Migrate_Legacy
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Handles legacy block migrations and deletions.
 *
 * Accepts AJAX request from the styled blocks metabox, validates and sanitize form inputs,
 * and executes the appropriate action to handle legacy blocks (be it deleting or converting them).
 *
 * @package Style_Blocks\Migrate_Legacy
 * @since 3.0.0
 */
class Migrate_Legacy {

  /**
   * Convert all legacy blocks to new blocks for a given parent post.
   *
   * @since 3.0.0
   */
  public function handle_legacy_conversion() {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Nonce validation handled by validate_and_return_parent function and hence can be safely ignored.
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    $parent_id = $this->validate_and_return_parent( $_POST );
    // phpcs:enable

    // Get ids of legacy blocks.
    $associated = $this->get_associated_blocks( $parent_id );

    // Restructure legacy data into an array that can be stored in parent postmeta.
    if ( ! empty( $associated ) ) {
      $legacy_blocks = array();

      foreach ( $associated as $block ) {
        $uuid = wp_generate_uuid4();

        $block_meta          = array();
        $block_meta['id']    = $uuid;
        $block_meta['meta']  = get_post_meta( $block, '_gpalab_block_meta', true );
        $block_meta['title'] = get_the_title( $block );
        $block_meta['type']  = str_replace( 'gpalab-', '', get_post_type( $block ) );

        array_push( $legacy_blocks, $block_meta );

        $this->update_shortcodes( $parent_id, $block, $block_meta );
      }

      unset( $block );
    }

    // Append converted blocks to the existing block data for the parent post.
    $blocks = get_post_meta( $parent_id, 'gpalab_blocks', true ) ? get_post_meta( $parent_id, 'gpalab_blocks', true ) : array();

    $updated = array_merge( $blocks, $legacy_blocks );

    update_post_meta( $parent_id, 'gpalab_blocks', $updated );

    // Remove legacy data.
    $this->clean_up_legacy_data( $associated, $parent_id );

    // Prepare data for AJAX response.
    $data           = array();
    $data['id']     = $parent_id;
    $data['blocks'] = $legacy_blocks;

    // Return parent post ID and converted block data as the AJAX response.
    $send_response->send_custom_success( 'converted_legacy', $data );
  }

  /**
   * Delete all legacy block for a given parent post.
   *
   * @since 3.0.0
   */
  public function handle_legacy_deletion() {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    // Nonce validation handled by validate_and_return_parent function and hence can be safely ignored.
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    $parent_id = $this->validate_and_return_parent( $_POST );
    // phpcs:enable

    // Get ids of legacy blocks.
    $associated = $this->get_associated_blocks( $parent_id );

    // Remove legacy data.
    $this->clean_up_legacy_data( $associated, $parent_id );

    // Return parent post ID as the AJAX response.
    $send_response->send_custom_success( 'deleted_legacy', $parent_id );
  }

  /**
   * Validate AJAX request and return sanitized parent post id provided in body.
   *
   * @param array $post   An associative array of variables passed to the current script via the HTTP POST method.
   * @return int          The parent post id.
   *
   * @since 3.0.0
   */
  private function validate_and_return_parent( $post ) {
    // Load in validator.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-validator.php';
    $validator = new Validator();

    // The following rules are handled by the validation and sanitization functions and hence can be safely ignored.
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotValidated
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

    // Validate the values sent in the AJAX call.
    $validator->validate_nonce( $post['security'] );
    $validator->validate_parent_id( $post['parent'] );

    // Sanitize submitted values.
    $parent_id = sanitize_text_field( $post['parent'] );

    // phpcs:enable

    // Cast id value to an integer since post ids are ints but AJAX fields are strings.
    $id_as_int = (int) $parent_id;

    return $id_as_int;
  }

  /**
   * Search a post's content for legacy shortcode, if found, replace with new version and update post content.
   *
   * @param string $parent_id   The post id for the parent post.
   * @param string $old_id      The post id for the old block getting converted.
   * @param string $block_meta  Meta data for the new block.
   *
   * @since 3.0.2
   */
  private function update_shortcodes( $parent_id, $old_id, $block_meta ) {
    $content = get_post_field( 'post_content', $parent_id );

    $new_id = $block_meta['id'];
    $type   = $block_meta['type'];

    $old_short = "id='" . $old_id . "' type='" . $type . "']";
    $new_short = "id='" . $new_id . "' type='" . $type . "']";

    $updated_content = str_replace( $old_short, $new_short, $content );

    wp_update_post(
      array(
        'ID'           => $parent_id,
        'post_content' => $updated_content,
      )
    );
  }

  /**
   * Find the list of associated legacy blocks for a given post.
   *
   * @param string $parent_id   The post id for the parent post.
   * @return array              A list of post ids.
   *
   * @since 3.0.0
   */
  private function get_associated_blocks( $parent_id ) {
    $list = get_post_meta( $parent_id, 'gpalab_associated_blocks', true );

    return $list;
  }

  /**
   * Delete a post's legacy blocks and references to them.
   *
   * @param array $associated     A list of post ids.
   * @param int   $parent_id      The post id of the parent post.
   *
   * @since 3.0.0
   */
  private function clean_up_legacy_data( $associated, $parent_id ) {
    // Iterate through legacy blocks deleting them.
    if ( ! empty( $associated ) ) {
      foreach ( $associated as $block ) {
        wp_delete_post( $block );
      }

      unset( $block );
    }

    // Delete the parent post meta value that indicates a connection to legacy blocks.
    $this->delete_associated_meta( $parent_id );
  }

  /**
   * Deletes the legacy `gpalab_associated_blocks` metavalue from a post's postmeta.
   *
   * @param string $parent_id   The post id for the parent post.
   *
   * @since 3.0.0
   */
  private function delete_associated_meta( $parent_id ) {
    delete_post_meta( $parent_id, 'gpalab_associated_blocks' );
  }
}
