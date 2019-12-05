<?php

namespace Style_Templates;

class Sanitize_Quotebox_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = stripslashes( sanitize_text_field( $unsanitary['title'] ) );
    }

    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = stripslashes( sanitize_textarea_field( $unsanitary['subtitle'] ) );
    }

    if( !empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = stripslashes( sanitize_textarea_field( $unsanitary['desc'] ) );
    }

    if( !empty( $unsanitary['quote'] ) ) {
      $sanitized['quote'] = stripslashes( sanitize_textarea_field( $unsanitary['quote'] ) );
    }

    if( !empty( $unsanitary['speaker'] ) ) {
      $sanitized['speaker'] = stripslashes( sanitize_textarea_field( $unsanitary['speaker'] ) );
    }

    return $sanitized;
  }
}