<?php

// Get serialized array of post meta values
$quote_box_meta = unserialize( get_post_meta( $post_id, 'gpalab_qb_meta', true ) );

if( !empty( $_POST['title'] ) ) {
  $quote_box_meta['title'] = stripslashes( sanitize_text_field( $_POST['title'] ) );
}

if( !empty( $_POST['subtitle'] ) ) {
  $quote_box_meta['subtitle'] = stripslashes( sanitize_textarea_field( $_POST['subtitle'] ) );
}

if( !empty( $_POST['desc'] ) ) {
  $quote_box_meta['description'] = stripslashes( sanitize_textarea_field( $_POST['desc'] ) );
}

if( !empty( $_POST['quote'] ) ) {
  $quote_box_meta['quote'] = stripslashes( sanitize_textarea_field( $_POST['quote'] ) );
}

if( !empty( $_POST['speaker'] ) ) {
  $quote_box_meta['speaker'] = stripslashes( sanitize_textarea_field( $_POST['speaker'] ) );
}

// Send updated array of post meta values
update_post_meta ( $post_id, 'gpalab_qb_meta', serialize( $quote_box_meta ) );