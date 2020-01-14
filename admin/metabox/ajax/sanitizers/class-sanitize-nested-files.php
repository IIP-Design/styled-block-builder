<?php
/**
 * Registers the Sanitize_Nested_Files class.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Iterate over uploaded files and compare.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Templates\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Nested_Files {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $files    Unsanitized file values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_nested_files( $files, $uploads ) {
    if ( ! empty( $files ) ) {
      $sanitized_files = array();

      foreach ( $files as $file ) {
        $sanitized_file = array();

        if ( ! empty( $file['name'] ) ) {
          $sanitized_file['filename'] = sanitize_text_field( $file['filename'] );
          $sanitized_file['name']     = sanitize_text_field( $file['name'] );
          $sanitized_file['url']      = sanitize_text_field( $file['url'] );
        }

        // Check for updates to file in upload files.
        if ( ! empty( $uploads ) ) {
          foreach ( $uploads as $upload ) {
            if ( $upload['filename'] === $file['filename'] ) {
              $sanitized_file['filename'] = $upload['filename'];
              $sanitized_file['name']     = sanitize_text_field( $file['name'] );
              $sanitized_file['url']      = $upload['url'];
            }
          }

          unset( $upload );
        }

        array_push( $sanitized_files, $sanitized_file );
      }

      unset( $file );

      return $sanitized_files;
    }
  }
}
