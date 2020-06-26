const toolbarBase = [
  [
    'bold', 'italic', 'underline',
  ],
  ['link'],
  ['clean'],
];

export const getModules = ( options = [] ) => {
  const toolbar = [...toolbarBase];
  const optional = [];

  if ( options.includes( 'lists' ) ) {
    optional.push( { list: 'ordered' }, { list: 'bullet' } );
  }

  if ( options.includes( 'align' ) ) {
    optional.push( { align: [] } );
  }

  if ( optional.length > 0 ) toolbar.splice( 1, 0, optional );

  return {
    toolbar,
  };
};
