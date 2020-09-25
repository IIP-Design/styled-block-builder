export const setColors = ( bgType, bgColor, color, style ) => {
  let linkClass;

  const bgImage = bgType === 'image' || bgColor === 'wavy-bg.jpg' || bgColor === 'wavy-navy.jpg';

  switch ( style ) {
    case ( 'solid' ):
      switch ( color ) {
        case '#333333':
          linkClass = 'solid-black';
          break;
        case '#0a314d':
          linkClass = 'solid-blue';
          break;
        default:
          linkClass = 'solid-white';
      }
      break;
    case ( 'outline' ):
      switch ( color ) {
        case '#333333':
          linkClass = bgImage ? 'outline-black-filled' : 'outline-black-empty';
          break;
        case '#0a314d':
          linkClass = bgImage ? 'outline-blue-filled' : 'outline-blue-empty';
          break;
        default:
          linkClass = 'outline-white-empty';
      }
      break;
    default:
      linkClass = 'solid-white';
  }

  return linkClass;
};

export const getAvatar = files => {
  if ( !files || Array.isArray( files ) === false ) {
    return null;
  }

  const avatar = files.filter( file => file.name === 'avatarImage' )[0];

  return avatar;
};
