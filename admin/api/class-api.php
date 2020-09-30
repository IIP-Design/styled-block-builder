<?php
/**
 * Registers the API class.
 *
 * @package Style_Blocks\API
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Creates custom API endpoint. - Disabled as of v3.0.0.
 *
 * Adds a 'gpalab_associated_blocks' node to the WordPress posts API,
 * which displays the data for style blocks associated with the post.
 *
 * @package Style_Blocks\API
 * @since 0.0.1
 */
class API {

  /**
   * Register an API endpoint for 'gpalab_styles_blocks' data for each post
   */
  public function register_associated_blocks_meta() {
    $args = array(
      'get_callback'    => array( $this, 'get_block_data_for_api' ),
      'update_callback' => null,
      'schema'          => null,
    );

    register_rest_field(
      'post',
      'gpalab_associated_blocks',
      $args
    );
  }

  /**
   * Register an API endpoint for 'gpalab_styles_blocks' data for each post
   *
   * @param array $object     Post data object.
   */
  public function get_block_data_for_api( $object ) {
    // Get the id of the given post.
    $post_id = $object['id'];

    $gpalab_style_blocks = array();

    if ( metadata_exists( 'post', $post_id, 'gpalab_associated_blocks' ) ) {

      $associated_posts = get_post_meta( $post_id, 'gpalab_associated_blocks', true );

      foreach ( $associated_posts as $associated ) {
        $associated_data = array();

        $associated_data['id']    = $associated;
        $associated_data['title'] = wp_specialchars_decode( get_the_title( $associated ) );
        $associated_data['meta']  = get_post_meta( $associated, '_gpalab_block_meta', true );

        array_push( $gpalab_style_blocks, $associated_data );
      }

      unset( $associated );

    }

    // Return the list of associated posts.
    return $gpalab_style_blocks;
  }
}
