<?php
/**
 * Registers the Setting_Inputs class.
 *
 * @package Style_Blocks\Setting_Inputs
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded files and compare.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Blocks\Setting_Inputs
 * @since 2.0.0
 */
class Settings_Inputs {
  /**
   * Return an radio toggle to enabled/disabled an option
   * Expects the option to follow the naming convention 'gpalab-blocks-property'
   *
   * @param string $property The name of the given option without the gpalab-blocks-' prefix.
   */
  public function radio_toggle( $property ) {
    $id_disabled = 'gpalab-' . $property . '-disabled';
    $id_enabled  = 'gpalab-' . $property . '-enabled';
    $option      = 'gpalab-blocks-' . $property;

    ?>
      <label for="<?php echo esc_html( $id_disabled ); ?>">
        <?php esc_html_e( 'Disabled', 'gpalab-blocks' ); ?>
        <input
          id="<?php echo esc_html( $id_disabled ); ?>"
          name="<?php echo esc_html( $option ); ?>"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( $option ) === '0' ? 'checked' : '';
            echo esc_html( $disabled );
          ?>
        />
      </label>
      <label for="<?php echo esc_html( $id_enabled ); ?>">
        <?php esc_html_e( 'Enabled', 'gpalab-blocks' ); ?>
        <input
          id="<?php echo esc_html( $id_enabled ); ?>"
          name="<?php echo esc_html( $option ); ?>"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( $option ) === '1' ? 'checked' : '';
            echo esc_html( $enabled );
          ?>
        />
      </label>
    <?php
  }
}
