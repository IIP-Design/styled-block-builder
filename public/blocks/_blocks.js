import { axeInit } from 'config/axe';

// Normalizer CSS should be included first to ensure a proper cascade
import 'library/_shared/components/Normalizer/Normalizer.scss';
import 'styles/quill.scss';

/* eslint-disable import/no-unassigned-import */
// Blocks
import './article-feed';
import './hero';
// import './link-list'; - Link List block available but disabled
import './navigation';
import './parallax';
import './quote-box';
import './resources';
import './slides';
import './stats';
import './text';
import './timeline';


// Run accessibility tests in development.
const ENABLE_AXE = false;

axeInit( ENABLE_AXE );
