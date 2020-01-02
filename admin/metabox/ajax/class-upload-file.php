<?php

namespace Style_Templates;

class Uploader {

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

  function handle_upload( $files ) {
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
