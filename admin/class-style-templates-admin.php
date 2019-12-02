<?php

namespace Style_Templates;

class Admin {

  // Register the styles for the admin
  public function register_template_admin_styles() {
    wp_register_style( 'gpalab-template-admin', STYLE_TEMPLATES_URL . 'dist/gpalab-template-admin.css', array(), null );
  }
}