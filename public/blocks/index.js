import { axeInit } from 'config/axe';

// Normalizer CSS should be included first to ensure a proper cascade
import 'library/src/_shared/components/Normalizer/Normalizer.scss';
import 'library/styles/quill.scss';

import renderBlocks from 'library/src/utils/block-renderer';

/**
 * Pull the blocks associated with the current post off of the window object.
 *
 * @returns {Object[]}   Array of block data objects or an empty array if no blocks.
 */
export const getBlocks = () => {
  const blocks = window?.gpalabBlocks?.blocks || [];

  return blocks;
};

renderBlocks( getBlocks() );

// Run accessibility tests in development.
const ENABLE_AXE = false;

axeInit( ENABLE_AXE );
