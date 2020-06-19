import { getTabTitleField, responsiveTitle } from '../tab-titles';

describe( 'getTabTitleField', () => {
  it( 'returns the name of the item identified as the tab title', () => {
    const list = [
      {
        label: 'Add Event Year:',
        name: 'year',
        type: 'text',
      },
      {
        label: 'Add stat value:',
        name: 'number',
        tabTitle: true,
        type: 'text',
      },
      {
        label: 'Add stat title:',
        name: 'title',
        type: 'text',
      },
    ];

    const title = getTabTitleField( list );

    expect( title ).toEqual( 'number' );
  } );
} );

describe( 'responsiveTitle', () => {
  const longTitle = 'My Super Duper Very Long Sample Title';
  const shortTitle = 'My Short Title';

  it( 'returns the title as is if short enough', () => {
    expect( responsiveTitle( 1, 1, shortTitle ) ).toEqual( shortTitle );
  } );

  it( 'abbreviates a title depending on the number of tabs present', () => {
    expect( responsiveTitle( 1, 1, longTitle ) ).toEqual( 'My Super Duper Very Long Samp...' );
    expect( responsiveTitle( 1, 4, longTitle ) ).toEqual( 'My Supe...' );
    expect( responsiveTitle( 1, 6, longTitle ) ).toEqual( 'My ...' );
  } );

  it( 'returns the tab position rather than a title when there are more than 7 tabs', () => {
    expect( responsiveTitle( 1, 7, longTitle ) ).toEqual( 'My...' );
    // The tab in the first index is the second tab
    expect( responsiveTitle( 1, 8, longTitle ) ).toEqual( 2 );
  } );

  it( 'returns the tab position when there is no title provided', () => {
    // The tab in the first index is the second tab
    expect( responsiveTitle( 1, 8, '' ) ).toEqual( 2 );
  } );
} );
