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
    if ( 'hero' === $type ) {
      $background = $this->background_image( $files );

      if ( ! empty( $background ) ) {
        array_push( $for_upload, $background );
      };
    }

    if ( 'parallax' === $type ) {
      $background = $this->background_image( $files );

      if ( ! empty( $background ) ) {
        array_push( $for_upload, $background );
      };
    }

    if ( 'quote-box' === $type ) {
      $background = $this->background_image( $files );

      if ( ! empty( $background ) ) {
        array_push( $for_upload, $background );
      };
    }

    if ( 'slides' === $type ) {
      $background = $this->background_images( $files );

      if ( ! empty( $background ) ) {
        foreach ( $background as $bg ) {
          $file['file'] = $bg;
          $file['name'] = $bg['backgroundImage'];

          array_push( $for_upload, $file );
        }

        unset( $bg );
      };
    }

    if ( 'stats' === $type ) {
      $background = $this->background_image( $files );

      if ( ! empty( $background ) ) {
        array_push( $for_upload, $background );
      };
    }

    $response = $this->handle_upload( $for_upload );

    return $response;
  }

  /**
   * Uploads the file to the WordPress media library.
   *
   * @param array $files          File objects submitted by the AJAX request.
   * @return array $for_upload    File data array.
   */
  private function background_image( $files ) {
    if ( isset( $files['backgroundImage'] ) ) {
      $file = array(
        'name' => 'backgroundImage',
        'file' => $files['backgroundImage'],
      );

      return $file;
    }
  }

  /**
   * Uploads multiple background image files for nested forms to the WordPress media library.
   *
   * @param array $files          File objects submitted by the AJAX request.
   * @return array $for_upload    File data array.
   */
  private function background_images( $files ) {
    if ( ! empty( $files['backgroundImage'] ) ) {
      $number = count( $files['backgroundImage']['name'] );

      $background_images = array();

      for ( $i = 0; $i < $number; $i++ ) {
        $background_image = array();

        $background_image['name']     = $files['backgroundImage']['name'][ $i ];
        $background_image['error']    = $files['backgroundImage']['error'][ $i ];
        $background_image['size']     = $files['backgroundImage']['size'][ $i ];
        $background_image['tmp_name'] = $files['backgroundImage']['tmp_name'][ $i ];
        $background_image['type']     = $files['backgroundImage']['type'][ $i ];

        array_push( $background_images, $background_image );
      }

      return $background_images;
    }
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
          'filename' => $file['file']['name'],
          'name'     => $file['name'],
          'url'      => $new_file['url'],
        );

        array_push( $response, $file_data );
      } else {
        $data['message'] = $new_file['error'];
        wp_send_json_error( $data );
      }
    }

    unset( $file );

    return $response;
  }
}
