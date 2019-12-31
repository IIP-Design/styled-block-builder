<?php

namespace Style_Templates;

class Activator {

  public function activate() {
    add_option( 'gpalab-style-template-dev-mode', 0 );
  }
}
