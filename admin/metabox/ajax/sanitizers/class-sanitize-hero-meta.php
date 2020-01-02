<?php

namespace Style_Templates;

class Sanitize_Hero_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized  = array();

    if ( ! empty( $unsanitary['background'] ) ) {
      $sanitized['background'] = sanitize_text_field( $unsanitary['background'] );
    }

    if ( ! empty( $unsanitary['buttonArrow'] ) ) {
      $sanitized['buttonArrow'] = sanitize_text_field( $unsanitary['buttonArrow'] );
    }

    if ( ! empty( $unsanitary['buttonLink'] ) ) {
      $sanitized['buttonLink'] = sanitize_text_field( $unsanitary['buttonLink'] );
    }

    if ( ! empty( $unsanitary['buttonStyle'] ) ) {
      $sanitized['buttonStyle'] = sanitize_text_field( $unsanitary['buttonStyle'] );
    }

    if ( ! empty( $unsanitary['buttonText'] ) ) {
      $sanitized['buttonText'] = sanitize_text_field( $unsanitary['buttonText'] );
    }

    if ( ! empty( $unsanitary['description'] ) ) {
      $sanitized['description'] = sanitize_textarea_field( $unsanitary['description'] );
    }

    if ( ! empty( $unsanitary['hasButton'] ) ) {
      $sanitized['hasButton'] = rest_sanitize_boolean( $unsanitary['hasButton'] );
    }

    if ( ! empty( $unsanitary['lines'] ) ) {
      $sanitized_lines = array();

      foreach ( $unsanitary['lines'] as $line ) {
        $sanitized_line = array();

        $sanitized_line['id']   = sanitize_text_field( $line['id'] );
        $sanitized_line['text'] = sanitize_text_field( $line['text'] );

        array_push( $sanitized_lines, $sanitized_line );
      }

      unset( $line );

      $sanitized['lines'] = $sanitized_lines;
    }

    if ( ! empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }

    if ( ! empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if ( ! empty( $unsanitary['type'] ) ) {
      $sanitized['type'] = sanitize_text_field( $unsanitary['type'] );
    }

    return $sanitized;
  }
}
