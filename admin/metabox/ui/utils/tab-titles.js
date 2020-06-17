/**
 * Adjusts the length of a tab's title depending on the number of tabs
 * @param number Index of the given tab
 * @param {number} length Number of tabs
 * @param {string} title Tab title
 * @returns {string|number} Abbreviated title with ellipses appended to the end (if needed)
 */
export const responsiveTitle = ( index, length, title ) => {
  if ( !title || length > 7 ) {
    return index + 1;
  }

  // Reduce total allowed characters for more tabs to account for more instances of ellipses
  const base = length < 5 ? 30 : 21;

  // Total characters across all tabs, divided by num of tabs,
  // -1 to account for 0 based indexing, rounded to whole number
  const end = Math.round( base / length - 1 );

  return title.length > end ? `${title.substring( 0, end )}...` : title;
};

/**
 * Finds the title field from an array of field data objects
 * @param {Object[]} list A list of field data
 * @returns {string} The name of the title field
 */
export const getTabTitleField = list => {
  let title;

  list.forEach( item => {
    if ( item.tabTitle ) {
      title = item.name;
    }
  } );

  return title;
};
