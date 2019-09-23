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
   * Load the required dependencies for this plugin.
   *
   * Include the following files that make up the plugin:
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
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-style-templates-loader.php';

    // The class responsible for defining all actions that occur in the admin area.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-style-templates-admin.php';

    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/block-registration/class-animated.php';

    // The class responsible for defining all actions that occur in the public-facing side of the site.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-style-templates-public.php';
  
    $this->loader = new Style_Templates\Loader();
  }

  // Register all of the hooks related to the admin area functionality of the plugin.
  private function define_admin_hooks() {
    $plugin_admin = new Style_Templates\Admin( $this->get_plugin_name(), $this->get_version() );

    // Admin hooks
    // $this->loader->add_action( 'INSERT_WP_HOOK', $plugin_admin, 'INSERT_CALLBACK' );

    // Animated blocks
    $plugin_animated = new Style_Templates\Animated( $this->get_plugin_name(), $this->get_version() );

    $this->loader->add_action( 'init', $plugin_animated, 'register_animated_blocks' );
    $this->loader->add_filter( 'block_categories', $plugin_animated, 'register_animated_block_category', 10, 2 );
  }

  // Register all of the hooks related to the public-facing functionality
  private function define_public_hooks() {
    $plugin_frontend = new Style_Templates\Frontend( $this->get_plugin_name(), $this->get_version() );

    // Frontend hooks
    $this->loader->add_action( 'INSERT_WP_HOOK', $plugin_frontend, 'INSERT_CALLBACK' );
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
