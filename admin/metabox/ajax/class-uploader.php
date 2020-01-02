<?php
/**
 * Registers the Uploader class.
 *
 * @package Style_Templates\Uploader
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Handles files submitted along with the style template form.
 *
 * Accepts files sent by the AJAX request from the style templates metabox,
 * confirms that these files are expected and if so, adds them to the WordPress media library.
 *
 * @package Style_Templates\Update_Template
 * @since 0.0.1
 */
class Uploader {

  /**
   * Checks the submitted file against expected files for the submitted form type.
   * Then, if appropriate initiates a file upload.
   *
   * @param array  $files    File objects submitted by the AJAX request.
   * @param string $type     Name of form type submitted.
   */
  public function initiate_upload( $files, $type ) {
    // Initialize an array of files for upload.
    $for_upload = array();

    // Check for the correct files based on block type.
    if ( 'quote-box' === $type ) {
      if ( isset( $files['backgroundImage'] ) ) {
        $file = array(
          'name' => 'backgroundImage',
          'file' => $files['backgroundImage'],
        );

        array_push( $for_upload, $file );
      }
    }

    if ( 'stats' === $type ) {
      if ( isset( $files['backgroundImage'] ) ) {
        $file = array(
          'name' => 'backgroundImage',
          'file' => $files['backgroundImage'],
        );

        array_push( $for_upload, $file );
      }
    }

    $response = $this->handle_upload( $for_upload );

    return $response;
  }

  /**
   * Uploads the file to the WordPress media library.
   *
   * @param array $files    File objects submitted by the AJAX request.
   */
  private function handle_upload( $files ) {
    // Make sure the WP upload function is available.
    if ( ! function_exists( 'wp_handle_upload' ) ) {
      require_once ABSPATH . 'wp-admin/includes/file.php';
    }

    // Initialize an array for the response values.
    $response = array();

    foreach ( $files as $file ) {
      // Ensure that file is coming from a valid AJAX request.
      $overrides = array( 'action' => 'gpalab_update_template' );

      // Upload file.
      $new_file = wp_handle_upload( $file['file'], $overrides );

      if ( $new_file && ! isset( $new_file['error'] ) ) {
        $file_data = array(
          'name' => $file['name'],
          'url'  => $new_file['url'],
        );

        array_push( $response, $file_data );
      } else {
        echo $new_file['error'];
      }
    }

    unset( $file );

    return $response;
  }
}
