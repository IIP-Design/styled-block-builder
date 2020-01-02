<?php
/**
 * Registers the Settings class.
 *
 * @package Style_Templates\Settings
 * @since 0.0.1
 */

namespace Style_Templates;

/**
 * Add plugin settings.
 *
 * The Settings class adds a settings page allowing site admins to configure the plugin.
 *
 * @package Style_Templates\Settings
 * @since 0.0.1
 */
class Settings {

  /**
   * Create a settings page for the plugin.
   */
  public function add_templates_settings_page() {
    add_options_page(
      __( 'GPA/LAB Style Templates', 'gpalab-templates' ),
      __( 'Style Templates', 'gpalab-templates' ),
      'activate_plugins',
      'gpalab-templates',
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
    $this->options = get_option( 'gpalab-style-template-dev-mode' );
    ?>
    <div class="wrap">
      <h1> <?php __( 'GPA/LAB Style Templates', 'gpalab-templates' ); ?></h1>
      <form method="post" action="options.php">
      <?php
        settings_fields( 'gpalab-templates' );
        do_settings_sections( 'gpalab-templates' );
        submit_button();
      ?>
      </form>
    </div>
    <?php
  }

  /**
   * Register the plugin settings and add to the settings page.
   */
  public function populate_template_settings() {
    register_setting(
      'gpalab-templates',
      'gpalab-style-template-dev-mode'
    );

    add_settings_section(
      'gpalab-templates',
      __( 'Set Plugin to Dev Mode?', 'gpalab-templates' ),
      function() {
        esc_html_e( 'This is not recommended. It will enqueue development builds of the plugin\'s scripts and styles and should only be used while actively developing the plugin.', 'gpalab-templates' );
      },
      'gpalab-templates'
    );

    add_settings_field(
      'gpalab-dev-mode',
      __( 'Toggle Dev Mode', 'gpalab-templates' ),
      function() {
        return $this->dev_mode_toggle();
      },
      'gpalab-templates',
      'gpalab-templates'
    );
  }

  /**
   * Provide option to toggle development mode for the plugin.
   */
  private function dev_mode_toggle() {
    $option = get_option( 'gpalab-style-template-dev-mode' );

    ?>
      <label for="gpalab-dev-mode-disabled">
        <?php esc_html_e( 'Disabled', 'gpalab-templates' ); ?>
        <input
          id="gpalab-dev-mode-disabled"
          name="gpalab-style-template-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( 'gpalab-style-template-dev-mode' ) === '0' ? 'checked' : '';
            echo esc_html( $disabled );
          ?>
        />
      </label>
      <label for="gpalab-dev-mode-enabled">
        <?php esc_html_e( 'Enabled', 'gpalab-templates' ); ?>
        <input
          id="gpalab-dev-mode-enabled"
          name="gpalab-style-template-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( 'gpalab-style-template-dev-mode' ) === '1' ? 'checked' : '';
            echo esc_html( $enabled );
          ?>
        />
      </label>
    <?php
  }
}
