export const showShortcode = ( id, blocks ) => {
  if ( !id || id === 0 ) {
    return false;
  }

  const blockIds = blocks.map( block => block.id );

  return blockIds.includes( id );
};
