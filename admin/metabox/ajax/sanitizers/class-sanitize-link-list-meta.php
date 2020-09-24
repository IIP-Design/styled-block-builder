<?php
/**
 * Registers the Sanitize_Link_List_Meta class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.3
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the Link List.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.3
 */
class Sanitize_Link_List_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/subforms/class-sanitize-links.php';
    $sanitize_links = new Sanitize_Links();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['links'] ) ) {
      $sanitized['links'] = $sanitize_links->sanitize_links( $unsanitary['links'] );
    }

    return $sanitized;
  }
}
