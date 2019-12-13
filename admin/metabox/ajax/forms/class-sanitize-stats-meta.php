<?php

namespace Style_Templates;

class Sanitize_Stats_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['background'] ) ) {
      $sanitized['background'] = sanitize_text_field( $unsanitary['background'] );
    }

    if( !empty( $unsanitary['stats'] ) ) {
      $sanitized_stats = array();

      foreach ( $unsanitary['stats'] as $stat ) {
        $sanitized_stat = array();

        $sanitized_stat['id'] = sanitize_text_field( $stat['id'] );
        $sanitized_stat['number'] = sanitize_text_field( $stat['number'] );
        $sanitized_stat['title'] = sanitize_text_field( $stat['title'] );

        array_push( $sanitized_stats, $sanitized_stat );
      }

      unset($stat);

      $sanitized['stats'] =  $sanitized_stats;
    }

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}