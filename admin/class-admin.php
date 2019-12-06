<?php

namespace Style_Templates;

class Admin {

  // Register the scripts and styles for the admin interface
  public function register_admin_scripts_styles() {

    wp_register_script( 'gpalab-template-admin-js', STYLE_TEMPLATES_DIST . 'gpalab-template-admin.js', array(), null, true );
    
    wp_register_style( 'gpalab-template-admin-css', STYLE_TEMPLATES_DIST . 'gpalab-template-admin.css', array(), null );
  }

  // Pass required PHP values as variables to admin JS
  public function localize_admin_script_globals() {

    wp_localize_script( 'gpalab-template-admin-js', 'gpalabTemplateAdmin', array(
      'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
      'parentPost'    => get_the_ID(),
      'templateNonce' => wp_create_nonce('gpalab-template-nonce')
    ) );
  }
}