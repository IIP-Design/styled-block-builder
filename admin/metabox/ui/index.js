import React from 'react';
import ReactDOM from 'react-dom';

import Metabox from './components/Metabox/Metabox';

import { axeInit } from 'config/axe';

import 'react-quill/dist/quill.snow.css';
import 'styles/quill.scss';

// Run accessibility tests in development.
const ENABLE_AXE = false;

axeInit( ENABLE_AXE );

ReactDOM.render( <Metabox />, document.getElementById( 'gpalab-blocks-metabox' ) );
