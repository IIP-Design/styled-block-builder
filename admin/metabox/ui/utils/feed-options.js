import React from 'react';

/**
 * Returns the option text based on the provided value
 *
 * @param {string} option Option value.
 * @return {string} Display text that corresponds with the option value
 */
const setOptionText = option => {
  if ( option === 'share' ) return 'ShareAmerica';

  if ( option === 'this' ) return 'Posts from this site';

  return option.toUpperCase();
};

/**
 * Populates the select with a list of options
 *
 * @param {string[]} options List of possible values for the article feed select
 */
export const getFeedOptions = options => {
  const opts = options.map( option => <option key={ option } value={ option }>{ setOptionText( option ) }</option> );

  return opts;
};
