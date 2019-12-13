<?php

namespace Style_Templates;

class Sanitize_Slides_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if( !empty( $unsanitary['slides'] ) ) {
      $sanitized_slides = array();

      foreach ( $unsanitary['slides'] as $slide ) {
        $sanitized_slide = array();

        $sanitized_slide['subtitle'] = sanitize_text_field( $slide['subtitle'] );
        $sanitized_slide['background'] = sanitize_text_field( $slide['background'] );
        $sanitized_slide['text'] = sanitize_textarea_field( $slide['text'] );

        array_push( $sanitized_slides, $sanitized_slide );
      }

      unset($slide);

      $sanitized['slides'] =  $sanitized_slides;
    }

    return $sanitized;
  }
}