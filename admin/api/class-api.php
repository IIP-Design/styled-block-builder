<?php

namespace Style_Templates;

class API {

  /**
   * Register an API endpoint for 'gpalab_styles_templates' data for each post
   */
  public function register_associated_templates_meta() {
    $args = array(
      'get_callback'    => array( $this, 'get_template_data_for_api' ),
      'update_callback' => null,
      'schema'          => null,
    );

    register_rest_field(
      'post',
      'gpalab_associated_templates',
      $args
    );
  }

  function get_template_data_for_api( $object ) {
    // Get the id of the given post.
    $post_id = $object['id'];

    $gpalab_style_templates = array();

    if ( metadata_exists( 'post', $post_id, 'gpalab_associated_templates' ) ) {

      $associated_posts = get_post_meta( $post_id, 'gpalab_associated_templates', true );

      foreach ( $associated_posts as $associated ) {
        $associated_data = array();

        $associated_data['id']    = $associated;
        $associated_data['title'] = wp_specialchars_decode( get_the_title( $associated ) );
        $associated_data['meta']  = get_post_meta( $associated, '_gpalab_template_meta', true );

        array_push( $gpalab_style_templates, $associated_data );
      }

      unset( $associated );

    }

    // Return the list of associated posts.
    return $gpalab_style_templates;
  }
}
