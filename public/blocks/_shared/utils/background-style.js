// Accept background value and check if it should be a repeated background image or a color value
export const backgroundStyle = value => {
  const { assets } = window.gpalabTemplateFront;

  let type;

  const extentions = ['.jpg', '.jpeg', '.png', '.svg'];
  extentions.forEach(extention => {
    if (value.includes(extention)) {
      type = 'image';
    }
  });

  if (type === 'image') {
    return {
      backgroundImage: `url('${assets}${value}')`,
      backgroundRepeat: 'repeat'
    };
  }

  return { backgroundColor: value };
};

// Return the inline styles for a background cover image
export const backgroundImageStyle = url => ({
  backgroundImage: `url('${url}')`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
});

// Get the URL for a file with the name 'backgroundImage' from an array of image objects
export const getBackgroundImageUrl = fileList => {
  if (!fileList) {
    return '';
  }

  const bgImage = fileList.filter(file => file.name === 'backgroundImage');

  const url = bgImage?.[0]?.url ? bgImage[0].url : '';
  return url;
};

// Return background image inline styles for the file 'backgroundImage' from a list of file objects
export const setBackgroundImage = fileList => backgroundImageStyle(getBackgroundImageUrl(fileList));

// Sets text color opposite (i.e. dark/light) of input color
export const setText = background => {
  let text;

  if (background === '#ffffff' || background === 'wavy-bg.jpg') {
    text = '#002d74';
  }

  if (background === '#002d74' || background === 'wavy-navy.jpg') {
    text = '#ffffff';
  }

  return text;
};
