<?php

namespace Style_Templates;

class Update_Parent_Post {

  public function set_parent_post_meta( $parent_id, $template_id ) {
    // Get the list of style templates associated with the parent post
    $associated = get_post_meta( $parent_id, '_gpalab_associated_templates', true );

    // Initialize empy array if no associated templates exist
    if ( empty( $associated) ) {
      $associated = array();
    }

    // Check if current template is listed, if not add it
    if ( in_array( $template_id, $associated ) ) {
      return;
    } else {
      $associated[] = $template_id;
      update_post_meta( $parent_id, '_gpalab_associated_templates', $associated );
    }
  }
}