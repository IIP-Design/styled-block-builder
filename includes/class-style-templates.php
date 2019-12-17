<?php

class Style_Templates {

  /**
   * The loader that's responsible for maintaining and registering all hooks that power the plugin.
   *
   * @since    0.0.1
   * @access   protected
   * @var      Style_Templates_Loader    $loader    Maintains and registers all hooks for the plugin.
   */

  protected $loader;

  /**
   * The unique identifier and version of this plugin.
   *
   * @since    0.0.1
   * @access   protected
   */

  protected $plugin_name;
  protected $version;

  /**
   * Define the core functionality of the plugin.
   *
   * Set the plugin name and the plugin version that can be used throughout the plugin.
   * Load the dependencies and set the hooks for the admin area and
   * the public-facing side of the site.
   *
   * @since    0.0.1
   */

  public function __construct() {
    $this->plugin_name = 'style-templates';
    $this->version = '0.0.1';
    $this->load_dependencies();
    $this->define_admin_hooks();
    $this->define_public_hooks();
  }

  /**
   * Loads the classes needed to run this plugin.
   *
   * Includes the following files that make up the plugin:
   *
   * - Style_Templates\Loader. Orchestrates the hooks of the plugin.
   * - Style_Templates\Admin. Defines all hooks for the admin area.
   * - Style_Templates\Frontend. Defines all hooks for the public side of the site.
   *
   * Create an instance of the loader which will be used to register the hooks with WordPress.
   *
   * @since    0.0.1
   * @access   private
   */

  private function load_dependencies() {
    // The class responsible for orchestrating the actions and filters of the core plugin.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-loader.php';

    // The class responsible for defining all actions that occur in the admin area.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-admin.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/api/class-api.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/metabox/class-metabox.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/metabox/ajax/class-update-template.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/settings/class-settings.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/shortcode/class-shortcode.php';

    // require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/gut-blocks/highlight/class-gut-highlight.php';

    // The class responsible for defining all actions that occur in the public-facing side of the site.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-public.php';
  
    $this->loader = new Style_Templates\Loader();
  }

  // Register all of the hooks related to the admin area functionality of the plugin.
  private function define_admin_hooks() {
    // Instantiate all admin classes
    $plugin_admin = new Style_Templates\Admin( $this->get_plugin_name(), $this->get_version() );
    $plugin_ajax = new Style_Templates\Update_Template( $this->get_plugin_name(), $this->get_version() );
    $plugin_api = new Style_Templates\API( $this->get_plugin_name(), $this->get_version() );
    $plugin_metabox = new Style_Templates\Metabox( $this->get_plugin_name(), $this->get_version() );
    $plugin_settings = new Style_Templates\Settings( $this->get_plugin_name(), $this->get_version() );
    $plugin_shortcode = new Style_Templates\Shortcode( $this->get_plugin_name(), $this->get_version() );
    
    // Admin hooks
    $this->loader->add_action( 'init', $plugin_admin, 'register_admin_scripts_styles' );
    $this->loader->add_action( 'admin_notices', $plugin_admin, 'localize_admin_script_globals' );
    
    // WP API hooks
    $this->loader->add_action( 'rest_api_init', $plugin_api, 'register_associated_templates_meta' ); 

    // Animated blocks
    // $plugin_animated = new Style_Templates\Animated( $this->get_plugin_name(), $this->get_version() );
    // $this->loader->add_action( 'init', $plugin_animated, 'register_animated_blocks' );
    // $this->loader->add_filter( 'block_categories', $plugin_animated, 'register_animated_block_category', 10, 2 );

    // Ajax
    $this->loader->add_action( 'wp_ajax_gpalab_update_template', $plugin_ajax, 'handle_template_update' );
    $this->loader->add_action( 'wp_ajax_gpalab_delete_template', $plugin_ajax, 'handle_template_deletion' );
    // Custom Metabox
    $this->loader->add_action( 'add_meta_boxes', $plugin_metabox, 'add_templates_metabox' );
    // Settings
    $this->loader->add_action( 'admin_menu', $plugin_settings, 'add_templates_settings_page' );
    $this->loader->add_action( 'admin_init', $plugin_settings, 'populate_template_settings' );
    // Shortcode
    $this->loader->add_action( 'init', $plugin_shortcode, 'add_templates_shortcode' );
  }

  // Register all of the hooks related to the public-facing functionality
  private function define_public_hooks() {
    $plugin_frontend = new Style_Templates\Frontend( $this->get_plugin_name(), $this->get_version() );

    // Frontend hooks
    $this->loader->add_action( 'init', $plugin_frontend, 'register_template_scripts_styles' );
  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since    0.0.1
   */

  public function run() {
    $this->loader->run();
  }

  /**
   * The reference to the class that orchestrates the hooks with the plugin.
   *
   * @since     0.0.1
   * @return    Style_Templates_Loader    Orchestrates the hooks of the plugin.
   */

  public function get_loader() {
    return $this->loader;
  }

  // Retrieve the name & version number of the plugin.
  public function get_plugin_name() {
    return $this->plugin_name;
  }

  public function get_version() {
    return $this->version;
  }
}
