<?php
/**
 * Registers the Uninstall class.
 *
 * @package Style_Blocks/Uninstall
 * @since 3.0.0
 */

namespace Style_Blocks;

/**
 * Register all hooks to be run when the plugin is uninstalled.
 *
 * @package Style_Blocks/Uninstall
 * @since 3.0.0
 */
class Uninstall {

  /**
   * Run cleanup to delete plugin data upon uninstall.
   *
   * @since 3.0.0
   */
  public function uninstall() {
    // Ensure user has the proper permissions.
    if ( ! current_user_can( 'delete_plugins' ) ) {
      return;
    }

    self::remove_options();
    self::remove_capability();
    self::delete_all_block_data();
    self::delete_legacy_cpts();
  }

  /**
   * Delete the plugin's options from the options table in the database.
   *
   * @since 3.0.0 - previously in deactivation hook
   */
  private static function remove_options() {
    delete_option( 'gpalab-blocks-brightcove' );
    delete_option( 'gpalab-blocks-dev-mode' );
    delete_option( 'gpalab-blocks-feed-sources' );
    delete_option( 'gpalab-blocks-role' );
    delete_option( 'gpalab-blocks-styling' );
  }

  /**
   * Remove the custom capability which permits a user to add blocks to posts.
   *
   * @since 3.0.0
   */
  private static function remove_capability() {
    $custom_cap = 'gpalab_blocks_add';

    $editable = get_editable_roles();

    foreach ( wp_roles()->role_objects as $key => $role ) {
      if ( isset( $editable[ $key ] ) && $role->has_cap( $custom_cap ) ) {
        $role->remove_cap( $custom_cap );
      }
    }

    unset( $role );
  }

  /**
   * Find all posts with blocks listed in their meta data and delete those blocks.
   *
   * @since 3.0.0
   */
  private static function delete_all_block_data() {
    $posts_per_page = -1;

    // Running plugin clean function can be slow.
    // phpcs:disable WordPress.DB.SlowDBQuery.slow_db_query_meta_query
    $query_args = array(
      'post_type'      => array( 'page', 'post' ),
      'fields'         => 'ids',
      'no_found_rows'  => true,
      'posts_per_page' => $posts_per_page,
      'meta_query'     => array(
        'relation' => 'OR',
        array(
          'key'     => 'gpalab_blocks',
          'compare' => 'EXISTS',
        ),
        array(
          'key'     => 'gpalab_associated_blocks',
          'compare' => 'EXISTS',
        ),
      ),
    );
    // phpcs:enable

    $query = new \WP_Query( $query_args );

    if ( $query->posts ) {
      foreach ( $query->posts as $key => $post ) {
        delete_post_meta( $post, 'gpalab_blocks' );
        delete_post_meta( $post, 'gpalab_associated_blocks' );
      }

      unset( $post );
    }
  }

  /**
   * Find and delete legacy-style custom post types generated by the plugin.
   *
   * @since 3.0.0
   */
  private function delete_legacy_cpts() {
    $possible_cpts = array(
      'gpalab-article-feed',
      'gpalab-hero',
      'gpalab-link-list',
      'gpalab-navigation',
      'gpalab-parallax',
      'gpalab-quote-box',
      'gpalab-resources',
      'gpalab-slides',
      'gpalab-stats',
      'gpalab-text',
      'gpalab-timeline',
    );

    $posts_per_page = -1;

    $query_args = array(
      'fields'         => 'ids',
      'no_found_rows'  => true,
      'post_type'      => $possible_cpts,
      'posts_per_page' => $posts_per_page,
    );

    $posts = get_posts( $query_args );

    foreach ( $posts as $post ) {
      wp_delete_post( $post );
    }

    unset( $post );
  }
}
