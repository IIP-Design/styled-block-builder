export const responsiveTitle = ( forms, index, title ) => {
  if ( !title || forms.length > 7 ) {
    return index + 1;
  }

  // Reduce total allowed characters for more tabs to account for more instances of ellipses
  const base = forms.length < 5 ? 30 : 21;

  // Total characters across all tabs, divided by num of tabs,
  // -1 to account for 0 based indexing, rounded to whole number
  const end = Math.round( base / forms.length - 1 );

  return `${title.substring( 0, end )}...`;
};

export const getTabTitleField = list => {
  let title;
  list.forEach( item => {
    if ( item.tabTitle ) {
      title = item.name;
    }
  } );

  return title;
};
