<?php
/**
 * Registers the Sanitizer class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Sanitizes the values sent over in the AJAX request.
 *
 * Loads the correct sanitizer class given the form type submitted,
 * and uses that to sanitize the form inputs.
 *
 * @package Style_Blocks\Sanitizer
 * @since 0.0.1
 */
class Sanitizer {
  /**
   * Pull in and instantiate the proper sanitizer class for the form type submitted
   *
   * @param string $form_type     Name of form type being submitted.
   */
  public function load_sanitizer( $form_type ) {
    // Load in possible HTTP responses.
    include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( 'article-feed' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-article-feed-meta.php';
      $sanitize = new Sanitize_Article_Feed_Meta();

      return $sanitize;

    } elseif ( 'hero' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-hero-meta.php';
      $sanitize = new Sanitize_Hero_Meta();

      return $sanitize;
    } elseif ( 'navigation' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-navigation-meta.php';
      $sanitize = new Sanitize_Navigation_Meta();

      return $sanitize;

    } elseif ( 'parallax' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-parallax-meta.php';
      $sanitize = new Sanitize_Parallax_Meta();

      return $sanitize;

    } elseif ( 'quote-box' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();

      return $sanitize;

    } elseif ( 'resources' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-resources-meta.php';
      $sanitize = new Sanitize_Resources_Meta();

      return $sanitize;

    } elseif ( 'slides' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-slides-meta.php';
      $sanitize = new Sanitize_Slides_Meta();

      return $sanitize;

    } elseif ( 'stats' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-stats-meta.php';
      $sanitize = new Sanitize_Stats_Meta();

      return $sanitize;

    } elseif ( 'text' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-text-meta.php';
      $sanitize = new Sanitize_Text_Meta();

      return $sanitize;

    } elseif ( 'timeline' === $form_type ) {

      include_once STYLE_BLOCKS_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-timeline-meta.php';
      $sanitize = new Sanitize_Timeline_Meta();

      return $sanitize;

    } else {

      $send_response->send_custom_error( 'invalid_form_type' );

    }
  }

  /**
   * Sanitize the file name sent over in upload request.
   *
   * @param array $unsanitary     Unsanitized file objects.
   * @return array                Array of sanitized file data.
   */
  public function prep_uploads( $unsanitary ) {
    $sanitized_files = array();

    if ( ! empty( $unsanitary ) ) {

      foreach ( $unsanitary as $file ) {
        $sanitized_file = array();

        $sanitized_file['filename'] = sanitize_text_field( $file['filename'] );
        $sanitized_file['name']     = sanitize_text_field( $file['name'] );
        $sanitized_file['url']      = sanitize_text_field( $file['url'] );

        array_push( $sanitized_files, $sanitized_file );
      }

      unset( $file );
    }

    return $sanitized_files;
  }
}
