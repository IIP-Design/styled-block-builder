<?php

namespace Style_Templates;

class Update_Parent_Post {

  public function set_parent_post_meta( $parent_id, $template_id ) {
    // Get the list of style templates associated with the parent post.
    $associated = get_post_meta( $parent_id, 'gpalab_associated_templates', true );

    // Initialize empy array if no associated templates exist.
    if ( empty( $associated ) ) {
      $associated = array();
    }

    // Check if current template is listed, if not add it.
    if ( in_array( $template_id, $associated, true ) ) {
      return;
    } else {
      $associated[] = $template_id;
      update_post_meta( $parent_id, 'gpalab_associated_templates', $associated );
    }
  }

  public function remove_from_parent_post_meta( $parent_id, $template_id ) {
    // Get the list of style templates associated with the parent post.
    $associated = get_post_meta( $parent_id, 'gpalab_associated_templates', true );

    if ( empty( $associated ) ) {
      return;
    }

    if ( in_array( $template_id, $associated, true ) ) {
      $remove = array( $template_id );

      // array_values needed to reindex the array after removing item.
      $removed = array_values( array_diff( $associated, $remove ) );

      update_post_meta( $parent_id, 'gpalab_associated_templates', $removed );
    }
  }
}
