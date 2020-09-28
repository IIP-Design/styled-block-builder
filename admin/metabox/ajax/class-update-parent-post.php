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
   * Add/update a block's data to it's parent's post metadata.
   *
   * @param string $parent_id      Post id of the parent post.
   * @param array  $block_meta     New/updated block data to be saved.
   */
  public function save_to_parent_post_meta( $parent_id, $block_meta ) {
    // Pull the block ID off of the provided block metadata.
    $block_id = $block_meta['id'];

    // Get the serialized array of styled block data associated with the parent post.
    $blocks = get_post_meta( $parent_id, 'gpalab_blocks', true );

    // Initialize empty array if no associated blocks exist.
    if ( empty( $blocks ) ) {
      $blocks = array();
    }

    $block_ids = $this->get_block_ids( $blocks );

    // Check if current block is listed, if not add it.
    if ( in_array( $block_id, $block_ids, true ) ) {
      $position = $this->get_block_position( $block_ids, $block_id );
      $updated  = $this->replace_block_data( $blocks, $block_meta, $position );

      update_post_meta( $parent_id, 'gpalab_blocks', $updated );
    } else {
      $blocks[] = $block_meta;
      update_post_meta( $parent_id, 'gpalab_blocks', $blocks );
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

  /**
   * Find an existing block in the list of block data and update it.
   *
   * @param array $blocks       Serialized array of block data.
   * @param array $block_meta   Updated block data to be saved.
   * @param int   $position     Updated block data to be saved.
   * @return array
   */
  private function replace_block_data( $blocks, $block_meta, $position ) {
    $updated = $blocks;

    // Replace block data at given index with provided data.
    $updated[ $position ] = $block_meta;

    return $updated;
  }

  /**
   * Get an array of block ids from a serialized array of block data.
   *
   * @param array $blocks   Serialized array of block data.
   * @return array          An array of block ids derived from the provided block data.
   */
  private function get_block_ids( $blocks ) {
    $block_ids = array();

    foreach ( $blocks as $block ) {
      $id = $block['id'];

      array_push( $block_ids, $id );
    }

    unset( $block );

    return $block_ids;
  }

  /**
   * Get the position (index) of the provided id within the provided array.
   *
   * @param array  $block_ids   Array of block ids.
   * @param string $id          Id value.
   * @return int                The position of the provided id.
   */
  private function get_block_position( $block_ids, $id ) {
    $pos;

    foreach ( $block_ids as $key => $block_id ) {
      if ( $id === $block_id ) {

        $pos = $key;
      }
    }

    unset( $block );

    return $pos;
  }
}
