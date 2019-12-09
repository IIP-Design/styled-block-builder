<?php

namespace Style_Templates;

class Sanitize_Stats_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['background'] ) ) {
      $sanitized['background'] = sanitize_text_field( $unsanitary['background'] );
    }

    if( !empty( $unsanitary['statOneNumber'] ) ) {
      $sanitized['statOneNumber'] = sanitize_textarea_field( $unsanitary['statOneNumber'] );
    }

    if( !empty( $unsanitary['statOneText'] ) ) {
      $sanitized['statOneText'] = sanitize_textarea_field( $unsanitary['statOneText'] );
    }

    if( !empty( $unsanitary['statTwoNumber'] ) ) {
      $sanitized['statTwoNumber'] = sanitize_textarea_field( $unsanitary['statTwoNumber'] );
    }

    if( !empty( $unsanitary['statTwoText'] ) ) {
      $sanitized['statTwoText'] = sanitize_textarea_field( $unsanitary['statTwoText'] );
    }

    if( !empty( $unsanitary['statThreeNumber'] ) ) {
      $sanitized['statThreeNumber'] = sanitize_textarea_field( $unsanitary['statThreeNumber'] );
    }

    if( !empty( $unsanitary['statThreeText'] ) ) {
      $sanitized['statThreeText'] = sanitize_textarea_field( $unsanitary['statThreeText'] );
    }

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_textarea_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}