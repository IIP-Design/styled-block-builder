export const formatBlockType = type => {
  const trimmed = type.replace( 'gpalab-', '' );
  const spaced = trimmed.replace( '-', '' );

  return `Untitled ${spaced} block`;
};
