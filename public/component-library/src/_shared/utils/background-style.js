import { wavyNavy, wavyWhite } from './patterns';

/**
 * Checks whether the selected background style is an image or not
 * Formerly used as a helper in backgroundStyle().
 *
 * @param {string} value Background style
 * @returns {string|undefined} If an image returns 'image' otherwise undefined
 */
const getBackgroundType = value => {
  let type;

  if ( !value ) return type;

  const extensions = [
    '.jpg', '.jpeg', '.png', '.svg',
  ];

  extensions.forEach( extension => {
    if ( value.includes( extension ) ) {
      type = 'image';
    }
  } );

  return type;
};

/**
 * Accept background value and check if it should be a repeated background image or a color value
 *
 * @param {string} value Background style
 * @returns {Object} Inline style object, either for a background image or a background color depending on the provided style
 */
export const backgroundStyle = value => {
  if ( value === 'wavy-bg.jpg' ) {
    return {
      backgroundImage: `url(${wavyWhite})`,
      backgroundRepeat: 'repeat',
    };
  }

  if ( value === 'wavy-navy.jpg' ) {
    return {
      backgroundImage: `url(${wavyNavy})`,
      backgroundRepeat: 'repeat',
    };
  }

  return { backgroundColor: value };
};

/**
 * Return the inline styles for a background cover image
 *
 * @param {string} url Background image URL
 * @returns {Object} Inline styles for a background image
 */
const backgroundImageStyle = url => ( {
  backgroundImage: `url('${url}')`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
} );

/**
 * Get a specified property for a file with the name 'backgroundImage' from an array of file objects
 *
 * @param {Object[]} fileList Group of file objects.
 * @param {string} prop Name of the sought after property.
 * @returns {string} The specified property's value.
 */
const getBackgroundProp = ( fileList, prop ) => {
  if ( !fileList ) {
    return '';
  }

  const bgImage = fileList.filter( file => file.name === 'backgroundImage' );

  const property = bgImage?.[0]?.[prop] ? bgImage[0][prop] : '';

  return property;
};

/**
 * Get the alt text for a file with the name 'backgroundImage' from an array of file objects
 *
 * @param {Object[]} fileList Group of file objects.
 * @returns {string} The alt text value, if present, or an empty string.
 */
export const getBackgroundAlt = fileList => getBackgroundProp( fileList, 'alt' );

/**
 * Get the URL for a file with the name 'backgroundImage' from an array of file objects
 *
 * @param {Object[]} fileList Group of file objects.
 * @returns {string} The URL value, if present, or an empty string.
 */
export const getBackgroundImageUrl = fileList => getBackgroundProp( fileList, 'url' );

/**
 * Return background image inline styles for the file 'backgroundImage' from a list of file objects
 *
 * @param {Object[]} fileList Group of file objects.
 * @returns {Object} Inline styles for a background URL
 */
export const setBackgroundImage = fileList => backgroundImageStyle( getBackgroundImageUrl( fileList ) );

/**
 * Sets text color opposite (i.e. dark/light) of input color
 *
 * @param {string} background The background color value
 * @returns {string} The hex code color value expected given the provided background color.
 */
export const setTextColor = background => {
  let textColor = '#333333'; // The base font color

  if ( background === '#ffffff' || background === 'wavy-bg.jpg' ) {
    textColor = '#0a314d';
  }

  if ( background === '#0a314d' || background === 'wavy-navy.jpg' ) {
    textColor = '#ffffff';
  }

  return textColor;
};

export const setLightClass = color => ( color === '#ffffff' ? 'light' : '' );
