<?php

namespace Style_Templates;

class Sanitizer {
  // Pull in and instantiate the proper sanitizer class for the form type submitted
  public function load_sanitizer( $form_type ) {
    // Load in possible HTTP responses
    include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/class-responses.php';
    $send_response = new Responses();

    if ( $form_type == 'article-feed' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-article-feed-meta.php';
      $sanitize = new Sanitize_Article_Feed_Meta();
      
      return $sanitize;
    }

    elseif ( $form_type == 'quote-box' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-quotebox-meta.php';
      $sanitize = new Sanitize_Quotebox_Meta();
      
      return $sanitize;
    }

    elseif ( $form_type == 'resources' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-resources-meta.php';
      $sanitize = new Sanitize_Resources_Meta();
      
      return $sanitize;
    }

    elseif ( $form_type == 'slides' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-slides-meta.php';
      $sanitize = new Sanitize_Slides_Meta();
      
      return $sanitize;
    }

    elseif ( $form_type == 'stats' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-stats-meta.php';
      $sanitize = new Sanitize_Stats_Meta();
      
      return $sanitize;
    }

    if ( $form_type == 'text' ) {
      include_once STYLE_TEMPLATES_DIR . 'admin/metabox/ajax/forms/class-sanitize-text-meta.php';
      $sanitize = new Sanitize_Text_Meta();
      
      return $sanitize;
    }

    else {
      $send_response->send_custom_error( 'invalid_form_type' );
    }
  }
}