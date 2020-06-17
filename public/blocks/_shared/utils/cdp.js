// API call to the CDP to get all post data
export const getFromCDP = async ( id, source ) => {
  const formData = new FormData();

  formData.append( 'query', `(site: ${source} AND post_id: ${id})` );

  try {
    const response = await fetch( 'https://api.america.gov/v1/search', {
      method: 'POST',
      body: formData,
    } );
    const result = await response.json();

    // eslint-disable-next-line no-underscore-dangle
    const data = result?.hits?.hits?.[0]?._source ? result.hits.hits[0]._source : {};

    return data;
  } catch ( error ) {
    console.log( 'Error:', error );

    return null;
  }
};

// Parse fields required to constrtuct a field item
export const parseFeedItemData = async data => {
  const image = data?.thumbnail?.sizes?.small?.url ? data.thumbnail.sizes.small.url : '';
  const imageAlt = data?.thumbnail?.alt ? data.thumbnail.alt : '';
  const link = data?.link ? data.link : '';
  const title = data?.title ? data.title : '';

  return { image, imageAlt, link, title };
};

// Accepts a DOM element with children and constructs a feed component out of it
export const getFeedData = feed => {
  const dataArray = [];

  feed.forEach( async item => {
    const itemData = await parseFeedItemData( item.id, item.source );

    dataArray.push( itemData );
  } );

  console.log( dataArray );

  return dataArray;
};
