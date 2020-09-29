/**
 * Pull the blocks associated with the current post off of the window object.
 *
 * @returns {Object[]}   Array of block data objects or an empty array if no blocks.
 */
export const getBlocks = () => {
  const blocks = window?.gpalabBlocks?.blocks || [];

  return blocks;
};

/**
 * Get a specific block from the current post's block list.
 *
 * @param {string} id   Block id value.
 * @returns {Object|null}    Block metadata object or null if block not found.
 */
export const getBlockById = id => {
  const blocks = getBlocks();
  const block = blocks.filter( b => b.id === id )[0] || {};

  const meta = block?.meta || null;

  if ( meta === null ) {
    console.error( `Block with id: ${id} not found` ); // eslint-disable-line no-console
  }

  return meta;
};
