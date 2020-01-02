<?php
/**
 * Registers the Update_Template class.
 *
 * @package Style_Templates\Update_Parent_Post
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Maintains list of associated templates.
 *
 * Upon an AJAX request to add/delete a style template, this class updates the list
 * of templates associated with the parent post.
 *
 * @package Style_Templates\Update_Parent_Post
 * @since 0.0.1
 */
class Update_Parent_Post {

  /**
   * Add a post id to the list of associated templates.
   *
   * @param string $parent_id       Post id of the parent post.
   * @param string $template_id     Post id of the template post.
   */
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

  /**
   * Remove a post id to the list of associated templates.
   *
   * @param string $parent_id       Post id of the parent post.
   * @param string $template_id     Post id of the template post.
   */
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
