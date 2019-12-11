<?php

namespace Style_Templates;

class Admin {

  // Register the scripts and styles for the admin interface
  public function register_admin_scripts_styles() {
    
    // Check whether in dev mode and if so load dev builds 
    $dev_mode = get_option( 'gpalab-style-template-dev-mode' );
    
    $scripts = $dev_mode == 1 ? 'dev-template-admin.js' : 'gpalab-template-admin.js';
    $styles = $dev_mode == 1 ? 'dev-template-admin.css' : 'gpalab-template-admin.css';

    wp_register_script( 'gpalab-template-admin-js', STYLE_TEMPLATES_DIST . $scripts, array(), null, true );
    
    wp_register_style( 'gpalab-template-admin-css', STYLE_TEMPLATES_DIST . $styles, array(), null );
  }

  // Pass required PHP values as variables to admin JS
  public function localize_admin_script_globals() {
    $current_post = get_the_ID();

    $associated = get_post_meta( $current_post, '_gpalab_associated_templates', true );

    $assoc_data = array();

    if ( !empty( $associated) ) {
      foreach ( $associated as $id ) {
        $assoc = array();
        $assoc['id'] = $id;
        $assoc['meta'] = get_post_meta( $id, '_gpalab_template_meta', true );
        $assoc['title'] = get_the_title( $id );
        $assoc['type'] = get_post_type( $id );

        $assoc_data[] = $assoc;
      }
    }

    wp_localize_script( 'gpalab-template-admin-js', 'gpalabTemplateAdmin', array(
      'ajaxUrl'       => admin_url( 'admin-ajax.php' ),
      'associated'    => $assoc_data,
      'parentPost'    => $current_post,
      'templateNonce' => wp_create_nonce('gpalab-template-nonce')
    ) );
  }
}