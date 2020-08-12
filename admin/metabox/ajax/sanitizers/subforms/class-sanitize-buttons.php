<?php
/**
 * Registers the Sanitize_Button class.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded button data and sanitize each field.
 *
 * Checks for and sanitizes the fields expected by the video form.
 *
 * @package Style_Blocks\Sanitizer
 * @since 2.0.0
 */
class Sanitize_Buttons {

  /**
   * Checks for and sanitizes the expected button fields.
   *
   * @param array $button   Unsanitized button values sent over in the AJAX request.
   * @return array          Array of sanitized values
   */
  public function sanitize_button( $button ) {
    $sanitized_button = array();

    $sanitized_button['buttonArrow']  = sanitize_text_field( $button['buttonArrow'] );
    $sanitized_button['buttonBorder'] = sanitize_text_field( $button['buttonBorder'] );
    $sanitized_button['buttonColor']  = sanitize_text_field( $button['buttonColor'] );
    $sanitized_button['buttonLink']   = sanitize_text_field( $button['buttonLink'] );
    $sanitized_button['buttonText']   = sanitize_text_field( $button['buttonText'] );
    $sanitized_button['id']           = sanitize_text_field( $button['id'] );

    return $sanitized_button;
  }

  /**
   * Checks for and sanitizes a group of buttons.
   *
   * @param array $buttons    Unsanitized button group sent over in the AJAX request.
   * @return array            Array of sanitized values
   */
  public function sanitize_buttons( $buttons ) {

    $sanitized_buttons = array();

    foreach ( $buttons as $button ) {
      $sanitized_button = $this->sanitize_button( $button );

      array_push( $sanitized_buttons, $sanitized_button );
    }

    unset( $button );

    return $sanitized_buttons;
  }
}
