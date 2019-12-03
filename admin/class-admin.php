<?php

namespace Style_Templates;

class Admin {

  // Register the styles for the admin
  public function register_admin_scripts_styles() {
    wp_register_script( 'gpalab-template-admin-js', STYLE_TEMPLATES_URL . 'dist/gpalab-template-admin.js', array(), null, true );
    
    wp_register_style( 'gpalab-template-admin-css', STYLE_TEMPLATES_URL . 'dist/gpalab-template-admin.css', array(), null );
  }
}