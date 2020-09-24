<?php
/**
 * Registers the Setting_Inputs class.
 *
 * @package Style_Blocks\Setting_Inputs
 * @since 0.0.1
 */

namespace Style_Blocks;

/**
 * Iterate over uploaded files and compare.
 *
 * Checks for and sanitizes the fields expected by the timeline form.
 *
 * @package Style_Blocks\Setting_Inputs
 * @since 2.0.0
 */
class Settings_Inputs {
  /**
   * Return an radio toggle to enabled/disabled an option
   * Expects the option to follow the naming convention 'gpalab-blocks-property'
   *
   * @param string $property The name of the given option without the gpalab-blocks-' prefix.
   */
  public function radio_toggle( $property ) {
    $id_disabled = 'gpalab-' . $property . '-disabled';
    $id_enabled  = 'gpalab-' . $property . '-enabled';
    $option      = 'gpalab-blocks-' . $property;

    ?>
      <label for="<?php echo esc_html( $id_disabled ); ?>">
        <?php esc_html_e( 'Disabled', 'gpalab-blocks' ); ?>
        <input
          id="<?php echo esc_html( $id_disabled ); ?>"
          name="<?php echo esc_html( $option ); ?>"
          style="margin-left: 10px"
          type="radio"
          value="0"
          <?php
            $disabled = get_option( $option ) === '0' ? 'checked' : '';
            echo esc_html( $disabled );
          ?>
        />
      </label>
      <label for="<?php echo esc_html( $id_enabled ); ?>">
        <?php esc_html_e( 'Enabled', 'gpalab-blocks' ); ?>
        <input
          id="<?php echo esc_html( $id_enabled ); ?>"
          name="<?php echo esc_html( $option ); ?>"
          style="margin-left: 10px"
          type="radio"
          value="1"
          <?php
            $enabled = get_option( $option ) === '1' ? 'checked' : '';
            echo esc_html( $enabled );
          ?>
        />
      </label>
    <?php
  }

  /**
   * Return an select input to populate an option with an array of values
   * Expects the option to follow the naming convention 'gpalab-blocks-property'
   *
   * @param string      $property   The name of the given option without the gpalab-blocks-' prefix.
   * @param array       $options    An array of possible values for the select options.
   * @param string|null $transform  The type of transformation that should be run to generate the option names.
   * @param bool        $multi      Whether to allow multiple selections.
   */
  public function select( $property, $options, $transform = null, $multi = false ) {
    $option = 'gpalab-blocks-' . $property;

    $name     = true === $multi ? $option . '[]' : $option;
    $multiple = true === $multi ? true : false;

    ?>
      <select
        id="<?php echo esc_html( $option ); ?>"
        name="<?php echo esc_html( $name ); ?>"
        <?php
        if ( $multi ) {
            echo esc_attr( 'multiple' );
        };
        ?>
        style="font-size: 13px;min-width: 11rem;"
      >
        <?php
        foreach ( $options as $opt ) {
          $value    = get_option( $option ) ? get_option( $option ) : $this->get_default( $property );
          $selected = '';

          if ( true === $multi ) {
            if ( ! empty( $value ) && in_array( $opt, $value, true ) ) {
              $selected = ' selected="selected"';
            }
          } else {
            if ( $value === $opt ) {
              $selected = ' selected="selected"';
            }
          }

          $opt_text = $this->transform_options( $opt, $transform );

          echo '<option style="padding: 0.3rem" value="' . esc_html( $opt ) . '" ' . esc_attr( $selected ) . '>' . esc_html( $opt_text ) . '</option>';
        }
        ?>
      </select>
    <?php
  }

  /**
   * Return an text input to populate an option with a provided string
   * Expects the option to follow the naming convention 'gpalab-blocks-property'
   *
   * @param string $property The name of the given option without the gpalab-blocks-' prefix.
   */
  public function text_input( $property ) {
    $option = 'gpalab-blocks-' . $property;
    $value  = get_option( $option ) ? get_option( $option ) : ''

    ?>
      <label for="<?php echo esc_html( $option ); ?>">
        <input
          id="<?php echo esc_html( $option ); ?>"
          name="<?php echo esc_html( $option ); ?>"
          style="margin-left: 10px; width: 30%"
          type="text"
          value="<?php echo esc_html( $value ); ?>"
        />
      </label>
    <?php
  }

  /**
   * Gets the default value for an input based on the input name.
   *
   * @param string $property     The name of the given input.
   * @return string|null         The default value or null if there is none.
   */
  private function get_default( $property ) {
    if ( 'role' === $property ) {
      return 'manage_options';
    } else {
      return null;
    }
  }

  /**
   * Converts an option value into the corresponding, predefined text.
   * Otherwise it returns the provided option value.
   *
   * @param string      $option     The value of the given option.
   * @param string|null $transform  The type of transformation that should be run to generate the option names.
   */
  private function transform_options( $option, $transform ) {
    $domain = $this->remove_http( get_site_url() );

    if ( 'feed' === $transform ) {
      if ( 'state_' === substr( $option, 0, 6 ) ) {
        $trimmed  = str_replace( 'State_', '', ucwords( $option, '_' ) );
        $no_snake = str_replace( '_', ' ', $trimmed );

        return $no_snake . ' posts from ' . $domain;
      } elseif ( 'share' === $option ) {
        return 'ShareAmerica';
      } elseif ( 'post' === $option ) {
        return 'Posts from ' . $domain;
      } elseif ( 'page' === $option ) {
        return 'Pages from ' . $domain;
      } elseif ( 'yali' === $option || 'ylai' === $option ) {
        return strtoupper( $option );
      } else {
        return $option;
      }
    } elseif ( 'role' === $transform ) {
      if ( 'manage_sites' === $option ) {
        return 'Super Admin';
      } elseif ( 'manage_options' === $option ) {
        return 'Administrator';
      } elseif ( 'state_options' === $option ) {
        return 'Editor/Manager';
      } elseif ( 'edit_private_pages' === $option ) {
          return 'Editor';
      } elseif ( 'publish_posts' === $option ) {
        return 'Author';
      } elseif ( 'edit_posts' === $option ) {
        return 'Contributor';
      } else {
        return $option;
      }
    } else {
      return $option;
    }
  }

  /**
   * Helper function to strip the protocol (http or https) from the beginning of a url
   *
   * @param string $url A URL which may or may not contain a protocol prefix.
   * @return string A URL without the protocol prefix.
   */
  private function remove_http( $url ) {
    $protocol = array( 'http://', 'https://' );

    foreach ( $protocol as $p ) {
      if ( strpos( $url, $p ) === 0 ) {
        return str_replace( $p, '', $url );
      }
    }
    return $url;
  }
}
