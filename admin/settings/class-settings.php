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
    ?>
    <div class="wrap">
      <h1><?php esc_html_e( 'GPA/LAB Styled Blocks', 'gpalab-blocks' ); ?></h1>
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
   * Adds a link to the plugin's settings page on the Installed Plugins page.
   *
   * @param array $links   List of plugin action links.
   * @param array          List of plugin action links with added settings link.
   */
  public function add_settings_link( $links ) {
    // Build and escape the settings page URL.
    $url = esc_url( add_query_arg(
      'page',
      'gpalab-blocks',
      get_admin_url() . 'admin.php'
    ) );

    // Write the link HTML.
    $settings_link = "<a href='$url'>" . __( 'Settings', 'gpalab-blocks' ) . '</a>';

    // Add the Settings link to the beginning of the plugins list of action links.
    array_unshift(
      $links,
      $settings_link
    );

    return $links;
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
      'gpalab-blocks-role'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-styling'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-feed-sources'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-brightcove'
    );

    register_setting(
      'gpalab-blocks',
      'gpalab-blocks-dev-mode'
    );

    /**
     * Add article feed source section
     */
    add_settings_section(
      'gpalab-role',
      __( 'Select users who can add styled blocks:', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This setting determines which users will be able to see the styled blocks custom metabox when editing a page or post.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-role',
      __( 'Choose role:', 'gpalab-blocks' ),
      function() {
        include_once STYLE_BLOCKS_DIR . 'admin/settings/templates/class-settings-inputs.php';
        $inputs = new Settings_Inputs();

        /**
         * The current default values include the 'state_options' capability which is used to identify the
         * custom role Editor/Manager. It should be removed in favor of the below default value when integration
         * with the User Role Editor plugin is added.
         *
         * $default = array( 'manage_options', 'edit_private_pages', 'publish_posts', 'edit_posts' );
         */

        $default = array( 'manage_options', 'state_options', 'edit_private_pages', 'publish_posts', 'edit_posts' );

        if ( is_multisite() ) {
          array_unshift( $default, 'manage_sites' );
        };

        return $inputs->select( 'role', $default, 'role' );
      },
      'gpalab-blocks',
      'gpalab-role'
    );

    /**
     * Add custom styling section
     */
    add_settings_section(
      'gpalab-styling',
      __( 'Set styling to match that of state.gov?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This setting will apply the font styles used by state.gov to all block heading elements. If left disabled, blocks will inherit the base heading styles on the site.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-styling',
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
     * Add article feed source section
     */
    add_settings_section(
      'gpalab-feed-sources',
      __( 'Select sources enabled in the article feed block:', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This setting determines which sources will be made available to the article feed block. Note that if no source is selected, the article feed widget will be disabled.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-feed-sources',
      __( 'Choose source(s):', 'gpalab-blocks' ),
      function() {
        include_once STYLE_BLOCKS_DIR . 'admin/settings/templates/class-settings-inputs.php';
        $inputs = new Settings_Inputs();

        /*
         * TODO: add support for posts, pages, and custom post types.
         * Below is the initial scaffolding to put this in place.
         */
        $custom  = $this->get_custom_post_types();
        $default = array( 'share', 'yali', 'ylai' );
        $merged  = ! empty( $custom ) ? array_merge( $default, $custom ) : $default;

        return $inputs->select( 'feed-sources', $default, 'feed', true );
      },
      'gpalab-blocks',
      'gpalab-feed-sources'
    );

    /**
     * Add Brightcove account override
     */
    add_settings_section(
      'gpalab-brightcove',
      __( 'Set styling to match that of state.gov?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'This plugin looks for the default Brightcove account ID set by the Brightcove Video Connect plugin. If no default account ID is found, it will disable Brightcove video embeds in the styled blocks. Use this setting to set the Brightcove account ID if not using Brightcove Video Connect or to override the default Brightcove account.', 'gpalab-blocks' );
      },
      'gpalab-blocks'
    );

    add_settings_field(
      'gpalab-styling',
      __( 'Add Brightcove account id:', 'gpalab-blocks' ),
      function() {
        include_once STYLE_BLOCKS_DIR . 'admin/settings/templates/class-settings-inputs.php';
        $inputs = new Settings_Inputs();

        return $inputs->text_input( 'brightcove' );
      },
      'gpalab-blocks',
      'gpalab-brightcove'
    );

    /**
     * Add dev-mode section
     */
    add_settings_section(
      'gpalab-dev-mode',
      __( 'Set the plugin to dev-mode?', 'gpalab-blocks' ),
      function() {
        esc_html_e( 'WARNING: This setting is not recommended. It will enqueue development builds of the plugin\'s scripts and styles and should only be used while actively developing the plugin.', 'gpalab-blocks' );
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
      'gpalab-dev-mode'
    );
  }

  /**
   * Returns a list of custom post types registered to the site.
   *
   * @return array List of custom post type names
   */
  private function get_custom_post_types() {
    $args = array(
      'public'       => true,
      'show_in_rest' => true,
      '_builtin'     => false,
    );

    $post_types = get_post_types( $args, 'names', 'and' );

    return $post_types;
  }
}
