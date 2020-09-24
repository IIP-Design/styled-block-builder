<?php
/**
 * Registers the Update_Block class.
 *
 * @package Style_Blocks\Update_Parent_Post
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Maintains list of associated blocks.
 *
 * Upon an AJAX request to add/delete a styled block, this class updates the list
 * of blocks associated with the parent post.
 *
 * @package Style_Blocks\Update_Parent_Post
 * @since 0.0.1
 */
class Update_Parent_Post {

  /**
   * Add a post id to the list of associated blocks.
   *
   * @param string $parent_id    Post id of the parent post.
   * @param string $block_id     Post id of the block post.
   */
  public function set_parent_post_meta( $parent_id, $block_id ) {
    // Get the list of style blocks associated with the parent post.
    $associated = get_post_meta( $parent_id, 'gpalab_associated_blocks', true );

    // Initialize empty array if no associated blocks exist.
    if ( empty( $associated ) ) {
      $associated = array();
    }

    // Check if current block is listed, if not add it.
    if ( in_array( $block_id, $associated, true ) ) {
      return;
    } else {
      $associated[] = $block_id;
      update_post_meta( $parent_id, 'gpalab_associated_blocks', $associated );
    }
  }

  /**
   * Remove a post id from the list of associated blocks.
   *
   * @param string $parent_id    Post id of the parent post.
   * @param string $block_id     Post id of the block post.
   */
  public function remove_from_parent_post_meta( $parent_id, $block_id ) {
    // Get the list of style blocks associated with the parent post.
    $associated = get_post_meta( $parent_id, 'gpalab_associated_blocks', true );

    // If no array of associated blocks, there is nothing to remove.
    if ( empty( $associated ) ) {
      return;
    }

    // Cast id value to an integer since post ids are ints, but the block_id values are stored as strings.
    $id_as_int = (int) $block_id;

    if ( in_array( $id_as_int, $associated, true ) ) {
      $remove = array( $id_as_int );

      // array_values needed to re-index the array after removing item.
      $removed = array_values( array_diff( $associated, $remove ) );

      update_post_meta( $parent_id, 'gpalab_associated_blocks', $removed );
    }
  }
}
