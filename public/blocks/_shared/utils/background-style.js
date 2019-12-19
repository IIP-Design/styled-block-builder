export const backgroundStyle = ( value, url ) => {
  let type;

  const extentions = ['.jpg', '.jpeg', '.png', '.svg'];
  extentions.forEach( extention => {
    if ( value.includes( extention ) ) {
      type = 'image';
    }
  } );

  if ( type === 'image' ) {
    return {
      backgroundImage: `url('${url}${value}')`,
      backgroundRepeat: 'repeat'
    };
  }

  return { backgroundColor: value };
};

export const backgroundImage = ( value, url ) => {
  return {
    backgroundImage: `url('${url}${value}')`,
    backgroundPostion: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
};

export const setText = background => {
  let text;

  if ( background === '#ffffff' || background === 'wavy-bg.jpg' ) {
    text = '#002d74';
  }

  if ( background === '#002d74' || background === 'wavy-navy.jpg' ) {
    text = '#ffffff';
  }

  return text;
};
