<?php

namespace Style_Templates;

class Update_Template {

  // Accept post data and use it to create/update post
  public function insert_template_data() {
    $user_id = get_current_user_id();
    $post_title = 'Test';
    $post_type = 'quote-box';
    
    $post_data = array(
      'post_author'           => $user_id,
      'post_content'          => '',
      'post_content_filtered' => '',
      'post_title'            => $post_title,
      'post_excerpt'          => '',
      'post_status'           => 'publish',
      'post_type'             => $post_type,
      'comment_status'        => 'closed',
      'post_parent'           => 0,
      'meta_input'            => array()
    );

    // wp_insert_post creates a new post if the ID passed in is empty or 0
    // Otherwise, it updates the existing post with the provided post ID
    wp_insert_post( $post_data, true );
  }
}