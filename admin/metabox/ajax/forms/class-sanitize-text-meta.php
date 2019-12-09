<?php

namespace Style_Templates;

class Sanitize_Text_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['button'] ) ) {
      $sanitized['button'] = sanitize_text_field( $unsanitary['button'] );
    }

    if( !empty( $unsanitary['color'] ) ) {
      $sanitized['color'] = sanitize_textarea_field( $unsanitary['color'] );
    }

    if( !empty( $unsanitary['desc'] ) ) {
      $sanitized['desc'] = sanitize_textarea_field( $unsanitary['desc'] );
    }

    if( !empty( $unsanitary['link'] ) ) {
      $sanitized['link'] = sanitize_textarea_field( $unsanitary['link'] );
    }

    if( !empty( $unsanitary['style'] ) ) {
      $sanitized['style'] = sanitize_textarea_field( $unsanitary['style'] );
    }

    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_textarea_field( $unsanitary['subtitle'] );
    }

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_textarea_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}