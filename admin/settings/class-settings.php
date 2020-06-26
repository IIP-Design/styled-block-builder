<?php
/**
 * Registers the Settings class.
 *
 * @package Style_Blocks\Settings
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Add plugin settings.
 *
 * The Settings class adds a settings page allowing site admins to configure the plugin.
 *
 * @package Style_Blocks\Settings
 * @since 0.0.1
 */
class Settings {

  /**
   * Create a settings page for the plugin.
   */
  public function add_blocks_settings_page() {
    add_options_page(
      __( 'GPA/LAB Styled Blocks', 'gpalab-blocks' ),
      __( 'Styled Blocks', 'gpalab-blocks' ),
      'activate_plugins',
      'gpalab-blocks',
      function() {
        return $this->create_admin_page();
      }
    );
  }

  /**
   * Define the contents of the settings page.
   */
  private function create_admin_page() {
    // Set class property.
    $this->options = get_option( 'gpalab-blocks-dev-mode', 'gpalab-styling-dev-mode' );
    ?>
    <div class="wrap">
      <h1> <?php __( 'GPA/LAB Styled Blocks', 'gpalab-blocks' ); ?></h1>
      <form method="post" action="options.php">
      <?php
        settings_fields( 'gpalab-blocks' );
        do_settings_sections( 'gpalab-blocks' );
        submit_button();
      ?>
      </form>
    </div>
    <?php
  }

  /**
   * Register the plugin settings and add to the settings page.
   */
  public function populate_blocks_settings() {
    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-dev-mode'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-styling-dev-mode'
    );

    add_settings_section(
      'gpalab-blocks',
      __( 'Set Plugin to Dev Mode?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This is not recommended. It will enqueue development builds of the plugin\'s scripts and styles and should only be used while actively developing the plugin.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-dev-mode',
      __( 'Toggle Dev Mode', 'gpalab-blocks' ),
      function() {
        return $this->dev_mode_toggle();
      },
      'gpalab-blocks',
      'gpalab-blocks'
    );

    add_settings_section(
      'gpalab-styling',
      __( 'Set styling to State.gov specific?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This will set Heading elements to State.gov specific styling.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-styling-mode',
      __( 'Toggle State.gov Styling', 'gpalab-blocks' ),
      function() {
        return $this->styling_toggle();
      },
      'gpalab-blocks',
      'gpalab-styling'
    );
   
  }

  /**
   * Provide option to toggle development mode for the plugin.
   */
  private function dev_mode_toggle() {
    $option = get_option( 'gpalab-blocks-dev-mode' );

    ?>
      <label for="gpalab-dev-mode-disabled">
        <?php esc_html_e( 'Disabled', 'gpalab-blocks' ); ?>
        <input
          id="gpalab-dev-mode-disabled"
          name="gpalab-blocks-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( 'gpalab-blocks-dev-mode' ) === '0' ? 'checked' : '';
            echo esc_html( $disabled );
          ?>
        />
      </label>
      <label for="gpalab-dev-mode-enabled">
        <?php esc_html_e( 'Enabled', 'gpalab-blocks' ); ?>
        <input
          id="gpalab-dev-mode-enabled"
          name="gpalab-blocks-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( 'gpalab-blocks-dev-mode' ) === '1' ? 'checked' : '';
            echo esc_html( $enabled );
          ?>
        />
      </label>
    <?php
  }

  private function styling_toggle() {
    $option = get_option( 'gpalab-styling-dev-mode' );

    ?>
      <label for="styling-disabled">
        <?php esc_html_e( 'Disabled', 'gpalab-blocks' ); ?>
        <input
          id="gpalab-styling-disabled"
          name="gpalab-styling-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( 'gpalab-styling-dev-mode' ) === '0' ? 'checked' : '';
            echo esc_html( $disabled );
          ?>
        />
      </label>
      <label for="gpalab-styling-enabled">
        <?php esc_html_e( 'Enabled', 'gpalab-blocks' ); ?>
        <input
          id="gpalab-styling-enabled"
          name="gpalab-styling-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( 'gpalab-styling-dev-mode' ) === '1' ? 'checked' : '';
            echo esc_html( $enabled );
          ?>
        />
      </label>
    <?php
  }
}
