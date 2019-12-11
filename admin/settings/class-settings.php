<?php

namespace Style_Templates;

class Settings {

  public function add_templates_settings_page() {
    add_options_page(
      __( 'GPA/LAB Style Templates', 'gpalab-templates' ),
      __( 'Style Templates', 'gpalab-templates' ),
      'activate_plugins',
      'gpalab-templates',
      array( $this, 'create_admin_page' )
    );
  }

  function create_admin_page() {
    // Set class property
    $this->options = get_option( 'gpalab-style-template-dev-mode' );
    ?>
    <div class="wrap">
      <h1> <?php __( 'GPA/LAB Style Templates', 'gpalab-templates' ) ?></h1>
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

  public function populate_template_settings() {
    register_setting(
      'gpalab-templates',
      'gpalab-style-template-dev-mode'
    );
    
    add_settings_section(
      'gpalab-templates',
      __('Set Plugin to Dev Mode?', 'gpalab-templates'),
      function() {
        echo __( 'This is not recommended. It will enqueue development builds of the plugin\'s scripts and styles and should only be used while actively developing the plugin.', 'gpalab-templates');
      },
      'gpalab-templates'
    );

    add_settings_field(
      'gpalab-dev-mode',
      __('Toggle Dev Mode', 'gpalab-templates' ),
      array( $this, 'dev_mode_toggle' ),
      'gpalab-templates',
      'gpalab-templates'
    ); 
  }

  function dev_mode_toggle() {
    $option = get_option( 'gpalab-style-template-dev-mode' );

    ?>
      <label for="gpalab-dev-mode-disabled">
        <?php echo __( 'Disabled', 'gpalab-templates' ); ?>
        <input
          id="gpalab-dev-mode-disabled"
          name="gpalab-style-template-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( 'gpalab-style-template-dev-mode' ) == 0 ? 'checked' : '';
            echo $disabled
          ?>
        />
      </label>
      <label for="gpalab-dev-mode-enabled">
        <?php echo __( 'Enabled', 'gpalab-templates' ); ?>
        <input
          id="gpalab-dev-mode-enabled"
          name="gpalab-style-template-dev-mode"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( 'gpalab-style-template-dev-mode' ) == 1 ? 'checked' : '';
            echo $enabled
          ?>
        />
      </label>
    <?php
  }
}