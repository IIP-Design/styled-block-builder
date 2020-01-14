<?php
/**
 * Registers the Sanitize_Timeline_Meta class.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Timeline_Meta {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $data     Unsanitized values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_inputs( $data, $uploads ) {

    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-nested-files.php';
    $nested_files = new Sanitize_Nested_Files();

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['timeline'] ) ) {
      $sanitized_timeline = array();

      foreach ( $unsanitary['timeline'] as $event ) {
        $sanitized_event = array();

        $sanitized_event['id']       = sanitize_text_field( $event['id'] );
        $sanitized_event['subtitle'] = sanitize_text_field( $event['subtitle'] );
        $sanitized_event['text']     = sanitize_text_field( $event['text'] );
        $sanitized_event['year']     = sanitize_text_field( $event['year'] );
        $sanitized_event['files']    = $nested_files->sanitize_nested_files( $event['files'], $uploads );

        array_push( $sanitized_timeline, $sanitized_event );
      }

      unset( $event );

      $sanitized['timeline'] = $sanitized_timeline;
    }

    if ( ! empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    return $sanitized;
  }
}
