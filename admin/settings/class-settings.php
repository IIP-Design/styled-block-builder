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
    $this->options = get_option( 'gpalab-blocks-dev-mode' );
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
    /**
     * Register settings
     */
    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-styling'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-dev-mode'
    );

    /**
     * Add custom styling section
     */
    add_settings_section(
      'gpalab-styling',
      __( 'Set styling to match that of state.gov?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This will apply the font styles used by state.gov to all block heading elements. If left disabled, blocks will inherit the base heading styles on the site.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-styling-mode',
      __( 'Toggle state.gov styling:', 'gpalab-blocks' ),
      function() {
        include_once STYLE_BLOCKS_DIR . 'admin/settings/templates/class-settings-inputs.php';
        $inputs = new Settings_Inputs();

        return $inputs->radio_toggle( 'styling' );
      },
      'gpalab-blocks',
      'gpalab-styling'
    );

    /**
     * Add dev-mode section
     */
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
      __( 'Toggle dev-mode:', 'gpalab-blocks' ),
      function() {
        include_once STYLE_BLOCKS_DIR . 'admin/settings/templates/class-settings-inputs.php';
        $inputs = new Settings_Inputs();

        return $inputs->radio_toggle( 'dev-mode' );
      },
      'gpalab-blocks',
      'gpalab-blocks'
    );
  }
}
