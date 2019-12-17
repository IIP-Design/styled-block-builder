<?php

namespace Style_Templates;

class Sanitize_HeroAnimated_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['lines'] ) ) {
      $sanitized_lines = array();

      foreach ( $unsanitary['lines'] as $line ) {
        $sanitized_line = sanitize_text_field( $line['line'] );
        

        array_push( $sanitized_lines, $sanitized_line );
      }

      unset($line);

      $sanitized['lines'] =  $sanitized_lines;
    }

    if( !empty( $unsanitary['background'] ) ) {
      $sanitized['background'] = sanitize_text_field( $unsanitary['background'] );
    }
    
    if( !empty( $unsanitary['subtitle'] ) ) {
      $sanitized['subtitle'] = sanitize_text_field( $unsanitary['subtitle'] );
    }
    
    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    return $sanitized;
  }
}
