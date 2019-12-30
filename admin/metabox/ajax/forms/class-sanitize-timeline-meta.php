<?php

namespace Style_Templates;

class Sanitize_Timeline_Meta {

  public function sanitize_inputs( $data ) {

    $unsanitary = json_decode( stripslashes( $data ), true );
    $sanitized = array();

    if( !empty( $unsanitary['title'] ) ) {
      $sanitized['title'] = sanitize_text_field( $unsanitary['title'] );
    }

    if( !empty( $unsanitary['events'] ) ) {
      $sanitized_events = array();

      foreach ( $unsanitary['events'] as $event ) {
        $sanitized_event = array();

        $sanitized_event['id'] = sanitize_text_field( $event['id'] );
        $sanitized_event['image'] = sanitize_text_field( $event['image'] );
        $sanitized_event['subtitle'] = sanitize_text_field( $event['subtitle'] );
        $sanitized_event['text'] = sanitize_text_field( $event['text'] );
        $sanitized_event['year'] = sanitize_text_field( $event['year'] );

        array_push( $sanitized_events, $sanitized_event );
      }

      unset($event);

      $sanitized['events'] = $sanitized_events;
    }

    if( !empty( $unsanitary['fullWidth'] ) ) {
      $sanitized['fullWidth'] = rest_sanitize_boolean( $unsanitary['fullWidth'] );
    }

    return $sanitized;
  }
}