export const formatBlockType = type => {
  if ( typeof type !== 'string' ) return 'Unknown Block';

  const trimmed = type.replace( 'gpalab-', '' );
  const spaced = trimmed.replace( '-', '' );

  return `Untitled ${spaced} block`;
};
