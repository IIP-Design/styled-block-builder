<?php
/**
 * Registers the Sanitize_Links class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded link data and sanitize each field.
 *
 * Checks for and sanitizes the fields expected by the link.
 *
 * @package Style_Blocks\Sanitizer
 * @since 3.0.0
 */
class Sanitize_Links {

  /**
   * Checks for and sanitizes the expected link fields.
   *
   * @param array $link   Unsanitized link values sent over in the AJAX request.
   * @return array        Array of sanitized values
   */
  public function sanitize_link( $link ) {
    $sanitized_link = array();

    $sanitized_link['id']       = sanitize_text_field( $link['id'] );
    $sanitized_link['linkText'] = sanitize_text_field( $link['linkText'] );
    $sanitized_link['linkUrl']  = sanitize_text_field( $link['linkUrl'] );

    return $sanitized_link;
  }

  /**
   * Checks for and sanitizes a group of links.
   *
   * @param array $links    Unsanitized link group sent over in the AJAX request.
   * @return array          Array of sanitized values
   */
  public function sanitize_links( $links ) {

    $sanitized_links = array();

    foreach ( $links as $link ) {
      $sanitized_link = $this->sanitize_link( $link );

      array_push( $sanitized_links, $sanitized_link );
    }

    unset( $link );

    return $sanitized_links;
  }
}
