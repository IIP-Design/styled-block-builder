<?php

namespace Style_Templates;

class Deactivator {

  public function deactivate() {
    delete_option( 'gpalab-style-template-dev-mode' );
  }
}
