/**
 * Check whether a block of a given id is found in a list of block objects.
 *
 * @param {string} id        Id value of a given block.
 * @param {Object[]} blocks  List of blocks.
 * @returns {bool}           Whether or not the block is found in the list.
 */
export const showShortcode = ( id, blocks ) => {
  if ( !id || id === 0 ) {
    return false;
  }

  const blockIds = blocks.map( block => block.id );

  return blockIds.includes( id );
};
