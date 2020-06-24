<?php
/**
 * Registers the Sanitize_Files class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded files and compare.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitize_Files {

  /**
   * Checks for and sanitizes the expected fields.
   *
   * @param array $files    Unsanitized file values sent over in the AJAX request.
   * @param array $uploads  Sanitized values provided from as a result of file upload.
   * @return array          Array of sanitized values
   */
  public function sanitize_files( $files, $uploads ) {

    if ( ! empty( $files ) ) {
      $sanitized_files = array();

      foreach ( $files as $file ) {
        $sanitized_file = array();

        if ( ! empty( $file['name'] ) ) {
          $url = $file['file']['url'] ? $file['file']['url'] : $file['url'];

          $sanitized_file['filename'] = sanitize_text_field( $file['filename'] );
          $sanitized_file['name']     = sanitize_text_field( $file['name'] );
          $sanitized_file['url']      = esc_url_raw( $url );
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
