<?php

namespace Style_Templates;

class Sanitizer {
  /**
   * Pull in and instantiate the proper sanitizer class for the form type submitted
   *
   * @param   string $form_type     Name of form type being submitted.
   */
  public function load_sanitizer( $form_type ) {
    // Load in possible HTTP responses.
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( 'article-feed' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-article-feed-meta.php';
      $sanitize = new Sanitize_Article_Feed_Meta();

      return $sanitize;
    }

    elseif ( 'hero' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-hero-meta.php';
      $sanitize = new Sanitize_Hero_Meta();

      return $sanitize;
    } elseif ( 'hero-animated' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-hero-animated-meta.php';
      $sanitize = new Sanitize_HeroAnimated_Meta();

      return $sanitize;
    }

    elseif ( 'parallax' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-parallax-meta.php';
      $sanitize = new Sanitize_Parallax_Meta();

      return $sanitize;
    }

    elseif ( 'quote-box' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();

      return $sanitize;
    }

    elseif ( 'resources' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-resources-meta.php';
      $sanitize = new Sanitize_Resources_Meta();

      return $sanitize;
    }

    elseif ( 'slides' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-slides-meta.php';
      $sanitize = new Sanitize_Slides_Meta();

      return $sanitize;
    }

    elseif ( 'stats' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-stats-meta.php';
      $sanitize = new Sanitize_Stats_Meta();

      return $sanitize;
    }

    elseif ( 'text' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-text-meta.php';
      $sanitize = new Sanitize_Text_Meta();
      return $sanitize;
    }

    elseif ( 'timeline' === $form_type ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/sanitizers/class-sanitize-timeline-meta.php';
      $sanitize = new Sanitize_Timeline_Meta();

      return $sanitize;
    }

    else {
      $send_response->send_custom_error( 'invalid_form_type' );
    }
  }

  public function sanitize_files( $unsanitary ) {
    $sanitized_files = array();

    if ( ! empty( $unsanitary ) ) {

      foreach ( $unsanitary as $file ) {
        $sanitized_file = array();

        $sanitized_file['name'] = sanitize_text_field( $file['name'] );
        // URL comes from wp_handle_upload function and doesn't need to be sanitized.
        $sanitized_file['url'] = $file['url'];

        array_push( $sanitized_files, $sanitized_file );
      }

      unset( $file );
    }

    return $sanitized_files;
  }
}
